import z from "zod";

export const lessonSchema = z.object({
    classId: z.string().min(1, 'Chọn lớp học'),
    subject: z.string().min(1, 'Nhập môn học'),
    teacherId: z.string().min(1, 'Chọn giáo viên dạy'),
    date: z.string().min(1, 'Chọn ngày'),
    startTime: z.string().min(1, 'Chọn giờ bắt đầu'),
    endTime: z.string().min(1, 'Chọn giờ kết thúc'),
});
