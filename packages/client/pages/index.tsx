import React, { useEffect, useState } from 'react';
import Layout from '@/Components/Layouts';
import CourseList from '@/Components/Video/VideoList';
import { axios } from '@/utils/axios';
import { Course } from '@/types';

export default function Home() {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	const fetchCourses = async () => {
	// 		try {
	// 			const res = await axios.get('/courses'); // 🔑 axios instance đã `withCredentials: true` rồi
	// 			setCourses(res.data);
	// 		} catch (err) {
	// 			console.error('Failed to fetch courses:', err);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	fetchCourses();
	// }, []);

	return (
		<Layout title="Courses">
			<CourseList />
			{/* {loading ? (
				<p>Loading...</p>
			) : (
				<CourseList courses={courses} />
			)} */}
		</Layout>
	);
}
