export const getNextVideo = (lessons: any[], currentId: string) => {
    let foundCurrent = false;
    for (const lesson of lessons) {
        for (const video of lesson.videos) {
            if (foundCurrent) return video;
            if (video.id === currentId) foundCurrent = true;
        }
    }
    return null;
};