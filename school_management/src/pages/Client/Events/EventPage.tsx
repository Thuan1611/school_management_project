import { useMutation, useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { useDebounce } from '../../../hooks/useDebounce';
import { deleteEvent, getEvent } from '../../../api/event';
import { getClass } from '../../../api/classes';
import { queryClient } from '../../../api/useQuery';
import { toast } from 'react-toastify';
import type { IEvent } from '../../../types/IEvent';
import { Button, Select, Space, Spin, Table, Tabs, Tag } from 'antd';
import type { IClass } from '../../../types/IClass';
import Search from 'antd/es/input/Search';
import { resetQueryFilter, setQueryFilter } from '../../../feature/querySLice';
import dayjs from 'dayjs';
import FormModalEvent from './FormModalEvent';
import { UserAddOutlined } from '@ant-design/icons';
import BigCalendar from '../../../components/BigCalendar';

const EventPage = () => {
    const dispatch = useAppDispatch();
    const query = useAppSelector((state) => state.filter.query);
    const queryDebounce = useDebounce(query, 500);
    //List DataTeacher + query
    const {
        data: dataEvents,
        isPending,
        error,
    } = useQuery({
        queryKey: ['event', queryDebounce],
        queryFn: async () => {
            const { data } = await getEvent(query);
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
    const classMap = new Map(dataClass?.map((c: any) => [String(c._id), c.name]));
    //Xóa Events
    const mutationDelete = useMutation({
        mutationKey: ['event'],
        mutationFn: (_id: string) => deleteEvent(_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['event', query] });
            toast.success('Xóa thành công');
        },
    });

    const columns = [
        // {
        //     title: 'ID',
        //     dataIndex: '_id',
        // },
        {
            title: 'Sự kiện',
            dataIndex: 'title',
        },

        {
            title: 'Thời gian',
            dataIndex: 'date',
            render: (_: any, record: IEvent) => <Tag>{dayjs(record.date).format('DD-MM-YYYY')}</Tag>,
        },
        {
            title: 'Giờ bắt đầu',
            dataIndex: 'startTime',
        },
        {
            title: 'Giờ kết thúc',
            dataIndex: 'endTime',
        },
        {
            title: 'Lớp',
            dataIndex: 'class',
            render: (_: any, record: IEvent) => {
                const data = dataClass?.find((item: IClass) => String(item._id) === String(record.class));
                return <Tag>{data?.name}</Tag>;
            },
        },

        {
            title: 'Actions',
            render: (_: any, record: IEvent) => (
                <Space>
                    <Button onClick={() => mutationDelete.mutate(String(record._id))}>Xóa</Button>
                    <FormModalEvent idEvent={String(record._id)}>
                        <Button>Sửa</Button>
                    </FormModalEvent>
                </Space>
            ),
        },
    ];

    if (isPending) return <Spin />;
    if (error) return 'An error has occurred: ' + error;

    const items = [
        {
            key: '1',
            label: 'Danh sách',
            children: (
                <Table
                    className="mt-4"
                    columns={columns}
                    dataSource={dataEvents}
                    rowKey={(record: IEvent) => String(record._id)}
                />
            ),
        },
        {
            key: '2',
            label: 'Lịch',
            children: isPending ? <Spin /> : <BigCalendar classMap={classMap} events={dataEvents} />,
        },
    ];
    return (
        <div>
            <div className="flex items-center justify-between gap-2">
                <h1 className="mb-4 font-bold text-xl">Danh sách Sự Kiện</h1>

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
                        allowClear
                        style={{ width: 120 }}
                        options={dataClass?.map((item: IClass) => ({
                            label: item.name,
                            value: item._id,
                        }))}
                        placement="bottomLeft"
                        onChange={(e) => dispatch(setQueryFilter({ ...query, class: e }))}
                    />
                    {/* Modal Thêm sản phẩm */}
                    <FormModalEvent>
                        <Button style={{ fontSize: 16 }}>
                            <UserAddOutlined />
                        </Button>
                    </FormModalEvent>
                </div>
            </div>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
};

export default EventPage;
