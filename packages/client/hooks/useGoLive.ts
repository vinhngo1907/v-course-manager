import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setIsStreamer, setUserRole } from "@/redux/features/liveVideoStreamingSlice";
import { useRouter } from "next/router";

const useGoLive = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleGoLive = () => {
        dispatch(setIsStreamer(true));
        dispatch(setUserRole("streamer"));
        
        router.push("/livestream");
    };

    return { handleGoLive };
};

export default useGoLive;