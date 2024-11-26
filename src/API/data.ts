import axios from 'axios';
import { initializeMockServer } from './mockApi';
import { FormField } from '../types/form.types';

export const getFormData = async (): Promise<FormField[]> => {
    try {
        const mock = initializeMockServer();
        const response = await axios.get('/api/form');
        mock.restore();
        return response.data;
    } catch (error) {
        console.error('Error fetching form data:', error);
        throw error;
    }
};
