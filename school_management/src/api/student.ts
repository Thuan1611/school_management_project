import type { IProductQuery } from '../types/IQuery';
import type { IStudent } from '../types/IStudent';
import { cleanParams } from '../ultis/cleanupParams';
import api from './api';

export const getStudent = async (query: IProductQuery ) => {
    const params = cleanParams(query);
    const { data } = await api.get('student', { params });
    return data;
};
export const createStudent = async (body: IStudent) => {
    const { data } = await api.post('student', body);
    return data;
};
export const getStudentDetail = async (id: string) => {
    const { data } = await api.get(`student/${id}`);
    return { data };
};
export const updateStudent = async (id: string, body: IStudent) => {
    const { data } = await api.put(`student/${id}`, body);
    return { data };
};
export const deleteStudent = async (id: string) => {
    const { data } = await api.delete(`student/${id}`);
    return { data };
};
