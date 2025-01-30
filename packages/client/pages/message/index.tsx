import React from 'react';
import { TEST_VIDEO } from '@constants/videos';
// import VideoViewer from '@components/Video/VideoViewer';
import styles from './index.module.css';
import Layout from '@components/Layouts';

export default function Message() {
    return (
        <Layout isWide={true} title="Lá đung đưa">
            <div className={styles.normal}>
                Message Page
            </div>
        </Layout>
    );
}
