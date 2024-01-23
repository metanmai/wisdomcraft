"use client";

import React, {useState} from 'react';
import * as z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ImageIcon, Pencil, PlusCircle, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import axios from 'axios';
import {Course} from "@prisma/client";
import Image from "next/image";
import FileUpload from "@/app/(dashboard)/_components/file-upload";

interface ImageFormProps {
	initialData: Course
	courseId: string;
}

const formSchema = z.object({
	imageUrl: z.string()
});

const ImageForm = ({initialData, courseId}: ImageFormProps) => {
	const router = useRouter();

	const [isEditing, setIsEditing] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			imageUrl: initialData?.imageUrl || ""
		}
	});

	const handleClick = (isClose: boolean) => {
		setIsEditing(!isEditing);

		if (isClose) {
			form.reset();
		}
	};

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(`/api/courses/${courseId}`, values);
			toast.success(`Image updated successfully.`);
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
				Thumbnail

				{isEditing ?
					<Button type={`button`} variant={`ghost`} onClick={() => handleClick(true)}>
						<X className={`text-rose-400`}/>
					</Button> :

					<Button type={`button`} variant={`ghost`} onClick={() => handleClick(false)}>
						{initialData.imageUrl === `` ? <PlusCircle className={`text-rose-400`}/> : <Pencil className={`text-rose-400`}/>}
					</Button>
				}
			</div>
			{!isEditing &&
				(initialData.imageUrl === `` ?
					<div className={`flex items-center justify-center h-64 rounded-md bg-slate-200`}>
						<ImageIcon/>
					</div>
						:
					<div className={`relative aspect-video mt-2`}>
						<Image
							src={`${initialData.imageUrl}`}
							alt={`Course thumbnail`}
							layout={`fill`}
							// objectFit={`cover`}
							className={`rounded-md`}
						/>
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
								onSubmit({imageUrl: url}).then(() => {});
							}
						}}
						endpoint={`courseImage`}
					/>
					<div className={`pt-4 italic text-[12px] text-slate-400`}>
						Recommended aspect ratio: 16:9
					</div>
				</div>
			}
		</div>
	);
};

export default ImageForm;