export interface ILesson {
    // buổi học
    id: string;
    classId: string;
    subject: string;
    teacherId: string;
    date: string; // ISO date
    startTime: string; // "08:00"
    endTime: string; // "09:30"
    completed: boolean; // đã dạy xong chưa
    // attendance?: Record<string, boolean>; // { studentId: present }
}
