import { useState } from 'react';
import { COURSE_THUMBNAIL_TYPE, VIDEO_THUMBNAIL_TYPE, VIDEO_TYPE } from '@/constants/file';

interface FileUploaderProps {
    initUrl?: string;
    type: string;
    setUrl: (url: string) => void;
    title: string;
    name: string;
}

export function FileUploader({
    initUrl = '',
    type,
    setUrl,
    title,
    name,
}: FileUploaderProps) {
    const [isUploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const uploadFile = async (file: File) => {
        setUploading(true);

        try {
            const { uploadFile } = await import("@/services/file");
            const newUrl = await uploadFile(type, file, setProgress);
            if (newUrl) setUrl(newUrl);
        } finally {
            setUploading(false);
        }
    };

    const uploadFileToStorage = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        uploadFile(file)

        // setUploading(true);
        // try {
        //     const { uploadFile } = await import('@/services/file');
        //     const newUrl = await uploadFile(type, file, setProgress);
        //     if (newUrl) setUrl(newUrl);
        // } finally {
        //     setUploading(false);
        // }
    };

    const getAcceptedFileType = () =>
        [COURSE_THUMBNAIL_TYPE, VIDEO_THUMBNAIL_TYPE].includes(type)
            ? 'image/*'
            : 'video/*';

    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files?.[0];
        if (!file) return;

        uploadFile(file);
    }
    return (
        <div className="flex items-start gap-6">
            <div
                className={`
                w-100 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition
                ${isDragging ? "border-orange-500 bg-orange-50" : "border-gray-300"}
                `}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true)
                }}

                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById(name)?.click()}
            >
                {/* <label
                    htmlFor={name}
                    className="inline-block px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 cursor-pointer"
                >
                    {title}
                </label> */}
                <p className="text-sm text-gray-600">
                    Drag & drop file here or{" "}
                    <span className="text-orange-600 font-medium">click to upload</span>
                </p>
                <input
                    id={name}
                    type="file"
                    accept={getAcceptedFileType()}
                    className="hidden"
                    onChange={uploadFileToStorage}
                />

                {isUploading && (
                    <div className="w-full bg-gray-200 rounded h-2 mt-2 overflow-hidden">
                        <div
                            className="bg-orange-600 h-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                )}
            </div>
            {initUrl && !isUploading && (
                <div className="mt-2">
                    {[COURSE_THUMBNAIL_TYPE, VIDEO_THUMBNAIL_TYPE].includes(type) ? (
                        <img alt="Thumbnail" width={350} src={initUrl} />
                    ) : type === VIDEO_TYPE ? (
                        <p>Video URL: {initUrl}</p>
                    ) : null}
                </div>
            )}
        </div>
    );
}