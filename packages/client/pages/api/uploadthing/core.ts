import { createUploadthing, type FileRouter } from "uploadthing/next";
import jwt from "jsonwebtoken";

const f = createUploadthing();
import { headers } from "next/headers";

const handleAuth = async () => {
  const headersList = await headers();
  const authHeader = headersList.get("authorization");

  console.log({ authHeader })
  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1]; // Bearer xxx

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    return { userId: (decoded as any).id };
  } catch (err) {
    throw new Error("Invalid token");
  }
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => handleAuth())
    .onUploadComplete(({metadata, file}) => {
      console.log("Uploaded by user:", metadata.userId);
      console.log("File URL:", file.url);
      // console.log("Server Image Upload Completed.");
    }),
  messageFile: f(["image", "pdf"])
    .middleware(async () => handleAuth())
    .onUploadComplete(() => {
      console.log("Message File Upload Completed.");
    }),
  videoFile: f({ video: { maxFileSize: "256MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(({ file }) => {
      console.log("Video uploaded:", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;