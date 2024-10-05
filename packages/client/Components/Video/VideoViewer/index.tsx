import React, { useCallback, useRef, useState } from 'react';
import style from '@styles/Video.module.css';
import { START, STOP, HD, VOLUME, MUTED_VOLUME, ZOOM } from '@constants/icons';
import VideoDuration from '../VideoDuration';

const SpeedOptions = ['0.5', '1.0', '1.5'];
interface IProps {
    urlVideo: string
}

const VideoViewer: React.FC<IProps> = ({ urlVideo }) => {
    const videoRef = useRef<any>(null);
    const [isSpeed, setIsSpeed] = useState(false);
    const [isVideoStarted, setIsVideoStarted] = useState(false);
    const [isVolumeMuted, setIsVolumeMuted] = useState(false);
    const [speed, setSpeed] = useState(SpeedOptions[1]);
    const videoEnd = useCallback(() => setIsVideoStarted(false), []);
    const startVideo = () => {
        const video = videoRef.current;
        setIsVideoStarted(!isVideoStarted);

        if (video) {
            if (video.paused) { video.play(); }
            else { video.pause(); }
        }
    }
    const toggleVolume = () => {
        const video = videoRef.current;
        if (video) {
            video.muted = !video.muted;
            setIsVolumeMuted(!isVolumeMuted);
        }
    }
    const setPlaySpeed = (speed: string) => {
        const video = videoRef.current;
        if (video) {
            setSpeed(speed);
            video.playbackRate = speed;
        }
    }

    return (
        <div className={style.VideoDetailWrapper}>
            <video className={style.VideoDetail} src={urlVideo} ref={videoRef} />
            <div className={style.Control}>
                <span onClick={startVideo}>
                    <img src={isVideoStarted ? STOP : START} alt="stop" />
                </span>
                <span className="speed" onClick={() => setIsSpeed(!isSpeed)}>
                    {speed}x
                    {isSpeed && (
                        <ul className={style.SpeedOptions}>
                            {SpeedOptions.map(speed => (
                                <li key={speed} onClick={() => setPlaySpeed(speed)}>
                                    {speed}x
                                </li>
                            ))}
                        </ul>
                    )}
                </span>
            </div>
        </div>
    )
}

export default React.memo(VideoViewer);