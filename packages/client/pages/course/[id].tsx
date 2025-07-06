import React, { useState } from 'react';
import { TEST_VIDEO } from '@/constants/videos';
import { CONTENT, COMMENT, AUTHOR, DISLIKE, LIKE } from '@/constants/icons';
import VideoViewer from '@/Components/Video/VideoViewer';
import style from '@/styles/Course.module.css';
import CourseLesson from '@/Components/Course/CourseLesson';
import CourseComment from '@/Components/Course/CourseComment';
import CourseAuthor from '@/Components/Course/CourseAuthor';
import CourseSubtitle from '@/Components/Course/CourseSubTitle';
import Layout from '@/Components/Layouts';

const TabTitle: any[] = [CONTENT, COMMENT, AUTHOR];
const CoursePage = () => {
    const [isCurrentTab, setIsCurrentTab] = useState(0);

    return (
        <Layout isWide={true} title="Course - Simple Swift App">
            <div>
                <div className={style.coursePageWrap}>
                    <div className={style.courseLeft}>
                        <VideoViewer urlVideo={TEST_VIDEO} />
                        <div className={style.CourseActions}>
                            <span>
                                <img src={LIKE} alt="" /> 145
                            </span>
                            <span>
                                <img src={DISLIKE} alt="" /> 6
                            </span>
                        </div>
                        <div className={style.courseLanguage}> English <span /></div>
                        <CourseSubtitle />
                    </div>
                    <div className='tab'>
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
                            {isCurrentTab === 0 && <CourseLesson />}
                            {isCurrentTab === 1 && <CourseComment />}
                            {isCurrentTab === 2 && <CourseAuthor />}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CoursePage;