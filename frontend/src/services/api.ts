import axios from 'axios';
import { Experience, ExperienceDetails, BookingPayload } from '../types/index';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.response.use(response => {
    const prependBaseUrl = (item: any) => {
        if (item && item.image_url) {
            if (!item.image_url.startsWith('http')) {
                item.image_url = `${API_BASE_URL}${item.image_url}`;
            }
        }
    };
    if (Array.isArray(response.data)) {
        response.data.forEach(prependBaseUrl);
    } else if (response.data?.details) {
        prependBaseUrl(response.data.details);
    }
    return response;
});

export const getExperiences = async (): Promise<Experience[]> => {
    const response = await api.get('/api/experiences');
    return response.data;
};

export const getExperienceDetails = async (id: string): Promise<ExperienceDetails> => {
    const response = await api.get(`/api/experiences/${id}`);
    return response.data;
};

export const createBooking = async (payload: BookingPayload) => {
    const response = await api.post('/api/bookings', payload);
    return response.data;
};

export const validatePromo = async (code: string) => {
    const response = await api.post('/api/promo/validate', { code });
    return response.data;
}