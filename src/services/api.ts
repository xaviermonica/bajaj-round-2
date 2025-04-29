import axios from 'axios';
import { User, FormResponse } from '../types';

const BASE_URL = 'https://dynamic-form-generator-9rl7.onrender.com';

export const createUser = async (userData: User): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/create-user`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getForm = async (rollNumber: string): Promise<FormResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/get-form?rollNumber=${rollNumber}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};