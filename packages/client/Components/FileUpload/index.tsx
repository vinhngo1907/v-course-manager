"use client";

import { useUploadThing } from "@/libs/uploadthing";
import { useState } from "react";

type Props = {
  endpoint: "serverImage" | "messageFile" | "videoFile";
  onChange: (url: string) => void;
  accept?: string;
};

export const FileUpload = ({ endpoint, onChange }: Props) => {
  const [isUploading, setUploading] = useState(false);

  const { startUpload } = useUploadThing(endpoint, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    onClientUploadComplete: (res: any) => {
      if (!res || res.length === 0) return;

      const fileUrl = res[0].url;
      onChange(fileUrl);
      setUploading(false);
    },
    onUploadError: (error) => {
      console.error(error);
      setUploading(false);
    },
  });

  const handleUpload = async (file: File) => {
    setUploading(true);
    await startUpload([file]);
  };

  return (
    <div className="border p-4 rounded-md">
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
      />
      {isUploading && <p className="text-sm text-gray-500">Uploading...</p>}
    </div>
  );
};