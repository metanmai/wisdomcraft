import React from 'react';
import {LucideIcon} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

interface SidebarItemProps {
	icon: LucideIcon;
	label: string;
	href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({icon: Icon, label, href}) => {
	const pathname = usePathname();
	const router = useRouter();

	const isActive =
		(pathname === "/" && href === "/") ||
		(pathname === href) ||
		(pathname?.startsWith(`${href}/`));

	const onClick = () => {
		router.push(href);
	}

	return (
		<Button
			onClick={onClick}
			type={`button`}
			className={cn(
				"flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
				isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-200/20"
			)}
		>
			<div className={`flex items-center gap-x-2 py-4`}>
				<Icon
					size={22}
					className={cn(
						"text-slate-500",
						isActive && "text-sky-700"
					)}
				/>
				{label}
			</div>
		</Button>
	);
};

export default SidebarItem;