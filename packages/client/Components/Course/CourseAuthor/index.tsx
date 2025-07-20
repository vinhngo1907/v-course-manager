import React from 'react';
import style from '../index.module.css';

type Props = {
    author: {
        id: string;
        username: string;
        fullName?: string;
        avatar?: string | null;
        bio?: string | null;
    };
}
const CourseAuthor: React.FC<Props> = ({ author }) => {
    return (
        <div className={style.courseAuthorWrap}>
            <h2>{author.fullName || author.username}</h2>

            <div className={style.courseAuthorTitle}>Author</div>
            <div className={style.courseAuthorUser}>
                <img
                    src={author.avatar || 'https://via.placeholder.com/100x100?text=Avatar'}
                    alt={author.username}
                />
                {author.username}
            </div>

            <div className={style.courseAuthorTitle}>Description</div>
            <p className={style.courseAuthorDesc}>
                {author.bio || "The author hasn't added a description yet."}
            </p>
        </div>
    );
};

export default CourseAuthor;
