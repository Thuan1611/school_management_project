import { useMutation, useQuery } from '@tanstack/react-query';
import { Modal } from 'antd';
import React, { useEffect, useState, type ReactElement } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { createClass, getClassDetail, updateClass } from '../../../api/classes';
import { toast } from 'react-toastify';
import { queryClient } from '../../../api/useQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import type { IClass } from '../../../types/IClass';
import { classSchema } from '../../../schema/classSchema';
import { getTeacher } from '../../../api/teacher';
import { getStudent } from '../../../api/student';
import { useAppSelector } from '../../../hooks/hooks';

type Props = { children: ReactElement; idClass?: string };
const FormModalClass = ({ children, idClass }: Props) => {
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
    } = useForm<IClass>({
        resolver: zodResolver(classSchema),
    });

    //List DataSubject
    const { data: dataTeacher } = useQuery({
        queryKey: ['teacher'],
        queryFn: async () => {
            const { data } = await getTeacher(query);
            return data;
        },
    });

    //List DataDetailTeacher
    const { data: dataClassesDetail } = useQuery({
        queryKey: ['classes', id],
        queryFn: async () => {
            const { data } = await getClassDetail(String(id!));
            return data.data;
        },
        enabled: !!id && isModalOpen,
    });

    //List DataDetailStudent
    const { data: dataStudent } = useQuery({
        queryKey: ['student'],
        queryFn: async () => {
            const { data } = await getStudent(query);
            return data;
        },
    });

    //Update classes
    const mutationTeacher = useMutation({
        mutationKey: ['classes'],
        mutationFn: (data: IClass) => {
            if (!id) {
                return createClass(data);
            }
            return updateClass(String(id), data);
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
        navi('/classes');
    };
    const onSubmit: SubmitHandler<IClass> = (data) => {
        setDisable(true);
        mutationTeacher.mutate({ ...data, capacity: data.studentIds.length });
    };

    useEffect(() => {
        if (dataClassesDetail) {
            reset(dataClassesDetail);
        }
    }, [dataClassesDetail, reset]);
    return (
        <>
            {React.cloneElement(children, {
                onClick: () => {
                    if (idClass) {
                        navi(`/classes/${idClass}`);
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
                        {/* Họ và tên */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                                Tên lớp <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('name', { required: true, minLength: 3 })}
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg  transition-colors"
                                placeholder="10A14"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}{' '}
                        </div>
                        {/*Khối */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Khối</label>
                            <select
                                {...register('grade', { valueAsNumber: true })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg transition-colors"
                            >
                                <option value="">-- Chọn khối --</option>
                                <option value={10}>Khối 10</option>
                                <option value={11}>Khối 11</option>
                                <option value={12}>Khối 12</option>
                            </select>
                            {errors.grade && <p className="text-red-500 text-sm">{errors.grade.message}</p>}{' '}
                        </div>
                        {/* Danh sách học sinh */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700">Học Sinh</label>
                            <div className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition bg-white max-h-48 overflow-y-auto space-y-2">
                                {dataStudent?.map((item: any) => (
                                    <label
                                        key={item._id}
                                        className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-1"
                                    >
                                        <input
                                            type="checkbox"
                                            value={item._id}
                                            {...register('studentIds', {
                                                required: 'Vui lòng chọn ít nhất 1 học sinh',
                                            })}
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm">{item.name}</span>
                                        {errors.studentIds && (
                                            <p className="text-red-500 text-sm">{errors.studentIds.message}</p>
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700">Người chủ nhiệm</label>
                            <div className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition bg-white max-h-48 overflow-y-auto space-y-2">
                                {dataTeacher?.map((item: any) => (
                                    <label
                                        key={item._id}
                                        className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-1"
                                    >
                                        <input
                                            type="radio"
                                            value={item._id}
                                            {...register('supervisor', {
                                                required: 'Vui lòng chọn ít nhất 1 môn',
                                            })}
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm">{item.name}</span>
                                        {errors.supervisor && (
                                            <p className="text-red-500 text-sm">{errors.supervisor.message}</p>
                                        )}{' '}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Nút submit */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        >
                            Hủy
                        </button>
                        <button
                            disabled={disable}
                            type="submit"
                            className="px-8 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-sm"
                        >
                            {id ? 'Sửa lớp học' : 'Thêm lớp học'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default FormModalClass;
