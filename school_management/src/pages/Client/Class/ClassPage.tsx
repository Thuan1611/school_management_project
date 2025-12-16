import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Select, Space, Spin, Table } from 'antd';
import { toast } from 'react-toastify';
import { queryClient } from '../../../api/useQuery';

import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import Search from 'antd/es/input/Search';
import { resetQueryFilter, setQueryFilter } from '../../../feature/querySLice';
import { useDebounce } from '../../../hooks/useDebounce';
import { SEX } from '../../../ultis/constant';

import { deleteClass, getClass } from '../../../api/classes';
import type { IClass } from '../../../types/IClass';
import { getTeacher } from '../../../api/teacher';
import type { ITeacher } from '../../../types/ITeacher';

const ClassPage = () => {
    const key = 'classes';
    const dispatch = useAppDispatch();
    const query = useAppSelector((state) => state.filter.query);
    const queryDebounce = useDebounce(query, 500);

    //List Data + query
    const { data, isPending, error } = useQuery({
        queryKey: [key, queryDebounce],
        queryFn: async () => {
            const { data } = await getClass();
            return data;
        },
        staleTime: 100,
    });
    const { data: dataTeacher } = useQuery({
        queryKey: ['teacher'],
        queryFn: async () => {
            const { data } = await getTeacher();
            return data;
        },
    });
    //Xóa Teacher
    const mutationDelete = useMutation({
        mutationKey: [key],
        mutationFn: (_id: string) => deleteClass(_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key] });
            toast.success('Xóa thành công');
        },
    });

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            title: 'Tên lớp',
            dataIndex: 'name',
        },

        {
            title: 'Sĩ số',
            dataIndex: 'capacity',
        },
        {
            title: 'Khối',
            dataIndex: 'grade',
        },
        {
            title: 'Chủ nhiệm',
            dataIndex: 'supervisor',
            render: (_: any, record: IClass) => {
                const data = dataTeacher?.find((c: ITeacher) => {
                    return String(c._id) === String(record.supervisor);
                });
                return data.name;
            },
        },
        {
            title: 'Actions',
            render: (_: any, record: IClass) => (
                <Space>
                    <Button onClick={() => mutationDelete.mutate(String(record._id))}>Xóa</Button>
                    <Button>Sửa</Button>
                </Space>
            ),
        },
    ];

    if (isPending) return <Spin />;
    if (error) return 'An error has occurred: ' + error;

    return (
        <div>
            <div className="flex items-center justify-between gap-2">
                <h1 className="mb-4 font-bold text-xl">Danh sách Lớp học</h1>

                <div className="flex gap-2 items-center">
                    <Search
                        placeholder="Search ..."
                        onChange={(e) => dispatch(setQueryFilter({ q: e.target.value }))}
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
                        onChange={(e) => dispatch(setQueryFilter({ ...query, _sort: e }))}
                    />
                    <Button>Thêm</Button>
                </div>
            </div>
            <Table columns={columns} dataSource={data} rowKey="_id" />
        </div>
    );
};

export default ClassPage;
