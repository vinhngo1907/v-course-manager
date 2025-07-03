import React from 'react';
// import Layout from '@/Components/Layouts';
import CourseList from '@/Components/Video/VideoList';
import Layout from '@/Components/Layouts';
// import Register from '@/Components/Register';

export default function Home() {
	return (
		<Layout title="Courses">
			<div>
				<CourseList />
			</div>
		</Layout>
	);
}
