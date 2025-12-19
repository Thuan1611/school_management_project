import type { IEvent } from '../types/IEvent';
import type { IProductQuery } from '../types/IQuery';
import { cleanParams } from '../ultis/cleanupParams';

import api from './api';

export const getEvent = async (query: IProductQuery) => {
    const params = cleanParams(query);

    const { data } = await api.get('event', { params });
    return data;
};
export const createEvent = async (body: IEvent) => {
    const { data } = await api.post('event', body);
    return data;
};
export const getEventDetail = async (id: string) => {
    const { data } = await api.get(`event/${id}`);
    return { data };
};
export const updateEvent = async (id: string, body: IEvent) => {
    const { data } = await api.put(`event/${id}`, body);
    return { data };
};
export const deleteEvent = async (id: string) => {
    const { data } = await api.delete(`event/${id}`);
    return { data };
};
