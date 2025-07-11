import React, { useContext, useEffect, useState } from 'react';
import Layout from '@/Components/Layouts';
// import CourseList from '@/Components/Video/VideoList';
import { axios } from '@/utils/axios';
import { Course } from '@/types';
import CourseList from '@/Components/Course/CourseList';
import Loading from '@/Components/Loading';

export default function Home() {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const res = await axios.get('/courses');
				console.log({res})
				setCourses(res?.data?.data);
			} catch (err) {
				console.error('Failed to fetch courses:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchCourses();
	}, []);

	return (
		<Layout title="Courses">
			{loading ? (
				<Loading />
			) : (
				<CourseList courses={courses} />
			)}
		</Layout>
	);
}
