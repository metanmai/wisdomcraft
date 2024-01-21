import {generateComponents} from "@uploadthing/react";
import {OurFileRouter} from "@/app/api/uploadthing/core";

// These 3 are the components we will use in our Next.js app. they are now strictly typed.
export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();