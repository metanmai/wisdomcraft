"use client";

import React, {useState} from 'react';
import * as z from 'zod';
import {PlusCircle, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import axios from 'axios';
import {Attachment, Course} from "@prisma/client";
import FileUpload from "@/app/(dashboard)/_components/file-upload";

interface ResourcesFormProps {
	initialData: Course & {attachments: Attachment[]};
	courseId: string;
}

const formSchema = z.object({url: z.string()});

const ResourcesForm = ({initialData, courseId}: ResourcesFormProps) => {
	const router = useRouter();

	const [isEditing, setIsEditing] = useState(false);

	const handleClick = () => {
		setIsEditing(!isEditing);
	};

	const removeAttachment = async (attachmentId: string) => {
		try {
			await axios.delete(`/api/courses/${courseId}/resources/${attachmentId}`);
			toast.success(`Attachment removed successfully.`);
			router.refresh();
		}

		catch (error) {
			toast.error(`Something went wrong.`);
		}
	};

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.post(`/api/courses/${courseId}/resources`, values);
			toast.success(`Resources updated successfully.`);
			setIsEditing(false);
			router.refresh();
		}

		catch(error) {
			toast.error(`Something went wrong.`);
		}
	}

	return (
		<div className={`mt-6 border bg-slate-100 rounded-md p-4`}>
			<div className={`font-bold text-xl flex items-center justify-between`}>
				Attachments

				{isEditing ?
					<Button type={`button`} variant={`ghost`} onClick={handleClick}>
						<X className={`text-blue-500`}/>
					</Button> :

					<Button type={`button`} variant={`ghost`} onClick={handleClick}>
						<PlusCircle className={`text-blue-500`}/>
					</Button>
				}
			</div>
			{!isEditing &&
				(initialData.attachments.length === 0 ?
						<h1 className={`text-gray-400 italic p-4`}> No attachments added. </h1>
						:
					<div className={`relative aspect-video mt-2`}>
						<div className={`p-1 h-[350px] overflow-auto border-2 rounded-md bg-white`}>
							{initialData.attachments.map((attachment) => (
								<div
									key={attachment.id}
									className={`flex flex-row items-center justify-between p-2 rounded-md bg-blue-100 text-blue-500 mb-2`}
								>
									{attachment.id}
									<Button type={`button`} variant={`ghost`} onClick={() => removeAttachment(attachment.id)}>
										<X className={`text-blue-500`}/>
									</Button>
								</div>
							))}
						</div>
					</div>
				)
			}

			{isEditing &&
				<div>
					{/*Make sure to use ONLY uploadthing v5.7.4 and @uploadthing/react v5.7.0
					because it was not working in production with the latest versions.*/}
					<FileUpload
						onChange={(url) => {
							if(url) {
								onSubmit({url: url}).then(() => {});
							}
						}}
						endpoint={`courseAttachment`}
					/>
				</div>
			}
		</div>
	);
};

export default ResourcesForm;