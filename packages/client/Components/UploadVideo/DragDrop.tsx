'use client';

import React, { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import Image from 'next/image';
// import UploadIcon from 'public/assets/upload.svg';
import * as assets from '@/constants/assets'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import database from '@/config/firebaseConfig';

interface Props {
    onUploadSuccess: (details: {
        videoURL: string;
        videoName: string;
        // userId: string;
    }) => void;
    // userId?: string;
}

const DragDrop: React.FC<Props> = ({ onUploadSuccess, 
    // userId

 }) => {
    const [loading, setLoading] = useState(false);
    const [video, setVideo] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setVideo(file);
        setLoading(true);
    };

    const handleSubmit = () => {
        if (!video) return;
        setIsUploading(true);
        const fileName = `${Date.now()}-${video.name}`;
        const storageRef = ref(database, `videos/${fileName}`);

        const uploadTask = uploadBytesResumable(storageRef, video);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = snapshot.bytesTransferred / snapshot.totalBytes;
                setUploadProgress(progress * 100);
            },
            (error) => {
                console.error(error);
                setIsUploading(false);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                onUploadSuccess({
                    videoName: video.name,
                    videoURL: downloadURL,
                    // userId,
                });
                setIsUploading(false);
                setLoading(false);
            }
        );
    };

    return (
        <div className="max-w-xl mx-auto mt-12">
            <label className="relative flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-800 focus:outline-none overflow-hidden">
                {!loading && (
                    <>
                        <span className="flex items-center space-x-2">
                            <Image src={assets.UPLOAD} alt="Upload icon" width={24} height={24} />
                            <span className="font-medium text-gray-600">
                                Drop files to Attach, or <span className="text-blue-600 underline">browse</span>
                            </span>
                        </span>
                        <input
                            type="file"
                            name="file_upload"
                            className="hidden"
                            accept="video/*"
                            onChange={handleFileChange}
                            required
                        />
                    </>
                )}
                <span className="absolute w-40 top-5">
                    <ThreeDots
                        height="90"
                        width="80"
                        radius="9"
                        color="rgb(236 53 84)"
                        ariaLabel="three-dots-loading"
                        visible={loading}
                    />
                    {video?.name && (
                        <span className="absolute top-0">
                            <p className="text-lg font-medium text-gray-800 tracking-wider">
                                {video.name}
                            </p>
                        </span>
                    )}
                </span>
            </label>

            <div className="mt-4">
                {!isUploading ? (
                    <button
                        className="block bg-green-600 w-20 rounded shadow-2xl text-sm font-semibold text-white transition duration-500 ease-in-out py-2 hover:shadow-2xl"
                        onClick={handleSubmit}
                        disabled={!video}
                    >
                        Upload
                    </button>
                ) : (
                    <div className="w-full bg-gray-200 rounded-full mt-2">
                        <div
                            className="bg-main text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition ease-in-out duration-500"
                            style={{ width: `${uploadProgress}%` }}
                        >
                            {Math.floor(uploadProgress)}%
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-8">
                <Image
                    src="/images/uploadAn.gif"
                    alt="video-illustration"
                    width={600}
                    height={300}
                    className="mx-auto"
                />
            </div>
        </div>
    );
};

export default DragDrop;
