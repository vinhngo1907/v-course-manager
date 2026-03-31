// lib/uploadthing.ts
import { generateReactHelpers, generateUploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/pages/api/uploadthing/core";

export const { uploadFiles, useUploadThing } =
  generateReactHelpers<OurFileRouter>();

export const UploadDropzone = generateUploadDropzone<OurFileRouter>();