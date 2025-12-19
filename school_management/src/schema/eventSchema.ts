import z from 'zod';

export const eventSchema = z
    .object({
        _id: z.string().optional(), // khi create có thể chưa có
        title: z.string().min(1, 'Tên sự kiện không được để trống'),

        class: z.string(),

        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date phải có dạng YYYY-MM-DD'),

        startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Giờ bắt đầu phải có dạng HH:mm'),

        endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Giờ kết thúc phải có dạng HH:mm'),
        completed: z.boolean().optional(),
        teacherId: z.string().min(1, 'Phải chọn giáo viên'),
    })
    .refine((data) => data.startTime < data.endTime, {
        message: 'Giờ kết thúc phải lớn hơn giờ bắt đầu',
        path: ['endTime'],
    });
