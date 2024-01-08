"use client";

import React from 'react';
import {BarChart, Compass, Layout, List} from "lucide-react";
import SidebarItem from "@/app/(dashboard)/_components/sidebar-item";
import {usePathname} from "next/navigation";

const guestRoutes = [
	{
		icon: Layout,
		label: "Dashboard",
		href: "/"
	},
	{
		icon: Compass,
		label: "Browse",
		href: "/search"
	},
]

const teacherRoutes = [
	{
		icon: List,
		label: "Courses",
		href: "/teacher/courses" // This actually works even if you remove the /teacher/ from the path.
	},
	{
		icon: BarChart,
		label: "Analytics",
		href: "/teacher/analytics"
	},
]

const SidebarRoutes = () => {
	const pathName = usePathname();
	const isTeacher = pathName?.includes("/teacher");

	const routes = isTeacher ? teacherRoutes : guestRoutes;

	return (
		<div className={``}>
			{routes.map((route) => (
				<SidebarItem
					key={route.href}
					icon={route.icon}
					label={route.label}
					href={route.href}
				/>
			))}
		</div>
	);
};

export default SidebarRoutes;