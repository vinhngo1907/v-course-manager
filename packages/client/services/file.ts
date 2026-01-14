import { axios } from '@/utils/axios';

export const uploadFile = async (
    type: string,
    file: File,
    updateProgress: (percent: number) => void
) => {
    try {
        const formData = new FormData();
        formData.append('type', type);
        formData.append('file', file);

        const response = await axios.post('/file', formData, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
                );
                updateProgress(percentCompleted);
            }
        });

        return response.data?.data;
    } catch (error: any) {
        console.error(error.message);
        return null;
    }
};
