"use client";

import React from 'react';
import {UploadDropzone} from "@/lib/uploadthing";
import {ourFileRouter} from "@/app/api/uploadthing/core";
import {toast} from "sonner";

interface FileUploadProps {
	onChange: (url?: string) => void; // ? means optional.
	endpoint: keyof typeof ourFileRouter;
}

const FileUpload = ({onChange, endpoint}: FileUploadProps) => {
	return (
		<UploadDropzone
			className={`bg-slate-300 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300`}
			endpoint={endpoint}
			onClientUploadComplete={(res) => {
				onChange(res?.[0].url);
			}}
			onUploadError={(error) => {
				toast.error(`${error?.message}`);
			}}
		/>
	);
};

export default FileUpload;