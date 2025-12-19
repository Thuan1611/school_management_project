export interface IEvent {
    _id?: string;
    title: string;
    class: string;
    date: string; // ISO string
    startTime: string; // "10:00"
    endTime: string; // "11:00"
    teacherId: string; // Thêm để filter lịch teacher
    completed?: boolean;
    attendance?: Record<string, boolean>; // { studentId: true/false (có mặt) }
}
