import { axiosInstance } from "../configs/axios.config";



export const submitOnboarding = async (formData) => {
    try {
        const response = await axiosInstance.post(`/brand/onboarding/submit`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error) {
        console.error("Onboarding API Error:", error);
        throw error;
    }
};

export const getOnboarding = async () => {
    try {
        const response = await axiosInstance.get(`/brand/onboarding/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
