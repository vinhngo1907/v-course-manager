"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/Components/Layouts";
import { SearchInput } from "./_components/search-input";
import { axios } from "@/utils/axios";
import { Categories } from "./_components/categories";
import CourseList from "@/Components/Course/CourseList";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const searchParams = useSearchParams();

    const title = searchParams.get("title") || "";
    const categoryId = searchParams.get("categoryId") || "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, courseRes] = await Promise.all([
                    axios.get("/categories"),
                    axios.get("/courses/list", {
                        params: {
                            title, categoryId
                        }
                    }),
                ]);

                setCategories(catRes.data.data);
                setCourses(courseRes.data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [title, categoryId]);

    return (
        <Layout title="Search Courses">
            <>
                <div className="px-6 pt-6 md:hidden md:mb-0 block">
                    <SearchInput />
                </div>
                <div className="p-6 space-y-4">
                    <Categories items={categories} />
                    <CourseList courses={courses} />
                </div>
            </>
        </Layout>
    );
}

export default SearchPage;