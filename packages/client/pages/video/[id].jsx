import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import style from '@styles/Video.module.css';
import courses from '@components/Video/VideoList';

const VideoPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [videoDetail, setVideoDetail] = useState(null);

    useEffect(() => {
        if (!id) return;
        const video = courses.find((course) => course.id === parseInt(id, 10)); // Ép kiểu nếu id là số
        setVideoDetail(video || null);
    }, [id]);

    if (!videoDetail) {
        return <div>Video not found!</div>;
    }

    return (
        <div className={style.videoDetail}>
            <h1 className={style.videoTitle}>{videoDetail.username}</h1>
            <video src={videoDetail.backgroundVideo} controls className={style.videoPlayer} />
            <p className={style.videoDesc}>{videoDetail.desc}</p>
        </div>
    );
};

export default VideoPage;