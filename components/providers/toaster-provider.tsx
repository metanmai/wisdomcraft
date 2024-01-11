"use client";

import React from 'react';
import {Toaster} from "sonner";

const ToasterProvider = () => {
	return (
		<Toaster richColors={true}/>
	);
};

export default ToasterProvider;