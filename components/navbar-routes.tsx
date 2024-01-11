"use client";

import React from 'react';
import {UserButton} from "@clerk/nextjs";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import {LogOut} from "lucide-react";
import Link from "next/link";

const NavbarRoutes = () => {
	const pathName = usePathname()

	const isTeacherPage = pathName?.startsWith("/teacher");
	const isPlayerPage = pathName?.includes("/chapter");

	return (
		<div className={`flex gap-x-2 ml-auto`}>
			{isTeacherPage || isPlayerPage ? (
				<Link href={`/`}>
					<Button size={`sm`} variant={`outline`}>
						<LogOut className={`h-3 w-3`}/>
					</Button>
				</Link>
			) : (
				<Link href={`/teacher/courses`}>
					<Button size={`sm`} variant={`outline`}>
						Teacher Mode
					</Button>
				</Link>
			)}
			<UserButton afterSignOutUrl={`/`}/>
		</div>
	);
};

export default NavbarRoutes;