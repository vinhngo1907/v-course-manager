"use client";

import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import CourseForm, { Inputs } from '@/Components/Course/CourseForm'
import { axios } from '@/utils/axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { AuthorizationHeader } from '@/services/request.extras'
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../Globals/Ui/Form'
// import { Input } from '../Globals/Ui/Input'
// import Link from 'next/link'
// import { Button } from '../Globals/Ui/Button'
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

type CourseCreateResult = {
    id: number
}

// const formSchema = z.object({
//     title: z.string().min(1, {message:"Title is required"}),
//     authorId: z.string().min(1, {message: "Your need to login at first!!"}),
//     description: z.string().min(1, {message: "Description is required"})
// });

export default function AdminNewCoursePage() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);

    const { authState: { authLoading, isAuthenticated, user } } = useContext(AuthContext)!;
    if (authLoading) {
        return (
            <div className="flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-[#F4A300]"></div>
                    <span className="text-[#F4A300]">Loading...</span>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold text-red-600">Access Denied</h2>
                    <p className="mt-2 text-gray-600">You don&apos;t have permission to view this page.</p>
                    <a
                        href="/login"
                        className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Login
                    </a>
                </div>
            </div>
        );
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const catRes = await axios.get("/categories", {
                    headers: AuthorizationHeader(),
                });

                setCategories(catRes.data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [user])

    const handler = async (newCourse: Inputs) => {
        const payload = { ...newCourse, authorId: user?.id }
        const { data } = await axios.post('/courses', payload, {
            withCredentials: true,
            headers: AuthorizationHeader(),
        });
        return data
    }

    const mutation = useMutation({
        mutationFn: handler,
        onSuccess: (data: CourseCreateResult) => {
            toast.success('Course created successfully!')
            router.push(`/admin/courses/${data.id}`)
        },
        onError: (error) => {
            console.error(error)
            toast.error('Something went wrong')
        },
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        mutation.mutate(data)
    }

    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {title: "", description: "", authorId: user?.id}
    // });

    // const {isSubmitting, isValid} = form.formState;

    // const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //     try {
    //         const response = await axios.post('/courses', values, {
    //             headers: AuthorizationHeader()
    //         });

    //         /*
    //             The /api/courses/route.ts POST API route returns a response 
    //             which is the course created 
    //         */
    //         router.push(`/admin/courses/${response.data.id}`);
    //         toast.success("Course created");
    //     } catch {
    //         toast.error("Something went wrong")
    //     }
    // }

    return (
        <div className="max-w-5xl mx-auto flex md:items-center h-full p-6">
            <div>
                <p className="text-lg text-slate-600 text-white">
                    What would you like to name your course? Don&apos;t worry,
                    you can change this later
                </p>
                <CourseForm onSubmit={onSubmit} isLoading={mutation.isPending} categories={categories} />
                {/* <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Advanced Web Development'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        What will you teach in this course?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/">
                                <Button type="button" variant="ghost">
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form> */}
            </div>
        </div>
    )
}