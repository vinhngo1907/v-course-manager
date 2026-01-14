import React, { useEffect, useRef, useState } from "react";
import style from "@/styles/Video.module.css";

interface IProps {
    videoRef: React.RefObject<HTMLVideoElement>;
    endVideo: () => void;
}

const VideoDuration: React.FC<IProps> = ({ videoRef, endVideo }) => {
    const [percent, setPercent] = useState("0%");
    const [currentSeconds, setCurrentSeconds] = useState(0);
    const [durationSeconds, setDurationSeconds] = useState(0);
    const barRef = useRef<HTMLDivElement | null>(null);

    const convertSecondsToTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        return `${hrs > 0 ? `${hrs}:` : ""}${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            setCurrentSeconds(Math.floor(video.currentTime));
            setPercent(`${(video.currentTime / video.duration) * 100}%`);

            if (video.currentTime === video.duration) {
                endVideo();
            }
        };

        const handleLoadedMetadata = () => {
            setDurationSeconds(Math.floor(video.duration));
        };

        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, [videoRef, endVideo]);

    const selectTime = (event: React.MouseEvent<HTMLDivElement>) => {
        const bar = barRef.current;
        const video = videoRef.current;
        if (bar && video) {
            const clickPosition = event.nativeEvent.offsetX;
            const newTime = (clickPosition / bar.offsetWidth) * video.duration;
            video.currentTime = newTime;
        }
    };

    return (
        <div className={style.Duration} onClick={selectTime} ref={barRef}>
            <div className={style.Time} style={{ width: percent }}>
                <span>
                    {convertSecondsToTime(currentSeconds)} / {convertSecondsToTime(durationSeconds)}
                </span>
            </div>
        </div>
    );
};

export default React.memo(VideoDuration);