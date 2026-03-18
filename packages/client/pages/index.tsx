import React, { useEffect, useState } from 'react';
import Layout from '@/Components/Layouts';
// import CourseList from '@/Components/Video/VideoList';
import { axios } from '@/utils/axios';
import { Course } from '@/types';
import CourseList from '@/Components/Course/CourseList';
import Loading from '@/Components/Loading';
import {useMediaQuery} from "usehooks-ts";
import { useSidebar } from '@/hooks/use-sidebar';

export default function Home() {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const isMobile = useMediaQuery("(max-width: 1024px)");
	const {onCollapse, onExpand, collapsed} = useSidebar();
	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const res = await axios.get('/courses');
				// console.log({ res })
				setCourses(res?.data?.data);
			} catch (err) {
				console.error('Failed to fetch courses:', err);
				setError(true); // ✅
			} finally {
				setLoading(false);
			}
		};

		fetchCourses();
	}, []);

	useEffect(() => {
		if(isMobile) {
			onCollapse()
		}else{
			onExpand();
		}
	}, [onCollapse, onExpand])
	
	return (
		<Layout title="Courses" isWide={collapsed}>
			<>
				{loading && <Loading />}

				{!loading && error && (
					<div className="text-center text-red-500 py-10">
						Failed to load courses. Please try again later.
					</div>
				)}

				{!loading && !error && (
					<CourseList courses={courses} />
				)}
			</>
		</Layout>
	);
}
