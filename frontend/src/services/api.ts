// // frontend/src/services/api.ts
// import axios from 'axios';
// import { Experience, ExperienceDetails } from '../types';

// const API_BASE_URL = 'http://localhost:5000'; // Your backend URL

// const api = axios.create({
//   baseURL: API_BASE_URL,
// });

// export const getExperiences = (): Promise<Experience[]> => 
//   api.get('/api/experiences').then(res => res.data);

// export const getExperienceDetails = (id: string): Promise<ExperienceDetails> =>
//   api.get(`/api/experiences/${id}`).then(res => res.data);
  
// // Add functions for booking and promo validation here

// // Interceptor to add base URL to image_url
// api.interceptors.response.use(response => {
//     if (response.data) {
//         // If it's an array of experiences
//         if (Array.isArray(response.data)) {
//             response.data.forEach(item => {
//                 if (item.image_url) item.image_url = `${API_BASE_URL}${item.image_url}`;
//             });
//         } 
//         // If it's a single experience detail
//         else if (response.data.details && response.data.details.image_url) {
//             response.data.details.image_url = `${API_BASE_URL}${response.data.details.image_url}`;
//         }
//     }
//     return response;
// });

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