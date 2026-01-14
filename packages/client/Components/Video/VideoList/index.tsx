import React, { useState } from 'react';
import { useRouter } from 'next/router';
import style from '@/styles/Video.module.css';
import VideoItem from '../VideoItem';
import courses from './courses'

const VideoList = () => {
    const [videos] = useState(courses);
    const router = useRouter();
    const handleWatchDetail = (id: string) => {
        router.push(`course/${id}`);
    }

    return (
        <div className={style.videoList}>
            {videos.length > 0 && videos.map(
                (
                    { username, subname, avatar, backgroundVideo, time, desc, id },
                    index
                ) => (
                    <VideoItem
                        key={index}
                        username={username}
                        subname={subname}
                        // avatar={`https://picsum.photos/200/300?v=${index}`}
                        avatar={avatar}
                        // backgroundVideo={`https://picsum.photos/200/300?v=${index}`}
                        backgroundVideo={backgroundVideo}
                        time={time}
                        desc={desc}
                        onWatchDetail={() => handleWatchDetail(id)}
                    />

                )
            )}

        </div>
    )
}

export default VideoList;