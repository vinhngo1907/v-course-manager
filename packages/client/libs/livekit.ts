import { Room } from "livekit-client";

export const connectToRoom = async (url: string, token: string) => {
    const room = new Room({
        adaptiveStream: true,
        dynacast: true,
    });
    await room.connect(url, token);
    return room;
};
