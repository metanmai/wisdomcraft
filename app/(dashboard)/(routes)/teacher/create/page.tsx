"use client";

import React, {useEffect, useRef} from 'react';
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

	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if(inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const response = await axios.post(`/api/courses`, values);
			router.push(`/teacher/courses/${response.data.id}`);
			toast.success(`Course created successfully.`);
		}

		catch (error) {
			toast.error(`Something went wrong.`);
		}
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			form.handleSubmit(handleSubmit)();
		}
	};

	return (
		<div className={`max-w-5xl mx-auto flex flex-col md:items-center md:justify-center h-full p-6`}>
			<h1 className={`text-2xl font-medium`}>
				Create a new course.
			</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className={`w-full space-y-4 mt-8`}
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
										onKeyDown={handleKeyDown}
										ref={inputRef}
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