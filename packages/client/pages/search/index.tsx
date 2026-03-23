"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/Components/Layouts";
import { SearchInput } from "./_components/search-input";
import { axios } from "@/utils/axios";
import { Categories } from "./_components/categories";

const SearchPage = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("/categories");
                setCategories(res.data.categories);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCategories();
    }, []);

    return (
        <Layout title="Search Courses">
            <>
                <div className="px-6 pt-6 md:hidden md:mb-0 block">
                    <SearchInput />
                </div>
                <div className="p-6 space-y-4">
                    <Categories items={categories} />
                    {/* <CoursesList items={courses} /> */}
                </div>
            </>
        </Layout>
    );
}

export default SearchPage;