import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import style from '@styles/Course.module.css';
import courses from '../../Components/Video/VideoList/courses';
import Layout from "@components/Layouts";

const VideoPage = () => {
    const router = useRouter();
    const { id } = router.query;
console.log({id});
    const [videoDetail, setVideoDetail] = useState(null);

    useEffect(() => {
        if (!id) return;
        const video = courses.find((course) => course.id === id);
        setVideoDetail(video || null);
    }, [id]);

    if (!videoDetail) {
        return <div>Video not found!</div>;
    }

    return (
        <Layout>
        <div className={style.videoDetail}>
            <h1 className={style.videoTitle}>{videoDetail.username}</h1>
            <video src={videoDetail.backgroundVideo} controls className={style.videoPlayer} />
            <p className={style.videoDesc}>{videoDetail.desc}</p>
        </div>
        </Layout>
    );
};

export default VideoPage;