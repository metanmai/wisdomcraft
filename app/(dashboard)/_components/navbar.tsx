import React from 'react';
import MobileSidebar from "@/app/(dashboard)/_components/mobile-sidebar";

const Navbar = () => {
	return (
		<div className={`p-4 border-b h-full flex items-center bg-white shadow-sm`}>
			<MobileSidebar/>
		</div>
	);
};

export default Navbar;