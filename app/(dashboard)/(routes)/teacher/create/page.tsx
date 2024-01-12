"use client";

import React from 'react';
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

// Zod is basically a schema validator. It's used to validate the form data.
const formSchema = z.object({
	title: z.string().min(1, {
		message: "Title is required"
	}),
});

const CreatePage = () => {
	const router = useRouter();

	// UseForm is a hook that allows us to create a form with validation.
	// ZodResolver is a hook that allows us to use Zod with the form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		}
	});

	const {isSubmitting, isValid} = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const response = await axios.post(`/api/courses`, values);
			router.push(`/teacher/courses/${response.data.id}`);
			toast.success(`Course created successfully.`);
		}

		catch (error) {
			toast.error(`Something went wrong.`);
		}
	}

	return (
		<div className={`max-w-5xl mx-auto flex flex-col md:items-center md:justify-center h-full p-6`}>
			<h1 className={`text-2xl`}>
				Name your course.
			</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					// className={`flex flex-col w-full mt-6 space-y-4`}
					className={`space-y-8 mt-8`}
				>
					<FormField
						control={form.control}
						name={`title`}
						render={({field}) => (
							<FormItem>
								<FormLabel htmlFor={`title`}>
									Course Name
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										id={`title`}
										placeholder={`My Awesome Course`}
										disabled={isSubmitting}
									/>
								</FormControl>
								<FormDescription>
									What would you like to name your course? Don&apos;t worry, you can change this
									later.
								</FormDescription>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<div className={`flex items-center gap-x-2`}>
						<Link href={`/`}>
							<Button
								type={`button`}
								variant={`ghost`}
							>
								Cancel
							</Button>
						</Link>
						<Button
							type={`submit`}
							disabled={!isValid || isSubmitting}
						>
							Continue
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default CreatePage;