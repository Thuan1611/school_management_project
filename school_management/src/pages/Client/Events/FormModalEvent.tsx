import { useMutation, useQuery } from '@tanstack/react-query';
import { Modal } from 'antd';
import React, { useEffect, useState, type ReactElement } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { getClass } from '../../../api/classes';
import { toast } from 'react-toastify';
import { queryClient } from '../../../api/useQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import type { IEvent } from '../../../types/IEvent';
import { createEvent, getEventDetail, updateEvent } from '../../../api/event';
import { eventSchema } from '../../../schema/eventSchema';
import type { IClass } from '../../../types/IClass';
import { getTeacher } from '../../../api/teacher';
import { useAppSelector } from '../../../hooks/hooks';

type Props = { children: ReactElement; idEvent?: string };
const FormModalEvent = ({ children, idEvent }: Props) => {
    const query = useAppSelector((state) => state.filter.query);
    const navi = useNavigate();
    const [disable, setDisable] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IEvent>({
        resolver: zodResolver(eventSchema),
    });

    //List DataClass
    const { data: dataClass } = useQuery({
        queryKey: ['class'],
        queryFn: async () => {
            const { data } = await getClass();
            return data;
        },
    });
    const { data: dataTeacher } = useQuery({
        queryKey: ['teacher'],
        queryFn: async () => {
            const { data } = await getTeacher(query);
            return data;
        },
    });
    //List dataEventDetail
    const { data: dataEventDetail } = useQuery({
        queryKey: ['event', id],
        queryFn: async () => {
            const { data } = await getEventDetail(String(id!));
            return data.data;
        },
        enabled: !!id && isModalOpen,
    });

    //Update event
    const mutationEvents = useMutation({
        mutationKey: ['event'],
        mutationFn: (data: IEvent) => {
            if (!id) {
                return createEvent(data);
            }
            return updateEvent(String(id), data);
        },
        onSuccess: () => {
            toast.success(id ? 'Sửa thành công' : 'Thêm thành công');
            reset();
            setIsModalOpen(false);
            queryClient.invalidateQueries();
            setDisable(false);
        },
        onError: () => {
            console.log(errors);
            toast.error('Lỗi rồi kìa');
        },
    });

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        navi('/events');
    };
    const onSubmit: SubmitHandler<IEvent> = (data) => {
        setDisable(true);
        mutationEvents.mutate(data);
    };

    useEffect(() => {
        if (dataEventDetail) {
            const date = dataEventDetail.date.slice(0, 10);
            reset({ ...dataEventDetail, date: date });
        }
    }, [dataEventDetail, reset]);
    return (
        <>
            {React.cloneElement(children, {
                onClick: () => {
                    if (idEvent) {
                        navi(`/events/${idEvent}`);
                        showModal();
                    }
                    showModal();
                },
            } as { onClick: () => void })}

            <Modal
                title="Basic Modal"
                closable={{ 'aria-label': 'Custom Close Button' }}
                footer={null}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Tên buổi học <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('title')}
                                placeholder="VD: Toán học - Ôn tập chương 3"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Ngày <span className="text-red-500">*</span>
                            </label>
                            <input {...register('date')} type="date" className="w-full px-4 py-2 border rounded-lg" />
                            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Giáo viên dạy <span className="text-red-500">*</span>
                            </label>
                            <select {...register('teacherId')} className="w-full px-4 py-2 border rounded-lg">
                                <option value="">Chọn giáo viên</option>
                                {dataTeacher?.map((t: any) => (
                                    <option value={t._id}>{t.name}</option>
                                ))}
                            </select>
                            {errors.teacherId && (
                                <p className="text-red-500 text-sm mt-1">{errors.teacherId.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Lớp học <span className="text-red-500">*</span>
                            </label>
                            <select {...register('class')} className="w-full px-4 py-2 border rounded-lg">
                                <option value="">Chọn lớp</option>
                                {dataClass?.map((c: IClass) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            {errors.class && <p className="text-red-500 text-sm mt-1">{errors.class.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Giờ bắt đầu <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('startTime')}
                                type="time"
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            {errors.startTime && (
                                <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Giờ kết thúc <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('endTime')}
                                type="time"
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime.message}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2.5 border rounded-lg hover:bg-gray-50"
                        >
                            Hủy
                        </button>
                        <button
                            disabled={disable}
                            type="submit"
                            className="px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {id ? 'Sửa sự kiện' : 'Thêm sự kiện'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default FormModalEvent;
