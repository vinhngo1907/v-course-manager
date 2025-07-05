import { SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
// import Heading from '@/Components/Course/Heading'
import CourseForm, { Inputs } from '@/Components/Course/CourseForm'
import { axios } from '@/utils/axios'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { AuthorizationHeader } from '@/services/request.extras'

type CourseCreateResult = {
    id: number
}

export default function AdminNewCoursePage() {
    const router = useRouter()
    // const profile = useProfile()
    const { authState: { authLoading, isAuthenticated, user } } = useContext(AuthContext)!;
    if (authLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-blue-500"></div>
                    <span className="text-gray-700">Loading...</span>
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

    const handler = async (newCourse: Inputs) => {
        const payload = { ...newCourse, authorId: user?.id }
        console.log({payload})
        const { data } = await axios.post('/courses', payload, {
            withCredentials: true,
            headers: AuthorizationHeader(), // nếu bạn xài Bearer
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

    return (
        <div>
            {/* <Heading>New course</Heading> */}
            <CourseForm onSubmit={onSubmit} isLoading={mutation.isPending} />
        </div>
    )
}