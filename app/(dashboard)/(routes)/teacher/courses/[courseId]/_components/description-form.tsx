"use client";

import React, {useState} from 'react';
import * as z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Pencil, PlusCircle, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import axios from 'axios';
import {Textarea} from "@/components/ui/textarea";
import {Course} from "@prisma/client";

interface DescriptionFormProps {
	initialData: Course;
	courseId: string;
}

const formSchema = z.object({description: z.string()});

const DescriptionForm = ({initialData, courseId}: DescriptionFormProps) => {
	const router = useRouter();

	const [isEditing, setIsEditing] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			description: initialData?.description || ""
		}
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
			toast.success(`Description updated successfully.`);
			setIsEditing(false);
			router.refresh();
		} catch (error) {
			toast.error(`Something went wrong.`);
		}
	}

	return (
		<div className={`mt-6 border bg-slate-100 rounded-md p-4`}>
			<div className={`font-bold text-xl flex items-center justify-between`}>
				Description

				{isEditing ?
					<Button type={`button`} variant={`ghost`} onClick={() => handleClick(true)}>
						<X className={`text-rose-400`}/>
					</Button> :
					<Button type={`button`} variant={`ghost`} onClick={() => handleClick(false)}>
						{initialData.description === `` ? <PlusCircle className={`text-rose-400`}/> :
							<Pencil className={`text-rose-400`}/>}
					</Button>
				}
			</div>
			{!isEditing &&
				(initialData.description === `` ?
						<h1 className={`text-gray-400 italic p-4`}> No description provided. </h1> :
						<h1 className={`font-custom text-md p-4`}> {initialData.description} </h1>
				)
			}

			{isEditing &&
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className={`space-y-4 mt-4 flex flex-col`}
					>
						<FormField
							control={form.control}
							name={`description`}
							render={({field}) => (
								<FormItem>
									<FormControl>
										<Textarea
											className={``}
											disabled={isSubmitting}
											placeholder={`Enter your description.`}
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

export default DescriptionForm;