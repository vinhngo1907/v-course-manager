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

    const uploadFileToStorage = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            // ⏩ Tách upload logic ra 1 hàm riêng nếu dùng lại nhiều nơi
            const { uploadFile } = await import('@/services/file');
            const newUrl = await uploadFile(type, file, setProgress);
            if (newUrl) setUrl(newUrl);
        } finally {
            setUploading(false);
        }
    };

    const getAcceptedFileType = () =>
        [COURSE_THUMBNAIL_TYPE, VIDEO_THUMBNAIL_TYPE].includes(type)
            ? 'image/*'
            : 'video/*';

    return (
        <div>
            <label
                htmlFor={name}
                className="inline-block px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 cursor-pointer"
            >
                {title}
            </label>
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