import { AxiosResponse } from "axios";
// import {
//   sendNotification,
//   sendVideoUploadedNotification,
// } from "./notifications";
import { AuthorizationHeader } from "./request.extras";
import { VideoDetailsType } from "@/context/VideoLoadContext";
import { apiUrl } from "@/constants/configs";
import { axios } from "@/utils/axios";
import { IUser, IVideo } from "@/interfaces/index";

export const getAllVideos = async (idUser?: string): Promise<AxiosResponse<any>> => {
    try {
        const url = idUser
            ? `${apiUrl}videosRecommend?idUser=${idUser}`
            : `${apiUrl}videos`;

        return await axios.get(url);
    } catch (err) {
        throw new Error("Failed to fetch videos");
    }
};

export const getVideo = async (id: string): Promise<AxiosResponse<any>> => {
    try {
        return await axios.get(`${apiUrl}videos/${id}`);
    } catch (err) {
        throw new Error("Failed to fetch video");
    }
};

export const ViewVideo = async (
    idVideo: string,
    idUser: string,
    viewsCount: number
): Promise<any> => {
    try {
        await axios.put(
            `${apiUrl}videos/${idVideo}`,
            { viewsCount },
            { headers: AuthorizationHeader() }
        );

        await axios.put(
            `${apiUrl}users/${idUser}`,
            { videoHistory: [idVideo] },
            { headers: AuthorizationHeader() }
        );
    } catch (error) {
        throw new Error("Couldn't update views for this video");
    }
};

export const createVideo = async (
    videoDetails: VideoDetailsType
): Promise<AxiosResponse<any>> => {
    try {
        const res = await axios.post(
            `${apiUrl}videos`,
            videoDetails,
            { headers: AuthorizationHeader() }
        );

        // sendVideoUploadedNotification(
        //   `Just uploaded a new video: ${videoDetails.title}`,
        //   videoDetails.userId
        // );

        return res;
    } catch (err) {
        throw new Error("Failed to create video");
    }
};

export const deleteVideo = async (id: string): Promise<AxiosResponse<any>> => {
    try {
        return await axios.delete(
            `${apiUrl}videos/${id}`,
            { headers: AuthorizationHeader() }
        );
    } catch (err) {
        throw new Error("Failed to delete video");
    }
};

export const likeVideo = async (
    video: IVideo,
    user: IUser
): Promise<{ userAfterLike: any; videoAfterLike: any }> => {
    try {
        const isDisliked = user?.dislikedVideos?.includes(video.id);

        if (isDisliked) {
            await axios.put(
                `${apiUrl}videos/${video.id}`,
                { dislikes: video.dislikes - 1 },
                { headers: AuthorizationHeader() }
            );
        }

        const resUser = await axios.put(
            `${apiUrl}users/${user.id}`,
            { likedVideos: [video.id] },
            { headers: AuthorizationHeader() }
        );

        const resVideo = await axios.put(
            `${apiUrl}videos/${video.id}`,
            { likes: video.likes + 1 },
            { headers: AuthorizationHeader() }
        );

        // sendNotification(
        //   `Just liked your video: ${video.title}`,
        //   resVideo.data.userId,
        //   user.id
        // );

        return { userAfterLike: resUser.data, videoAfterLike: resVideo.data };
    } catch {
        const resUser = await axios.delete(
            `${apiUrl}users/likedVideos/${user.id}`,
            {
                data: { idVideo: video.id },
                headers: AuthorizationHeader(),
            }
        );

        const resVideo = await axios.put(
            `${apiUrl}videos/${video.id}`,
            { likes: video.likes - 1 },
            { headers: AuthorizationHeader() }
        );

        return { userAfterLike: resUser.data, videoAfterLike: resVideo.data };
    }
};