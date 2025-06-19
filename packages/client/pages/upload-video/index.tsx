'use client';

import { VideoUploadProvider } from '@context/VideoLoadContext';
import Layout from '@components/Layouts';
import UploadVideo from '@components/UploadVideo/UploadVideo';

export default function UploadVideoPage() {
    return (
        <VideoUploadProvider>
            <Layout isWide title="Upload Video">
                <UploadVideo />
            </Layout>
        </VideoUploadProvider>
    );
}