import React from 'react';
import style from '@/styles/Video.module.css';
import { VideoItemProps } from '@/interfaces';

const VideoItem = ({
    username, subname, avatar, backgroundVideo,
    time, desc, onWatchDetail
}: VideoItemProps) => {
    return (

        <div className={style.video}
            style={{ background: `url(${backgroundVideo})` }}
            onClick={onWatchDetail}
        >
            <div className={style.videoHeader}>
                <div className={style.videoHeaderInfor}>
                    <img src={avatar} alt="user" className={style.avatar} />
                    <div className="txt">
                        <div className={style.name}>{username}</div>
                        <p className={style.subname}>{subname}</p>
                    </div>
                </div>
                <span className={style.time}>{time}</span>
            </div>
            <div className={style.desc}>{desc}</div>
        </div>
    )
}

export default VideoItem;