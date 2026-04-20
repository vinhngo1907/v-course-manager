"use client";

import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  return <ReactQuill theme="bubble" value={value} readOnly />;
};