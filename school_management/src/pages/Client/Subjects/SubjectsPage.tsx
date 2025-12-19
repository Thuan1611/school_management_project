import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteSubject, getSubject } from '../../../api/subject';
import { queryClient } from '../../../api/useQuery';
import { toast } from 'react-toastify';
// import { getTeacher } from '../../../api/teacher';
import { Button, Space, Spin, Table } from 'antd';
import type { ISubject } from '../../../types/ISubject';
import FormModalSubject from './FormModalSubject';
import { UserAddOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { resetQueryFilter, setQueryFilter } from '../../../feature/querySLice';
import Search from 'antd/es/input/Search';
// import type { ITeacher } from '../../../types/ITeacher';

const SubjectsPage = () => {
    const dispatch = useAppDispatch();
    const query = useAppSelector((state) => state.filter.query);
    //List DataSubject + query
    const {
        data: dataSubject,
        isPending,
        error,
    } = useQuery({
        queryKey: ['subject'],
        queryFn: async () => {
            const { data } = await getSubject();

            return data;
        },
    });

    // //List DataClass
    // const { data: dataTeacher } = useQuery({
    //     queryKey: ['teacher'],
    //     queryFn: async () => {
    //         const { data } = await getTeacher(query);
    //         return data;
    //     },
    // });
    //Xóa Teacher
    const mutationDelete = useMutation({
        mutationKey: ['subject'],
        mutationFn: (_id: string) => deleteSubject(_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teacher'] });
            toast.success('Xóa thành công');
        },
    });
    console.log(dataSubject);
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            title: 'Tên môn học',
            dataIndex: 'name',
        },
        // {
        //     title: 'Giáo viên dạy',
        //     dataIndex: 'subjects',
        //     render: (_: any, record: ISubject) =>
        //         record?.teachers?.length > 0 ? (
        //             record?.teachers?.map((teacherId) => {
        //                 const data = dataTeacher?.find((s: ITeacher) => String(s._id) === String(teacherId));
        //                 return <Tag>{data?.name}</Tag>;
        //             })
        //         ) : (
        //             <div>Chưa có</div>
        //         ),
        // },
        {
            title: 'Actions',
            render: (_: any, record: ISubject) => (
                <Space>
                    <Button onClick={() => mutationDelete.mutate(String(record._id))}>Xóa</Button>
                    <FormModalSubject idSubject={String(record._id)}>
                        <Button>Sửa</Button>
                    </FormModalSubject>
                </Space>
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

                    {/* Modal Thêm sản phẩm */}
                    <FormModalSubject>
                        <Button style={{ fontSize: 16 }}>
                            <UserAddOutlined />
                        </Button>
                    </FormModalSubject>
                </div>
            </div>
            <Table
                className="mt-4"
                columns={columns}
                dataSource={dataSubject}
                rowKey={(record: ISubject) => String(record._id)}
            />
        </div>
    );
};

export default SubjectsPage;
