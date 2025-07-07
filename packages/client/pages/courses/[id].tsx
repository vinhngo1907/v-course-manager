import { useRouter } from 'next/router'
import { useEffect, useState, useContext } from 'react'
import CourseViewer from '@/Components/Course/CourseViewer'
import { AuthContext } from '@/context/AuthContext'
import Layout from '@/Components/Layouts'
import { axios } from '@/utils/axios'

const CoursePage = () => {
    const router = useRouter()
    const { id } = router.query

    const { authState } = useContext(AuthContext)!
    const { isAuthenticated, user } = authState

    const [course, setCourse] = useState(null)
    const [completedLessons, setCompletedLessons] = useState<string[]>([])

    useEffect(() => {
        if (!id) return

        const fetchCourse = async () => {
            try {
                const res = await axios.get(`/courses/${id}`)
                
                setCourse(res.data.course)
                setCompletedLessons(res.data.completedLessons)
            } catch (err) {
                console.error(err)
            }
        }

        fetchCourse()
    }, [id])

    return (
        <Layout title='Detail Course'  isWide>
            {course ? (
                <CourseViewer
                    course={course}
                    lessonProgress={completedLessons}
                    setLessonProgress={setCompletedLessons}
                />
            ) : (
                <p className="text-center py-10">Loading...</p>
            )}
        </Layout>
    )
}

export default CoursePage
