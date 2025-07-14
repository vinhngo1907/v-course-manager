import { DISLIKE, FLAG, LIKE } from '@/constants/icons';
import React from 'react';
import style from '../index.module.css';
import { Comment } from '@/types';

type Props = {
    comment: {
        id: string;
        content: string;
        author: { fullName: string; avatar?: string };
        createdAt: string;
        likes: number;
        dislikes: number;
    };
};

const CourseCommentItem = ({ comment }: Props) => {
    return (
        <div className={style.courseCommentItem}>
            <img
                className={style.courseCommentAvatar}
                src={comment.author.avatar || "https://res.cloudinary.com/v-webdev/image/upload/v1661947123/v-chat-app/profile-user_p2khhu.png"}
                alt="user"
            />
            <div className={style.courseCommentItemInfor}>
                <div className={style.courseCommentItemInforTitle}>
                    <span className="name">{comment.author.fullName}</span>
                    <span className="time">{new Date(comment.createdAt).toLocaleString()}</span>
                </div>
                <p>{comment.content}</p>
                <div className={style.courseCommentItemComment}>
                    <span>
                        <img src={LIKE} alt="like comment" />
                        {comment.likes}
                    </span>
                    <span>
                        <img src={DISLIKE} alt="dislike comment" />
                        {comment.dislikes}
                    </span>
                    <span>
                        <img src={FLAG} alt="flag comment" />
                    </span>
                    <span>Reply</span>
                </div>
            </div>
        </div>
    );
};

export default CourseCommentItem;
