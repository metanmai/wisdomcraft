import React from 'react';

const CourseIdPage = ({params}: {params: {courseId: string}}) => {
	return (
		<div>
			The course ID is {params.courseId}.
		</div>
	);
};

export default CourseIdPage;