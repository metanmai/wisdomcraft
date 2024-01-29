"use client";

import React, {useState} from 'react';
import * as z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {X, Pencil} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import axios from 'axios';

interface TitleFormProps {
	initialData: {
		title: string;
	};
	courseId: string;
}

const formSchema = z.object({
	title: z.string().min(1, {message: "Title is required"})
});


const TitleForm = ({initialData, courseId}: TitleFormProps) => {
	const router = useRouter();

	const [isEditing, setIsEditing] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	});

	const {isSubmitting, isValid} = form.formState;

	const handleClick = (isClose: boolean) => {
		setIsEditing(!isEditing);

		if (isClose) {
			form.reset();
		}
	};

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(`/api/courses/${courseId}`, values);
			toast.success(`Title updated successfully.`);
			setIsEditing(false);
			router.refresh();

		} catch (error) {
			toast.error(`Something went wrong.`);
		}
	}

	return (
		<div className={`mt-6 border bg-slate-100 rounded-md p-4`}>
			<div className={`font-bold text-xl flex items-center justify-between`}>
				Title

				{isEditing ?
					<Button type={`button`} variant={`ghost`} onClick={() => handleClick(true)}>
						<X className={`text-rose-400`}/>
					</Button>
					:
					<Button type={`button`} variant={`ghost`} onClick={() => handleClick(false)}>
						<Pencil className={`text-rose-400`}/>
					</Button>
				}
			</div>
			{!isEditing &&
				<p className={`text-lg font-medium mt-2 p-2`}>
					{initialData.title}
				</p>
			}

			{isEditing &&
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className={`space-y-4 mt-4 flex flex-col`}
					>
						<FormField
							control={form.control}
							name={`title`}
							render={({field}) => (
								<FormItem>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder={`Enter your title.`}
											{...field}
										/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						/>
						<div className={`flex gap-x-2 mx-auto`}>
							<Button
								className={`w-28`}
								type={`submit`}
								disabled={!isValid || isSubmitting}
							>
								Save
							</Button>
						</div>
					</form>
				</Form>
			}
		</div>
	);
};

export default TitleForm;