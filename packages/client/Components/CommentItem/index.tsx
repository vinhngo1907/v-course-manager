import { useState } from "react";
import { FaCheckCircle, FaBan } from "react-icons/fa";
import userAvatar from "@/assets/avatar.png";

const CommentItem = ({ comment, currentUser }) => {
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyContent, setReplyContent] = useState("");

    const handleReply = (commentId: string) => {
        // Logic gửi reply tại đây
        console.log(`Reply to ${commentId}:`, replyContent);
        setReplyContent("");
        setReplyingTo(null);
    };

    const handleCancel = () => {
        setReplyingTo(null);
        setReplyContent("");
    };

    const renderReplies = (replies = []) =>
        replies.map((reply) => (
            <div key={reply.id} className="ml-6 mt-2 border-l pl-4">
                <p>{reply.content}</p>
                <button
                    onClick={() => setReplyingTo(reply.id)}
                    className="text-sm text-blue-500 hover:underline"
                >
                    Reply
                </button>
                {replyingTo === reply.id && renderReplyInput(reply.id)}
                {/* Nếu reply có nested replies, gọi đệ quy ở đây nếu muốn */}
            </div>
        ));

    const renderReplyInput = (commentId: string) => (
        <div className="flex items-start gap-2 mt-2 ml-6">
            <img
                src={currentUser.avatar || userAvatar}
                alt="avatar"
                className="w-8 h-8 rounded-full"
            />
            <input
                className="flex-1 border rounded px-3 py-1 text-sm"
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
            />
            <button onClick={() => handleReply(commentId)} className="text-green-500 text-xl">
                <FaCheckCircle />
            </button>
            <button onClick={handleCancel} className="text-red-500 text-xl">
                <FaBan />
            </button>
        </div>
    );

    return (
        <div className="mb-4">
            <p>{comment.content}</p>
            <button
                onClick={() => setReplyingTo(comment.id)}
                className="text-sm text-blue-500 hover:underline"
            >
                Reply
            </button>
            {replyingTo === comment.id && renderReplyInput(comment.id)}
            {comment.replies && renderReplies(comment.replies)}
        </div>
    );
};

export default CommentItem;