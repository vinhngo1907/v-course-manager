import React from "react";
import LiveStream from "@/Components/LiveStream";
import Layout from "@/Components/Layouts";

const LiveStreaming: React.FC = () => {
    return (
        <Layout title="Live Stream" isWide>
            <LiveStream />
        </Layout>
    );
};

export default LiveStreaming;
