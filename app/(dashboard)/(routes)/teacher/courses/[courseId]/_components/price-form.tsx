"use client";

import React, {useState} from 'react';
import * as z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Pencil, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import axios from 'axios';
import {Course} from "@prisma/client";
import {Input} from "@/components/ui/input";
import {formatPrice} from "@/lib/format";

interface PriceFormProps {
	initialData: Course;
	courseId: string;
}

const formSchema = z.object({
	price: z
	.coerce.number()
	.refine(value => {
		const decimalCount = (value.toString().split('.')[1] || '').length;
		return decimalCount <= 2;
	},
	{
		message: "Price can have a maximum of two decimal places."
	})
});

const PriceForm = ({initialData, courseId}: PriceFormProps) => {
	const router = useRouter();

	const [isEditing, setIsEditing] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			price: initialData?.price || undefined
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
			await axios.patch(`/api/courses/${courseId}`, {price: Number(values.price.toFixed(2))});
			toast.success(`Pricing updated successfully.`);
			setIsEditing(false);
			router.refresh();
		}

		catch (error) {
			toast.error(`Something went wrong.`);
		}
	}

	return (
		<div className={`mt-6 border bg-slate-100 rounded-md p-4`}>
			<div className={`font-bold text-xl flex items-center justify-between`}>
				Pricing

				{isEditing ?
					<Button type={`button`} variant={`ghost`} onClick={() => handleClick(true)}>
						<X className={`text-green-500`}/>
					</Button> :
					<Button type={`button`} variant={`ghost`} onClick={() => handleClick(false)}>
						<Pencil className={`text-green-500`}/>
					</Button>
				}
			</div>
			{!isEditing &&
				<p className={`text-lg font-medium mt-2 p-2`}>
					{formatPrice(initialData.price ? initialData.price : 0)} (USD)
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
							name={`price`}
							render={({field}) => (
								<FormItem>
									<FormControl>
										<Input
											className={``}
											disabled={isSubmitting}
											step={`0.01`}
											placeholder={`Enter your price (USD).`}
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

export default PriceForm;