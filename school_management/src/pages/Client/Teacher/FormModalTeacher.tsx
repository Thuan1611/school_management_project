'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Modal } from 'antd';
import React, { useEffect, useState, type ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { getClass } from '../../../api/classes';
import { getSubject } from '../../../api/subject';
import { getTeacherDetail, updateTeacher } from '../../../api/teacher';
import { toast } from 'react-toastify';
import { queryClient } from '../../../api/useQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { createTeacherSchema, updateTeacherSchema, type UpdateTeacherInput } from '../../../schema/teacherSchema';
import { registerAuth } from '../../../api/auth';

type Props = { children: ReactElement; idTeacher?: string };

const FormModalTeacher = ({ children, idTeacher }: Props) => {
    const navi = useNavigate();
    const [disable, setDisable] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();
    const isEditMode = !!id;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateTeacherInput>({
        resolver: zodResolver(isEditMode ? updateTeacherSchema : createTeacherSchema) as any,
    });

    // List DataSubject
    const { data: dataSubject } = useQuery({
        queryKey: ['subject'],
        queryFn: async () => {
            const { data } = await getSubject();
            return data;
        },
    });

    // List DataClass
    const { data: dataClass } = useQuery({
        queryKey: ['class'],
        queryFn: async () => {
            const { data } = await getClass();
            return data;
        },
    });

    // List DataDetailTeacher
    const { data: dataTeacherDetail } = useQuery({
        queryKey: ['teacher', id],
        queryFn: async () => {
            const { data } = await getTeacherDetail(String(id!));
            return data.data;
        },
        enabled: !!id && isModalOpen,
    });

    // Mutation Teacher
    const mutationTeacher = useMutation({
        mutationKey: ['teacher'],
        mutationFn: (data: UpdateTeacherInput) => {
            // Đảm bảo subjects và classes luôn là array
            const payload = {
                ...data,
                role: 'teacher' as const,
                subjects: data.subjects || [],
                classes: data.classes || [],
            };

            // Loại bỏ password nếu rỗng khi update

            if (!isEditMode) {
                return registerAuth(payload);
            }
            return updateTeacher(String(id), payload);
        },
        onSuccess: () => {
            toast.success(isEditMode ? 'Sửa thành công' : 'Thêm thành công');

            setIsModalOpen(false);
            queryClient.invalidateQueries();
            setDisable(false);
        },
        onError: (error: any) => {
            console.log('Mutation error:', error);
            console.log('Form errors:', errors);
            toast.error(error?.response?.data?.message || 'Có lỗi xảy ra');
            setDisable(false);
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
        if (id) {
            navi('/teachers');
        }
    };

    const onSubmit = (data: UpdateTeacherInput) => {
        console.log('Form data submit:', data);
        setDisable(true);
        mutationTeacher.mutate(data);
    };

    useEffect(() => {
        if (dataTeacherDetail) {
            reset(dataTeacherDetail);
        }
    }, [dataTeacherDetail, reset]);

    return (
        <>
            {React.cloneElement(children, {
                onClick: () => {
                    if (idTeacher) {
                        navi(`/teachers/${idTeacher}`);
                    }
                    showModal();
                },
            } as { onClick: () => void })}

            <Modal
                title={isEditMode ? 'Sửa thông tin giáo viên' : 'Thêm giáo viên mới'}
                closable={{ 'aria-label': 'Custom Close Button' }}
                footer={null}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Họ và tên */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                                Họ và tên <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('name')}
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nguyễn Văn A"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                                Email đăng nhập <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('email')}
                                type="email"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="example@school.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        {!id && (
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">
                                    Mật khẩu {!isEditMode && <span className="text-red-500">*</span>}
                                    {isEditMode && (
                                        <span className="text-gray-500 text-xs ml-1">(để trống nếu không đổi)</span>
                                    )}
                                </label>
                                <input
                                    {...register('password')}
                                    type="password"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={isEditMode ? 'Để trống nếu không đổi' : 'Ít nhất 6 ký tự'}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>
                        )}

                        {/* Giới tính */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Giới tính</label>
                            <select
                                {...register('sex')}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                            </select>
                            {errors.sex && <p className="text-red-500 text-sm">{errors.sex.message}</p>}
                        </div>

                        {/* Số điện thoại */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
                            <input
                                {...register('phone')}
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="0901234567"
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                        </div>

                        {/* Địa chỉ */}
                        <div className="space-y-1 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Địa chỉ</label>
                            <input
                                {...register('address')}
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Hoàng Diệu - Chương Mỹ - Hà Nội"
                            />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                        </div>

                        {/* Môn dạy */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Môn dạy</label>
                            <div className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition bg-white max-h-48 overflow-y-auto space-y-2">
                                {dataSubject?.length > 0 ? (
                                    dataSubject.map((item: any) => (
                                        <label
                                            key={item._id}
                                            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                                        >
                                            <input
                                                type="checkbox"
                                                value={item._id}
                                                {...register('subjects')}
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-sm">{item.name}</span>
                                        </label>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">Không có môn học nào</p>
                                )}
                            </div>
                            {errors.subjects && <p className="text-red-500 text-sm">{errors.subjects.message}</p>}
                        </div>

                        {/* Lớp phụ trách */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Lớp phụ trách</label>
                            <div className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition bg-white max-h-48 overflow-y-auto space-y-2">
                                {dataClass?.length > 0 ? (
                                    dataClass.map((item: any) => (
                                        <label
                                            key={item._id}
                                            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                                        >
                                            <input
                                                type="checkbox"
                                                value={item._id}
                                                {...register('classes')}
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-sm">{item.name}</span>
                                        </label>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">Không có lớp học nào</p>
                                )}
                            </div>
                            {errors.classes && <p className="text-red-500 text-sm">{errors.classes.message}</p>}
                        </div>

                        {/* Ảnh đại diện */}
                        <div className="space-y-1 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Link ảnh đại diện (URL)</label>
                            <input
                                {...register('photo')}
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://example.com/avatar.jpg"
                            />
                            {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            disabled={disable}
                            type="submit"
                            className="px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {disable ? 'Đang xử lý...' : isEditMode ? 'Cập nhật' : 'Thêm mới'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default FormModalTeacher;
