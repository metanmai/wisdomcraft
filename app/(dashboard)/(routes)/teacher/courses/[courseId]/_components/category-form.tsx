"use client";

import React, {useState} from 'react';
import {Combobox} from "@/app/(dashboard)/_components/combobox";
import {Course} from "@prisma/client";

interface CategoryFormProps {
	initialData: Course;
	courseId: string;
	options: { label: string, value: string }[];
}

const CategoryForm = ({initialData, courseId, options}: CategoryFormProps) => {
	return (
		<div className={`mt-6 border bg-slate-100 rounded-md p-4`}>
			<div className={`font-bold text-xl flex-row items-center justify-between`}>
				<h1 className={`p-4`}> Category </h1>
				<Combobox courseId={courseId} options={options} value={initialData.categoryId} />
			</div>
		</div>
	);
};

export default CategoryForm;