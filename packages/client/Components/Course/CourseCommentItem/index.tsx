import { DISLIKE, FLAG, LIKE } from '@constants/icons';
import React from 'react';
import style from '../index.module.css';

const CourseCommentItem = () => {
    return (
        <div className={style.courseCommentItem}>
            <img
                className={style.courseCommentAvatar}
                src="https://res.cloudinary.com/v-webdev/image/upload/v1661947123/v-chat-app/profile-user_p2khhu.png"
                alt="user"
            />
            <div className={style.courseCommentItemInfor}>
                <div className={style.courseCommentItemInforTitle}>
                    <span className="name">Thuan</span>
                    <span className="time">at 1:12pm</span>
                    <span className="tag">#off-topic</span>
                </div>
                <p>
                    ông dev đẹp trai quá ahihi <span>#off-topic</span>
                </p>
                <div className={style.courseCommentItemComment}>
                    <span>
                        <img src={`${LIKE}`} alt="like comment" />
                        145
                    </span>

                    <span>
                        <img src={`${DISLIKE}`} alt="dislike comment" />5
                    </span>

                    <span>
                        <img src={`${FLAG}`} alt="like comment" />
                    </span>

                    <span>Reply</span>
                </div>
                <div className={style.courseCommentItemInforAll}>
                    <span/> View 99 replys
                </div>
            </div>
        </div>
    );
};

export default CourseCommentItem;
