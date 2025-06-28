import React from 'react';
import Layout from '@components/Layouts';
import { axios } from '@/utils/axios';
import CourseList from '@components/Course/CourseList';
import { Course } from '@/types';


interface Props {
    courses: Course[];
}

export default function CoursePage({ courses }: Props) {
    return (
        <Layout isWide={true} title="Danh sách Khóa học">
            <div style={{ padding: '2rem' }}>
                <h1>All Courses</h1>
                {
                    courses && <CourseList courses={courses} />
                }
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    try {
        const res = await axios.get('/courses/list');
        console.log(res.data)
        return {
            props: {
                courses: res.data.data || [],
            },
        };
    } catch (err) {
        console.error('Error fetching courses:', err);
        return {
            props: {
                courses: [],
            },
        };
    }
}
