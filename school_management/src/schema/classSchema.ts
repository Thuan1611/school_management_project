import z from 'zod';

export const classSchema = z.object({
    name: z.string().min(1, 'Tên lớp không chính xác'),
    capacity: z.number().optional(),
    grade: z.number().min(2, 'Khối 10-12'),
    studentIds: z.array(z.string()),
    supervisor: z.string(),
});
