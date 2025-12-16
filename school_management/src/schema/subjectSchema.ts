import z from 'zod';

export const subjectSchema = z.object({
    name: z.string().min(1, 'Tên không chính xác'),
    teachers: z.array(z.string()),
});
