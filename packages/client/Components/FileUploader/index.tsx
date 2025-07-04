import { useState } from 'react';
// import * as apis from '../apis';
import { COURSE_THUMBNAIL_TYPE, VIDEO_THUMBNAIL_TYPE, VIDEO_TYPE } from '@/constants/file';
import { uploadFile } from '@/services/file';
import Button from '../Layouts/Button';

interface FileUploaderProps {
    initUrl?: string;
    type: string;
    setUrl: (url: string) => void;
    title: string;
    name: string;
}

export function FileUploader({ initUrl, type, setUrl, title, name }: FileUploaderProps) {
    const [isUploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const uploadFileToStorage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setUploading(true);
        const file = event.target.files?.[0];
        if (!file) return;
        const newUrl = await uploadFile(type, file, setProgress);
        if (newUrl) {
            setUrl(newUrl);
        }
        setUploading(false);
    };

    const getFileType = () =>
        type === COURSE_THUMBNAIL_TYPE || type === VIDEO_THUMBNAIL_TYPE ? 'image/*' : 'video/*';

    return (
        <div>
            <label htmlFor={name}
                className="inline-block px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 cursor-pointer"
            >
                {/* <Button type='button' component="span"></Button> */}
                {title}
            </label>
            <input
                accept={getFileType()}
                className="hidden"
                id={name}
                type="file"
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

            {!isUploading && (
                <div className="mt-2">
                    {(type === VIDEO_THUMBNAIL_TYPE || type === COURSE_THUMBNAIL_TYPE) && initUrl && (
                        <img alt="Thumbnail" width={350} src={initUrl} />
                    )}
                    {type === VIDEO_TYPE && initUrl && <p>Video Url {initUrl}</p>}
                </div>
            )}
        </div>
    );
}
