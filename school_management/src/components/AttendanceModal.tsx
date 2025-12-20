// 'use client';

// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { Modal, Button, Checkbox, Tag, message } from 'antd';
// import { useState } from 'react';
// import { getStudentsByClass } from '../api/student';
// import { updateEvent } from '../api/event';
// import type { IEvent } from '../types/IEvent';

// interface Props {
//     open: boolean;
//     onClose: () => void;
//     eventId: string;
//     classId: string;
//     currentAttendance?: Record<string, boolean>;
//     completed?: boolean;
// }

// export default function AttendanceModal({
//     open,
//     onClose,
//     eventId,
//     classId,
//     currentAttendance = {},
//     completed = false,
// }: Props) {
//     const queryClient = useQueryClient();
//     const [attendance, setAttendance] = useState<Record<string, boolean>>(currentAttendance);

//     const { data: students = [], isLoading } = useQuery({
//         queryKey: ['students', classId],
//         queryFn: () => getStudentsByClass(classId),
//         enabled: open,
//     });

//     // const mutation = useMutation({
//     //     mutationFn: (data: Partial<IEvent>) => updateEvent(eventId, data),
//     //     onSuccess: () => {
//     //         queryClient.invalidateQueries({ queryKey: ['event'] });
//     //         message.success('Lưu điểm danh thành công!');
//     //         onClose();
//     //     },
//     // });

//     const handleSave = () => {
//         mutation.mutate({ attendance });
//     };

//     const handleComplete = () => {
//         mutation.mutate({ attendance, completed: true });
//     };

//     const presentCount = Object.values(attendance).filter((v) => v).length;
//     const totalCount = students.length;

//     return (
//         <Modal title="Điểm danh buổi học" open={open} onCancel={onClose} footer={null} width={700}>
//             <div className="mb-4">
//                 <Tag color="blue">Tổng học sinh: {totalCount}</Tag>
//                 <Tag color="green">Có mặt: {presentCount}</Tag>
//                 <Tag color="red">Vắng: {totalCount - presentCount}</Tag>
//                 {completed && <Tag color="gold">Buổi học đã hoàn thành</Tag>}
//             </div>

//             {isLoading ? (
//                 <div className="text-center py-8">Đang tải danh sách học sinh...</div>
//             ) : (
//                 <div className="max-h-96 overflow-y-auto space-y-2">
//                     {students.map((student: any) => (
//                         <div key={student._id} className="flex items-center justify-between py-2 border-b">
//                             <span className="font-medium">{student.name}</span>
//                             <Checkbox
//                                 checked={attendance[student._id] ?? true} // mặc định có mặt
//                                 onChange={(e) => setAttendance({ ...attendance, [student._id]: e.target.checked })}
//                             >
//                                 Có mặt
//                             </Checkbox>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             <div className="flex justify-end gap-3 mt-6">
//                 <Button onClick={onClose}>Hủy</Button>
//                 <Button type="primary" onClick={handleSave} loading={mutation.isPending}>
//                     Lưu điểm danh
//                 </Button>
//                 {!completed && (
//                     <Button danger onClick={handleComplete} loading={mutation.isPending}>
//                         Hoàn thành buổi học
//                     </Button>
//                 )}
//             </div>
//         </Modal>
//     );
// }
