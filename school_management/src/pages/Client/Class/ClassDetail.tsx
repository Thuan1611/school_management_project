'use client';

import { useQuery } from '@tanstack/react-query';
import { Table, Spin, Input, Tag } from 'antd';

import { getClassDetail } from '../../../api/classes';
import { SearchOutlined } from '@ant-design/icons';
import { getTeacher } from '../../../api/teacher';
import { getStudent } from '../../../api/student';
import type { IStudent } from '../../../types/IStudent';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/hooks';

const { Search } = Input;

const ClassDetailPage = () => {
    const { id } = useParams(); // id lớp từ URL
    const query = useAppSelector((state) => state.filter.query);
    // Lấy chi tiết lớp (bao gồm danh sách học sinh)
    const { data: classData, isLoading } = useQuery({
        queryKey: ['class', id],
        queryFn: async () => {
            const { data } = await getClassDetail(String(id));
            return data.data;
        },

        enabled: !!id,
    });
    // Lấy danh sách giáo viên để hiển thị tên GVCN
    const { data: teachers } = useQuery({
        queryKey: ['teacher'],
        queryFn: async () => {
            const { data } = await getTeacher(query);
            return data;
        },
    });
    const { data: students } = useQuery({
        queryKey: ['student'],
        queryFn: async () => {
            const { data } = await getStudent(query);
            return data;
        },
    });
    // // Mutation xóa học sinh khỏi lớp
    // const removeMutation = useMutation({
    //     mutationFn: ({ classId, studentId }: { classId: string; studentId: string }) =>
    //         removeStudentFromClass(classId, studentId),
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ['class', id] });
    //         toast.success('Xóa học sinh khỏi lớp thành công');
    //     },
    // });

    if (isLoading) return <Spin size="large" className="flex justify-center py-20" />;
    if (!classData) return <div>Lớp không tồn tại</div>;

    const { name, grade, supervisor, studentIds = [] } = classData; // students đã populate

    // Tìm tên GVCN
    const homeroomTeacher = teachers?.find((t: any) => t._id === supervisor);

    const dataStudents = studentIds?.map((studentIds: string) => {
        const data = students?.find((c: IStudent) => c._id === studentIds);
        return data;
    });
    console.log(dataStudents);
    const columns = [
        { title: 'STT', render: (_: any, __: any, index: number) => index + 1 },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
            render: (text: string) => <strong>{text}</strong>,
        },
        // { title: 'Ngày sinh', dataIndex: 'birthday', render: (text: string) => text || 'Chưa cập nhật' },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            render: (_: any, record: any) => (
                <Tag color={record?.sex === 'male' ? 'blue' : 'pink'}>
                    {record?.sex === 'male' ? 'Nam' : record?.sex === 'female' ? 'Nữ' : 'Khác'}
                </Tag>
            ),
        },
        { title: 'Email', dataIndex: 'email' },
        { title: 'SĐT', dataIndex: 'phone' },
        // {
        //     title: 'Hành động',
        //     render: (record: any) => (
        //         <Popconfirm
        //             title="Xóa học sinh này khỏi lớp?"
        //             onConfirm={() => removeMutation.mutate({ classId: id as string, studentId: record._id })}
        //             okText="Xóa"
        //             cancelText="Hủy"
        //         >
        //             <Button danger size="small">
        //                 Xóa khỏi lớp
        //             </Button>
        //         </Popconfirm>
        //     ),
        // },
    ];

    return (
        <div className="p-6 space-y-8">
            {/* Thông tin lớp */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{name}</h1>
                        <div className="space-y-2 text-lg">
                            <p>
                                <strong>Khối:</strong> {grade}
                            </p>
                            <p>
                                <strong>Giáo viên chủ nhiệm:</strong>{' '}
                                {homeroomTeacher ? (
                                    <Tag color="green">{homeroomTeacher.name}</Tag>
                                ) : (
                                    <Tag>Chưa gán</Tag>
                                )}
                            </p>
                            <p>
                                <strong>Sĩ số:</strong> <Tag color="blue">{studentIds.length} học sinh</Tag>
                            </p>
                        </div>
                    </div>

                    {/* <FormModalAddStudent classId={id as string}>
                        <Button type="primary" size="large">
                            Thêm học sinh vào lớp
                        </Button>
                    </FormModalAddStudent> */}
                </div>
            </div>

            {/* Tìm kiếm học sinh */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Danh sách học sinh</h2>
                <Search
                    placeholder="Tìm học sinh theo tên..."
                    allowClear
                    enterButton={<SearchOutlined />}
                    size="large"
                    style={{ width: 400 }}
                />
            </div>

            {/* Bảng học sinh */}
            <Table
                columns={columns}
                dataSource={dataStudents}
                rowKey={'_id'}
                pagination={{ pageSize: 15 }}
                bordered
                scroll={{ x: 800 }}
            />
        </div>
    );
};
export default ClassDetailPage;
