import React from 'react';
import {db} from "@/lib/db";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import IconBadge from "@/components/icon-badge";
import {BadgeDollarSign, LayoutDashboardIcon, LayoutList, LibraryBig} from "lucide-react";
import TitleForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/title-form";
import DescriptionForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/description-form";
import ImageForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/image-form";
import CategoryForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/category-form";
import PriceForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/price-form";
import ResourcesForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/resources-form";

const CourseIdPage = async ({params}: {params: {courseId: string}}) => {

	const {userId} = auth();

	const categories = await db.category.findMany({
		orderBy: {
			name: "asc"
		}
	});

	const options = categories.map((category) => ({ label: category.name, value: category.id }));

	console.log(options);

	const course = await db.course.findUnique({
		where: {
			id: params.courseId,
		},
		include: {
			attachments: {
				orderBy: {
					createdAt: "desc"
				}
			}
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
					<div className={`border-2 border-black`}>
						<div className={`flex items-center gap-x-2`}>
							<IconBadge icon={LayoutDashboardIcon} size={`default`} variant={`rose`}/>
							<h2 className="text-xl"> Customize your course. </h2>
						</div>
						<TitleForm initialData={course} courseId={course.id}/>
						<DescriptionForm initialData={course} courseId={course.id}/>
						<ImageForm initialData={course} courseId={course.id}/>
						<CategoryForm initialData={course} courseId={course.id} options={options} />
					</div>
				</div>
				<div>
					<div className={`border-2 border-black`}>
						<div className={`flex items-center gap-x-2`}>
							<IconBadge icon={LayoutList} size={`default`} variant={`yellow`}/>
							<h2 className="text-xl"> Course Chapters </h2>
						</div>
					</div>
					<div className={`border-2 border-black`}>
						<div className={`flex items-center gap-x-2`}>
							<IconBadge icon={LibraryBig} size={`default`} variant={`blue`}/>
							<h2 className="text-xl"> Resources </h2>
						</div>
						<ResourcesForm initialData={course} courseId={course.id}/>
					</div>
					<div className={`border-2 border-black`}>
						<div className={`flex items-center gap-x-2`}>
							<IconBadge icon={BadgeDollarSign} size={`default`} variant={`green`}/>
							<h2 className="text-xl"> Pricing </h2>
						</div>
						<PriceForm initialData={course} courseId={course.id}/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseIdPage;