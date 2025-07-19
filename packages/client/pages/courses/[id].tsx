// import { useRouter } from 'next/router'
// import { useEffect, useState, useContext } from 'react'
// import CourseViewer from '@/Components/Course/CourseViewer'
// import { AuthContext } from '@/context/AuthContext'
// import Layout from '@/Components/Layouts'
// import { axios } from '@/utils/axios'
// import Loading from '@/Components/Loading'

// const CoursePage = () => {
//     const router = useRouter()
//     const { id } = router.query

//     const { authState } = useContext(AuthContext)!
//     const { isAuthenticated, user } = authState

//     const [course, setCourse] = useState(null)
//     const [completedLessons, setCompletedLessons] = useState<string[]>([])

//     useEffect(() => {
//         if (!id) return

//         const fetchCourse = async () => {
//             try {
//                 const res = await axios.get(`/courses/${id}`)

//                 setCourse(res.data.course)
//                 setCompletedLessons(res.data.completedLessons)
//             } catch (err) {
//                 console.error(err)
//             }
//         }

//         fetchCourse()
//     }, [id])

//     return (
//         <Layout title='Detail Course'  isWide>
//             {course ? (
//                 <CourseViewer
//                     course={course}
//                     lessonProgress={completedLessons}
//                     setLessonProgress={setCompletedLessons}
//                 />
//             ) : (
//                 <Loading />
//             )}
//         </Layout>
//     )
// }

// export default CoursePage

import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { ModalContext } from '@/context/ModalContext';
import Layout from '@/Components/Layouts';
import Loading from '@/Components/Loading';
import VideoViewer from '@/Components/Video/VideoViewer';
import CourseLesson from '@/Components/Course/CourseLesson';
import CourseComment from '@/Components/Course/CourseComment';
import CourseAuthor from '@/Components/Course/CourseAuthor';
import CourseSubtitle from '@/Components/Course/CourseSubTitle';
import { axios } from '@/utils/axios';
import style from '@/styles/Course.module.css';
import { CONTENT, COMMENT, AUTHOR, DISLIKE, LIKE } from '@/constants/icons';
import { Course } from '@/types';

const TabTitle: any[] = [CONTENT, COMMENT, AUTHOR];

export default function CoursePage() {
    const router = useRouter();
    const { id } = router.query;

    const { authState } = useContext(AuthContext)!;
    const { isAuthenticated } = authState;
    const { toggleModal } = useContext(ModalContext);

    const [course, setCourse] = useState<Course | null>(null);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    const [isCurrentTab, setIsCurrentTab] = useState(0);
    const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
    const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(true);
    useEffect(() => {
        if (!id) return;

        const fetchCourse = async () => {
            try {
                const res = await axios.get(`/courses/${id}`);
                setCourse(res.data.course);
                setCompletedLessons(res.data.completedLessons);
            } catch (err) {
                console.error(err);
            }
        };

        // ✅ Not login
        if (!isAuthenticated) {
            toggleModal('login');
        } else {
            fetchCourse();
        }
    }, [id, isAuthenticated]);

    return (
        <Layout title={course ? course.title : "Course Detail"} isWide>
            {!course ? (
                <Loading />
            ) : (
                <div className={style.coursePageWrap}>
                    <div className={style.courseLeft}>
                        {currentVideoUrl ? (
                            <VideoViewer urlVideo={currentVideoUrl} />
                        ) : (
                            <img
                                src={course.thumbnail}
                                alt="Course thumbnail"
                                className="w-full max-h-[400px] object-cover rounded"
                            />
                        )}

                        <div className={style.courseActions}>
                            <span>
                                <img src={LIKE} alt="" /> 145
                            </span>
                            <span>
                                <img src={DISLIKE} alt="" /> 6
                            </span>
                        </div>
                        {currentVideoId && (
                            <>
                                <div
                                    className={style.courseLanguage}
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    English
                                    <span className={`${style.arrow} ${isOpen ? style.arrowOpen : ''}`} />
                                </div>

                                <CourseSubtitle isOpen={isOpen} />
                            </>
                        )}

                    </div>

                    <div className="tab">
                        <ul className={style.tabTitle}>
                            {TabTitle.map((title, index) => (
                                <li
                                    className={isCurrentTab === index ? style.tabTitleActive : ''}
                                    key={`tab-${index}`}
                                    onClick={() => setIsCurrentTab(index)}
                                >
                                    <img src={title} alt="tab" />
                                </li>
                            ))}
                        </ul>

                        <div className={style.tabBody}>
                            {isCurrentTab === 0 && (
                                <CourseLesson
                                    lessons={course.lessons}
                                    onSelectLesson={(videoUrl: string, videoId: string) => {
                                        setCurrentVideoUrl(videoUrl);
                                        setCurrentVideoId(videoId)
                                    }}
                                    completedLessons={completedLessons}
                                />
                            )}
                            {/* {isCurrentTab === 1 && <CourseComment videoId={currentVideoId}/>} */}
                            {isCurrentTab === 1 && (
                                currentVideoId ? (
                                    <CourseComment videoId={currentVideoId} />
                                ) : (
                                    <div className="w-full py-6 flex justify-center">
                                        <p className="text-sm text-gray-400 italic">
                                            📺 Please select a lesson to view comments.
                                        </p>
                                    </div>
                                )
                            )}
                            {isCurrentTab === 2 && <CourseAuthor />}
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
