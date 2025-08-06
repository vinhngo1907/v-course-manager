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
import Button from '@/Components/Layouts/Button';

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

                        {course && course.createdBy.id == authState.user?.id && (
                            <Button
                                onClick={async () => {
                                    try {
                                        await axios.post(`/courses/registration`, {
                                            userId: authState.user?.id,
                                            courseId: course.id,
                                        });
                                        alert('Đăng ký thành công!');
                                    } catch (err) {
                                        console.error(err);
                                        alert('Lỗi đăng ký.');
                                    }
                                }}
                                className="mt-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black rounded  cursor-pointer"
                            >
                                Register for the course
                            </Button>
                        )}


                        {currentVideoId && (
                            <>
                                <div className={style.courseActions}>
                                    <span>
                                        <img src={LIKE} alt="" /> 145
                                    </span>
                                    <span className="text-white">
                                        <img src={DISLIKE} alt="" /> 6
                                    </span>
                                </div>
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
                                    currentVideoId={currentVideoId} 
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
                            {isCurrentTab === 2 && <CourseAuthor author={{
                                ...course.createdBy,
                                bio: course.description
                            }} />}
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
