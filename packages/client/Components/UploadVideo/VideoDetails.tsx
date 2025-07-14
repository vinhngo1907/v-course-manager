import { useRef, useState, ChangeEvent, MouseEvent } from "react";
// import { GrFormClose } from "react-icons/gr";
// import Fade from "react-reveal/Fade";
import InputImage from "./InputImage";
import { useVideoUpload } from "@/context/VideoLoadContext";
import { createVideo } from "@/services/video";

export default function VideoDetails() {
    const {
        videoDetails,
        setVideoDetails,
        setUploaded,
        setUploadingProgress,
    } = useVideoUpload();
    const [tags, setTags] = useState<string[]>([]);
    const tagRef = useRef<HTMLInputElement>(null);

    const addTag = () => {
        const tag = tagRef.current?.value;
        if (tag) {
            const newTags = [...tags, tag];
            tagRef.current.value = "";
            setTags(newTags);
            setVideoDetails({ tags: newTags });
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setVideoDetails({ [e.target.name]: e.target.value });
    };

    const handleSavingVideoDetails = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const res = await createVideo(videoDetails);
        if (res.status === 201) {
            setUploaded(false);
            setUploadingProgress(0);
            setVideoDetails({});
        }
    };

    return (
        <div className="grid grid-cols-2 max-w-6xl mx-auto gap-8 mt-8 mb-8">
            <div>
                <h2 className="font-bold text-lg tracking-wide mb-4">Add video details</h2>
                <form>
                    {/* title input */}
                    <input
                        name="title"
                        placeholder="Title"
                        className="input"
                        onChange={handleChange}
                        required
                    />
                    {/* description input */}
                    <textarea
                        name="description"
                        placeholder="Video description"
                        className="input"
                        onChange={handleChange}
                        required
                    />
                    {/* status */}
                    <select name="videoStatus" className="input" onChange={handleChange} required>
                        <option value="" disabled selected>
                            Choose video status
                        </option>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                    {/* tags */}
                    <input name="tag" placeholder="Add tag" className="input" ref={tagRef} />
                    <button type="button" onClick={addTag}>Add Tag</button>
                    <div className="flex gap-2 flex-wrap mt-2">
                        {tags.map((tag, idx) => (
                            <Tag key={idx} title={tag} index={idx} tags={tags} setTags={setTags} />
                        ))}
                    </div>
                    {/* thumbnail */}
                    <InputImage />
                    {/* save button */}
                    <button type="button" onClick={handleSavingVideoDetails}>Save Details</button>
                </form>
            </div>

            {/* Video Preview */}
            <div>
                <video controls>
                    <source src={videoDetails.videoURL} />
                </video>
            </div>
        </div>
    );
}

function Tag({
    title,
    index,
    tags,
    setTags,
}: {
    title: string;
    index: number;
    tags: string[];
    setTags: (t: string[]) => void;
}) {
    const { setVideoDetails } = useVideoUpload();
    const deleteTag = () => {
        const updated = tags.filter((_, i) => i !== index);
        setTags(updated);
        setVideoDetails({ tags: updated });
    };
    return (
        <div className="bg-gray-800 text-white px-2 py-1 rounded flex items-center gap-2 text-sm">
            {title}
            <span onClick={deleteTag} className="cursor-pointer text-main">
                {/* <GrFormClose size={16} /> */}
            </span>
        </div>
    );
}