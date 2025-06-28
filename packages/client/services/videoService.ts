import axios, { AxiosResponse } from "axios";
// import {
//   sendNotification,
//   sendVideoUploadedNotification,
// } from "./notifications";
import { AuthorizationHeader } from "./request.extras";
import { VideoDetailsType } from "@context/VideoLoadContext";
import { Video } from "@/types";

const API_BASE_URL = "http://localhost:8080/api/";

export interface User {
    id: string;
    likedVideos?: string[];
    dislikedVideos?: string[];
}

export interface VideoDetails {
    title: string;
    userId: string;
    [key: string]: any;
}

export const getAllVideos = async (idUser?: string): Promise<AxiosResponse<any>> => {
    try {
        const url = idUser
            ? `${API_BASE_URL}videosRecommend?idUser=${idUser}`
            : `${API_BASE_URL}videos`;

        return await axios.get(url);
    } catch (err) {
        throw new Error("Failed to fetch videos");
    }
};

export const getVideo = async (id: string): Promise<AxiosResponse<any>> => {
    try {
        return await axios.get(`${API_BASE_URL}videos/${id}`);
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
            `${API_BASE_URL}videos/${idVideo}`,
            { viewsCount },
            { headers: AuthorizationHeader() }
        );

        await axios.put(
            `${API_BASE_URL}users/${idUser}`,
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
            `${API_BASE_URL}videos`,
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
            `${API_BASE_URL}videos/${id}`,
            { headers: AuthorizationHeader() }
        );
    } catch (err) {
        throw new Error("Failed to delete video");
    }
};

export const likeVideo = async (
    video: Video,
    user: User
): Promise<{ userAfterLike: any; videoAfterLike: any }> => {
    try {
        const isDisliked = user?.dislikedVideos?.includes(video.id);

        if (isDisliked) {
            await axios.put(
                `${API_BASE_URL}videos/${video.id}`,
                { dislikes: video.dislikes - 1 },
                { headers: AuthorizationHeader() }
            );
        }

        const resUser = await axios.put(
            `${API_BASE_URL}users/${user.id}`,
            { likedVideos: [video.id] },
            { headers: AuthorizationHeader() }
        );

        const resVideo = await axios.put(
            `${API_BASE_URL}videos/${video.id}`,
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
            `${API_BASE_URL}users/likedVideos/${user.id}`,
            {
                data: { idVideo: video.id },
                headers: AuthorizationHeader(),
            }
        );

        const resVideo = await axios.put(
            `${API_BASE_URL}videos/${video.id}`,
            { likes: video.likes - 1 },
            { headers: AuthorizationHeader() }
        );

        return { userAfterLike: resUser.data, videoAfterLike: resVideo.data };
    }
};