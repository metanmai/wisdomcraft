import { createUploadthing, type FileRouter } from "uploadthing/next";
import {auth} from "@clerk/nextjs";

const f = createUploadthing();

const handleAuth = () => {
	const {userId} = auth();

	if(!userId) {
		throw new Error("Not authenticated");
	}

	return {userId};
}

// This is an  object that contains all of our file routes. We then export it so that we can use it in our Next.js API route.
// f is a helper function we use to create file routes.
// .middleware(() => handleAuth()) is a function that will be called before the file is uploaded.
// .onUploadComplete(() => {}) is a function that will be called after the file is uploaded.
export const ourFileRouter = {
	courseImage: f({image: {maxFileSize: "4MB", maxFileCount: 1}})
		.middleware(() => handleAuth())
		.onUploadComplete(() => {
			console.log("Uploaded image");
		}),

	courseAttachment: f(["text", "image", "video", "audio", "pdf"])
		.middleware(() => handleAuth())
		.onUploadComplete(() => {
			console.log("Uploaded attachment");
		}),

	chapterVideo: f({video: {maxFileSize: "512GB", maxFileCount: 1}})
		.middleware(() => handleAuth())
		.onUploadComplete(() => {
			console.log("Uploaded video");
		})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;