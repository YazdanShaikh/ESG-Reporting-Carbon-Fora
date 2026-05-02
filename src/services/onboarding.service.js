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

/**
 * Upload registration certificate (PDF/image) and/or HR master Excel for AI autofill.
 * Backend must implement POST /brand/onboarding/extract-documents (see docs/BACKEND_ONBOARDING_EXTRACT.md).
 */
export const extractOnboardingDocuments = async (
    { registrationCertificate, hrMasterSheet },
    axiosConfig = {}
) => {
    const data = new FormData();
    if (registrationCertificate) {
        data.append("registrationCertificate", registrationCertificate);
    }
    if (hrMasterSheet) {
        data.append("hrMasterSheet", hrMasterSheet);
    }
    const { timeout = 120000, ...rest } = axiosConfig;
    const response = await axiosInstance.post(
        `/brand/onboarding/extract-documents`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            timeout,
            ...rest,
        }
    );
    return response;
};
