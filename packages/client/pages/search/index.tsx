"use client";

import Layout from "@/Components/Layouts";

const SearchPage = () => {
    return (
        <Layout title="Search Courses">
            <>
                <div className="px-6 pt-6 md:hidden md:mb-0 block">
                    {/* <INput /> */}
                </div>
                <div className="p-6 space-y-4">
                    Search Page
                    {/* <Categories items={categories} />
                <CoursesList items={courses} /> */}
                </div>
            </>
        </Layout>
    );
}

export default SearchPage;