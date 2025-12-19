import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Select, Space, Spin, Table, Tag } from 'antd';
import { toast } from 'react-toastify';
import { queryClient } from '../../../api/useQuery';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import Search from 'antd/es/input/Search';
import { resetQueryFilter, setQueryFilter } from '../../../feature/querySLice';
import { useDebounce } from '../../../hooks/useDebounce';
import { SEX } from '../../../ultis/constant';
import { deleteTeacher, getTeacher } from '../../../api/teacher';
import type { ITeacher } from '../../../types/ITeacher';
import type { ISubject } from '../../../types/ISubject';
import { getSubject } from '../../../api/subject';
import { getClass } from '../../../api/classes';
import type { IClass } from '../../../types/IClass';
import { UserAddOutlined } from '@ant-design/icons';
import FormModalTeacher from './FormModalTeacher';
import { getTeacherAtRedux } from '../../../feature/teacherSlice';

const TeacherPage = () => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const dispatch = useAppDispatch();
    const query = useAppSelector((state) => state.filter.query);
    const queryDebounce = useDebounce(query, 500);
    //List DataTeacher + query
    const {
        data: dataTeacher,
        isPending,
        error,
    } = useQuery({
        queryKey: ['teacher', queryDebounce],
        queryFn: async () => {
            const { data } = await getTeacher(queryDebounce);
            dispatch(
                getTeacherAtRedux({
                    getAllTeacher: data,
                    total: data.length,
                }),
            );
            return data;
        },
    });

    //List DataSubject

    const { data: dataSubject } = useQuery({
        queryKey: ['subject'],
        queryFn: async () => {
            const { data } = await getSubject();
            return data;
        },
    });

    //List DataClass
    const { data: dataClass } = useQuery({
        queryKey: ['class'],
        queryFn: async () => {
            const { data } = await getClass();
            return data;
        },
    });
    //Xóa Teacher
    const mutationDelete = useMutation({
        mutationKey: ['teacher'],
        mutationFn: (_id: string) => deleteTeacher(_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teacher', query] });
            toast.success('Xóa thành công');
        },
    });

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            title: 'Họ Và Tên',
            dataIndex: 'name',
        },

        {
            title: 'Địa chỉ',
            dataIndex: 'address',
        },
        {
            title: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Giới tính',
            dataIndex: 'sex',
            render: (_: any, record: ITeacher) => (record.sex == 'male' ? 'Nam' : 'Nữ'),
        },
        {
            title: 'Môn',
            dataIndex: 'subjects',
            render: (_: any, record: ITeacher) =>
                record?.subjects?.length > 0 ? (
                    record?.subjects?.map((subjectId) => {
                        const data = dataSubject?.find((s: ISubject) => s._id === subjectId);
                        console.log(dataSubject);
                        return <Tag>{data?.name}</Tag>;
                    })
                ) : (
                    <div>Chưa có</div>
                ),
        },
        {
            title: 'Lớp đang phụ trách',
            dataIndex: 'classes',
            render: (_: any, record: ITeacher) =>
                record?.classes?.length > 0 ? (
                    record?.classes?.map((classId) => {
                        const data = dataClass?.find((c: IClass) => c._id === classId);
                        return <Tag>{data?.name}</Tag>;
                    })
                ) : (
                    <div>Chưa có</div>
                ),
        },
        {
            title: 'Actions',
            render: (_: any, record: ITeacher) =>
                user.role === 'admin' ? (
                    <Space>
                        <Button onClick={() => mutationDelete.mutate(String(record._id))}>Xóa</Button>
                        <FormModalTeacher idTeacher={String(record._id)}>
                            <Button>Sửa</Button>
                        </FormModalTeacher>
                    </Space>
                ) : (
                    <Tag>Teacher không có quyền</Tag>
                ),
        },
    ];

    if (isPending) return <Spin />;
    if (error) return 'An error has occurred: ' + error;

    return (
        <div>
            <div className="flex items-center justify-between gap-2">
                <h1 className="mb-4 font-bold text-xl">Danh sách Giáo viên</h1>

                <div className="flex gap-2 items-center">
                    <Search
                        placeholder="Search ..."
                        onChange={(e) => dispatch(setQueryFilter({ ...query, q: e.target.value }))}
                        enterButton
                    />
                    <Button color="blue" onClick={() => dispatch(resetQueryFilter())}>
                        Reset
                    </Button>
                    <Select
                        defaultValue="Nữ"
                        style={{ width: 120 }}
                        options={[
                            { value: SEX.FEMALE.data, label: SEX.FEMALE.label },
                            { value: SEX.MALE.data, label: SEX.MALE.label },
                        ]}
                        onChange={(e) => dispatch(setQueryFilter({ ...query, sex: e }))}
                    />
                    {/* Modal Thêm sản phẩm */}
                    {user.role === 'admin' && (
                        <FormModalTeacher>
                            <Button style={{ fontSize: 16 }}>
                                <UserAddOutlined />
                            </Button>
                        </FormModalTeacher>
                    )}
                </div>
            </div>
            <Table
                className="mt-4"
                columns={columns}
                dataSource={dataTeacher}
                rowKey={(record: ITeacher) => String(record._id)}
            />
        </div>
    );
};

export default TeacherPage;
