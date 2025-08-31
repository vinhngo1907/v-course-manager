import { DISLIKE, FLAG, LIKE } from '@/constants/icons';
import React, { useState, useContext } from 'react';
import style from '../index.module.css';
import { addReply } from "@/redux/features/commentSlice";
import { axios } from '@/utils/axios';
import { IComment } from '@/interfaces';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { FaBan, FaCheckCircle } from 'react-icons/fa';
import { AuthContext } from '@/context/AuthContext';

type Props = {
    comment: IComment;
    replies?: IComment[];
};

const CourseCommentItem = ({ comment, replies }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { authState: { user } } = useContext(AuthContext)!;

    const [replyContent, setReplyContent] = useState('');
    const [showReplyInput, setShowReplyInput] = useState(false);

    const handleReply = async () => {
        if (!replyContent.trim()) return;

        const res = await axios.post("/comments", {
            content: replyContent,
            parentId: comment.id,
            videoId: comment.videoId
        });

        dispatch(addReply(res.data));
        setReplyContent('');
        setShowReplyInput(false);
    };

    return (
        <div className={style.courseCommentItem}>
            <img
                className={style.courseCommentAvatar}
                src={comment.author.avatar || "/default-avatar.png"}
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
                    <span onClick={() => setShowReplyInput(!showReplyInput)} className="cursor-pointer text-yellow-500 hover:underline">
                        Reply
                    </span>

                    {showReplyInput && (
                        <div className="mt-3 flex items-start gap-2">
                            <img
                                src={user?.avatar || "/default-avatar.png"}
                                alt="user avatar"
                                className="w-8 h-8 rounded-full mt-1"
                            />
                            <div className="reply-content">
                                <input
                                    className="w-full border border-gray-600 rounded px-3 py-2 text-sm bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-yellow-500"
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    placeholder="Write a reply..."
                                />
                                <div className="flex gap-2 mt-2">
                                    <button onClick={handleReply} className="text-green-500 text-xl hover:opacity-80">
                                        <FaCheckCircle />
                                    </button>
                                    <button onClick={() => setShowReplyInput(false)} className="text-red-500 text-xl hover:opacity-80">
                                        <FaBan />
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    )}

                    {replies && replies.length > 0 && (
                        <div className="mt-4 ml-10 space-y-3">
                            {replies.map((reply) => (
                                <CourseCommentItem
                                    key={reply.id}
                                    comment={reply}
                                    replies={
                                        replies.filter((r) => r.parentId === reply.id)
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseCommentItem;