import firepadRef from "./firebase";
import { store } from "../redux/store";

const participantRef = firepadRef.child("participants");

// Update user preference (e.g., mic/cam status)
export const updatePreference = (userId: string, preference: Record<string, any>) => {
    const currentParticipantRef = participantRef.child(userId).child("preferences");
    setTimeout(() => {
        currentParticipantRef.update(preference);
    });
};

// Create WebRTC offer
export const createOffer = async (
    peerConnection: RTCPeerConnection,
    receiverId: string,
    createdID: string
) => {
    const currentParticipantRef = participantRef.child(receiverId);

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            currentParticipantRef.child("offerCandidates").push({
                ...event.candidate.toJSON(),
                userId: createdID,
            });
        }
    };

    const offerDescription = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offerDescription);

    const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
        userId: createdID,
    };

    await currentParticipantRef.child("offers").push().set({ offer });
};

// Answer for remote offer
const createAnswer = async (otherUserId: string, userId: string) => {
    const pc = store.getState().liveVideoStreaming.participants[otherUserId]?.peerConnection;
    const participantRef1 = participantRef.child(otherUserId);

    pc.onicecandidate = (event) => {
        if (event.candidate) {
            participantRef1.child("answerCandidates").push({
                ...event.candidate.toJSON(),
                userId: userId,
            });
        }
    };

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
        userId: userId,
    };

    await participantRef1.child("answers").push().set({ answer });
};


// Initialize listeners for signaling
export const initializeListensers = (userId: string) => {
    const currentUserRef = participantRef.child(userId);

    // Listen for incoming offers
    currentUserRef.child("offers").on("child_added", async (snapshot) => {
        const data = snapshot.val();
        if (data?.offer) {
            const pc =
                store.getState().liveVideoStreaming.participants[data.offer.userId]?.peerConnection;
            if (pc) {
                await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
                await createAnswer(data.offer.userId, userId);
            }
        }
    });

    // ICE candidates from the offerer
    currentUserRef.child("offerCandidates").on("child_added", (snapshot) => {
        const data = snapshot.val();
        if (data?.userId) {
            const pc = store.getState().liveVideoStreaming.participants[data.userId]?.peerConnection;
            pc?.addIceCandidate(new RTCIceCandidate(data));
        }
    });

    // Answers to our own offers
    currentUserRef.child("answers").on("child_added", (snapshot) => {
        const data = snapshot.val();
        if (data?.answer) {
            const pc =
                store.getState().liveVideoStreaming.participants[data.answer.userId]?.peerConnection;
            const answerDescription = new RTCSessionDescription(data.answer);
            pc?.setRemoteDescription(answerDescription);
        }
    });

    // ICE candidates from the answerer
    currentUserRef.child("answerCandidates").on("child_added", (snapshot) => {
        const data = snapshot.val();
        if (data?.userId) {
            const pc = store.getState().liveVideoStreaming.participants[data.userId]?.peerConnection;
            pc?.addIceCandidate(new RTCIceCandidate(data));
        }
    });
};
