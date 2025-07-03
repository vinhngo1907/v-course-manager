import type { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
// import type { Course, Lesson, Video } from '@prisma/client'
import { Course, Video, Lesson } from '@/types';
import CourseForm, { Inputs } from '@components/Course/CourseForm'
import { SubmitHandler } from 'react-hook-form'
import Button from '@components/Layouts/Button'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

type Session = {
    id: number
    email: string
    name: string
}

type AdminCourseEditPageProps = {
    session: Session
    course: Course & {
        lessons: (Lesson & {
            video: Video | null
        })[]
    }
}

type CourseUpdateResult = {
    id: number
}

const AdminCourseEdit: NextPage<AdminCourseEditPageProps> = ({ session, course }) => {
    const handler = (data: Inputs) => {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/${course.id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (!res.ok) throw new Error('Update failed')
            return res.json()
        })
    }

    const mutation = useMutation({
        mutationFn: handler,
        onSuccess: () => {
            toast.success('Course updated successfully')
        },
        onError: (error) => {
            console.error(error)
            toast.error('Something went wrong')
        }
    })

    const onSubmit: SubmitHandler<Inputs> = async data => {
        mutation.mutate(data)
    }

    if (!session) {
        return <p>Access Denied</p>
    }

    return (
        <div className="grid md:grid-cols-2">
            <div>
                {/* <Heading as="h2">{course.name}</Heading> */}
                <h2>{course.title}</h2>
                <CourseForm onSubmit={onSubmit} course={course} isLoading={mutation.isPending} />
            </div>

            <div>
                {/* <Heading as="h4">Lessons</Heading> */}
                <h4>Lessons</h4>
                {course.lessons.length > 0 ? (
                    <>
                        {course.lessons.map(lesson => (
                            <Link
                                key={lesson.id}
                                href={`/admin/courses/${course.id}/lessons/${lesson.id}`}
                                className="flex gap-4 border border-gray-200 rounded-lg mb-6 cursor-pointer"
                            >
                                {lesson.video?.publicPlaybackId && (
                                    <Image
                                        src={`https://image.mux.com/${lesson.video.publicPlaybackId}/thumbnail.jpg?width=640`}
                                        alt={`Video thumbnail preview for ${lesson.name}`}
                                        width={180}
                                        height={100}
                                    />
                                )}

                                <div className="py-2">
                                    {/* <Heading as="h5">{lesson.name}</Heading> */}
                                    <h5>{lesson.name}</h5>
                                </div>
                            </Link>
                        ))}
                    </>
                ) : (
                    <div>
                        <h2>None yet.</h2>
                    </div>
                )}

                <Link href={`/admin/courses/${course.id}/lessons/new`}>
                    <Button intent="secondary">Add a lesson</Button>
                </Link>
            </div>
        </div>
    )
}

export default AdminCourseEdit

export const getServerSideProps: GetServerSideProps = async (context) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

    // 1️⃣ Lấy thông tin user
    const profileRes = await fetch(`${baseUrl}/api/auth/profile`, {
        headers: {
            Cookie: context.req.headers.cookie || ''
        }
    })

    if (!profileRes.ok) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const session: Session = await profileRes.json()

    // 2️⃣ Lấy thông tin course
    const id = context?.params?.courseId
    if (typeof id !== 'string') {
        throw new Error('Missing courseId param')
    }

    const courseRes = await fetch(`${baseUrl}/api/courses/${id}`, {
        headers: {
            Cookie: context.req.headers.cookie || ''
        }
    })

    if (!courseRes.ok) {
        return {
            notFound: true
        }
    }

    const course: Course & { lessons: (Lesson & { video: Video | null })[]; author: { email: string } } =
        await courseRes.json()

    if (course.author.email !== session.email) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            session,
            course
        }
    }
}
