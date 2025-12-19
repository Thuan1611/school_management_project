import type { ILesson } from '../types/ILessons';
import api from './api';

export const getLesson = async () => {
    const { data } = await api.get('lessons');
    return data;
};
export const createLesson = async (body: ILesson) => {
    const { data } = await api.post('lessons', body);
    return data;
};
export const getLessonDetail = async (id: string) => {
    const { data } = await api.get(`lessons/${id}`);
    return { data };
};
export const updateLesson = async (id: string, body: ILesson) => {
    const { data } = await api.put(`lessons/${id}`, body);
    return { data };
};
export const deleteLesson = async (id: string) => {
    const { data } = await api.delete(`lessons/${id}`);
    return { data };
};
