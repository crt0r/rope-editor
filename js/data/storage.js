const storage = window.sessionStorage;
const uploadedRoadmapKey = 'uploadedRoadmap';

const getUploadedRoadmap = () => storage.getItem(uploadedRoadmapKey);

const setUploadedRoadmap = (roadmapStr) => storage.setItem(uploadedRoadmapKey, roadmapStr);

const removeUploadedRoadmap = () => storage.removeItem(uploadedRoadmapKey);

export {
    getUploadedRoadmap,
    setUploadedRoadmap,
    removeUploadedRoadmap
};