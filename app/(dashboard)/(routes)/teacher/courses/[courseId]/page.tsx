import React from 'react';
import {db} from "@/lib/db";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import IconBadge from "@/components/icon-badge";
import {LayoutDashboardIcon} from "lucide-react";
import TitleForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/title-form";
import DescriptionForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/description-form";
import ImageForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/image-form";

const CourseIdPage = async ({params}: {params: {courseId: string}}) => {

	const {userId} = auth();

	const course = await db.course.findUnique({
		where: {
			id: params.courseId,
		}
	});

	if(!userId || !course) {
		return redirect(`/`);
	}

	const requiredFields = [
		course.title,
		course.description,
		course.imageUrl,
		course.price,
		course.categoryId
	];

	const totalFields = requiredFields.length;
	const completedFields = requiredFields.filter(Boolean).length;

	const completionText = `(${completedFields}/${totalFields})`;

	return (
		<div className={`p-6`}>
			<div className={`flex flex-col gap-y-2`}>
				<h1 className={`text-3xl font-medium`}>Course Setup.</h1>

				<span className={`text-sm text-slate-700`}>
					Complete all fields {completionText}.
				</span>
			</div>
			<div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mt-16`}>
				<div>
					<div className={`flex items-center gap-x-2`}>
						<IconBadge icon={LayoutDashboardIcon} size={`default`} variant={`default`}/>
						<h2 className="text-xl"> Customize your course. </h2>
					</div>

					<TitleForm initialData={course} courseId={course.id}/>
					<DescriptionForm initialData={course} courseId={course.id}/>
					<ImageForm initialData={course} courseId={course.id}/>
				</div>
			</div>
		</div>
	);
};

export default CourseIdPage;