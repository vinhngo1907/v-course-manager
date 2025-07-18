import React, { use, useContext, useEffect, useState } from 'react';
import { SORT } from '@/constants/icons';
import CourseCommentItem from '../CourseCommentItem';
import style from '../index.module.css';
import { axios } from '@/utils/axios';
import { AuthContext } from '@/context/AuthContext';
import { Comment } from '@/types';
import Button from '@/Components/Layouts/Button';

type Props = {
    videoId: string | null;
};

const CourseComment = ({ videoId }: Props) => {
    const { authState: { user } } = useContext(AuthContext)!;
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const fetchComments = async () => {
        console.log({ videoId })
        if (!videoId) return;
        const res = await axios.get(`/comments?videoId=${videoId}`);
        console.log(res.data)
        setComments(res.data);
    }

    useEffect(() => {
        fetchComments();
    }, [videoId]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        await axios.post(`/comments`, {
            content: newComment,
            videoId: videoId
        });

        setNewComment('');
        fetchComments();
    }
    return (
        <div>
            <div className={style.courseCommentHeader}>
                <div className={style.courseCommentHeaderComments}>25 Comments</div>
                <div className={style.courseCommentHeaderSort}>
                    <img src={SORT} alt="sort" />
                    Sort by
                </div>
            </div>

            <div className="course-body">
                <div className={style.courseCommentSearch}>
                    <img
                        className={style.courseCommentAvatar}
                        src="https://yeu16.com/wp-content/uploads/2021/03/top-10-dien-vien-jav-nhat-ban.jpg"
                        alt="user"
                    />
                    <input
                        type="text"
                        placeholder="add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddComment();
                            }
                        }}
                    />

                </div>

                {/* <>
                    <CourseCommentItem />
                    <CourseCommentItem />
                    <CourseCommentItem />
                    <CourseCommentItem />
                    <CourseCommentItem />
                    <CourseCommentItem />
                    <CourseCommentItem />
                    <CourseCommentItem />
                </> */}
                {comments.length === 0 && (
                    <div className="w-full py-6 flex justify-center">
                        <p className="text-sm text-gray-400 italic">
                            🗨️ No comments yet. Be the first to comment!
                        </p>
                    </div>

                )}
                {comments.map((c) => (
                    <CourseCommentItem key={c.id} comment={c} />
                ))}
            </div>
        </div>
    );
};

export default CourseComment;
