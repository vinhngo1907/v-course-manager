import { useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import database from "config/firebaseConfig";
import { useVideoUpload } from "@context/VideoLoadContext";

export default function InputImage() {
    const { setVideoDetails, videoDetails } = useVideoUpload();
    const [loading, setLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const imageRef = useRef<HTMLInputElement>(null);

    const handleUpload = () => {
        const file = imageRef.current?.files?.[0];
        if (!file) return;

        const dbRef = ref(database, `images/${Date.now()}-${file.name}`);
        const uploadTask = uploadBytesResumable(dbRef, file);

        setLoading(true);
        uploadTask.on(
            "state_changed",
            () => { },
            (error: any) => console.error(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setUploaded(true);
                    setVideoDetails({ thumbnailUrl: url });
                    setLoading(false);
                });
            }
        );
    };

    return (
        <div className="mb-4">
            <label htmlFor="thumbnail">Thumbnail</label>
            <input type="file" ref={imageRef} accept="image/*" onChange={() => setLoading(true)} />
            <button onClick={handleUpload}>Upload Photo</button>
            {uploaded && (
                <img src={videoDetails.thumbnailUrl} className="rounded mt-2 h-48" />
            )}
            {loading && <ThreeDots />}
        </div>
    );
}