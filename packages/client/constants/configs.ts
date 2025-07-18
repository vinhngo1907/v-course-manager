export const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:3001'
		: 'https://course-manager.onrender.com'

export const LOCAL_STORAGE_TOKEN_NAME = 'v-courses';

export const SET_MAIN_STREAM = "SET_MAIN_STREAM";
export const ADD_PARTICIPANT = "ADD_PARTICIPANT";
export const REMOVE_PARTICIPANT = "REMOVE_PARTICIPANT";
export const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_PARTICIPANT = "UPDATE_PARTICIPANT";
export const SET_IS_STREAMER = "SET_IS_STREAMER";
export const SET_STREAMER = "SET_STREAMER";
export const SET_STREAM_ID = "SET_STREAM_ID";
