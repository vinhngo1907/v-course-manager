import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setIsStreamer } from "@/redux/features/liveVideoStreamingSlice";
import { useRouter } from "next/router";

const useGoLive = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleGoLive = () => {
        dispatch(setIsStreamer(true));
        router.push("/livestream");
    };

    return { handleGoLive };
};

export default useGoLive;