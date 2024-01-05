import React from 'react';
import {Menu} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import Sidebar from "@/app/(dashboard)/_components/sidebar";

const MobileSidebar = () => {
	return (
		<Sheet>
			<SheetTrigger className={`md:hidden pr-4 hover:opacity-75 transition`}>
				<Menu/>
			</SheetTrigger>
			<SheetContent side={`top`} className={`p-0 bg-white`}>
				<Sidebar/>
			</SheetContent>
		</Sheet>
	);
};

export default MobileSidebar;