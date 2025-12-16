import React, { useEffect, useState, type ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { ISubject } from '../../../types/ISubject';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { createSubject, getSubjectDetail, updateSubject } from '../../../api/subject';
import { useMutation, useQuery } from '@tanstack/react-query';

import { toast } from 'react-toastify';
import { queryClient } from '../../../api/useQuery';
import { Modal } from 'antd';
import { getTeacher } from '../../../api/teacher';
import { subjectSchema } from '../../../schema/subjectSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ITeacher } from '../../../types/ITeacher';

type Props = { children: ReactElement; idSubject?: string };
const FormModalSubject = ({ children, idSubject }: Props) => {
    const navi = useNavigate();
    const [disable, setDisable] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ISubject>({ resolver: zodResolver(subjectSchema) });

    //List DataClass
    const { data: dataTeacher } = useQuery({
        queryKey: ['teacher'],
        queryFn: async () => {
            const { data } = await getTeacher();
            return data;
        },
    });

    //List DataDetailSubject
    const { data: dataSubjectDetail } = useQuery({
        queryKey: ['Subject', id],
        queryFn: async () => {
            const { data } = await getSubjectDetail(String(id!));
            return data.data;
        },
        enabled: !!id && isModalOpen,
    });

    //Update Subject
    const mutationSubject = useMutation({
        mutationKey: ['Subject'],
        mutationFn: (data: ISubject) => {
            if (!id) {
                return createSubject({ ...data });
            }
            return updateSubject(String(id), { ...data });
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
        navi('/subjects');
    };
    const onSubmit: SubmitHandler<ISubject> = (data) => {
        setDisable(true);
        mutationSubject.mutate(data);
    };

    useEffect(() => {
        if (dataSubjectDetail) {
            reset(dataSubjectDetail);
        }
    }, [dataSubjectDetail,reset]);
    return (
        <>
            {React.cloneElement(children, {
                onClick: () => {
                    if (idSubject) {
                        navi(`/subjects/${idSubject}`);
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
                        {/* Tên môn học */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                                Tên môn học<span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('name', { required: true, minLength: 3 })}
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg  transition-colors"
                                placeholder="Nguyễn Văn A"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}{' '}
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700">Người dạy</label>
                            <div className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition bg-white max-h-48 overflow-y-auto space-y-2">
                                {dataTeacher?.map((item: ITeacher) => (
                                    <label
                                        key={item._id}
                                        className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-1"
                                    >
                                        <input
                                            type="checkbox"
                                            value={item._id}
                                            {...register('teachers', {
                                                required: 'Vui lòng chọn ít nhất 1 môn',
                                            })}
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm">{item.name}</span>
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
                            {id ? 'Sửa Môn học' : 'Thêm Môn học'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default FormModalSubject;
