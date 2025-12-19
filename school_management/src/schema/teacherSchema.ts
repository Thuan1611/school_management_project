import z from 'zod';

// Schema cho tạo mới giáo viên (có password bắt buộc)
export const createTeacherSchema = z.object({
    name: z.string().min(3, 'Tên phải có ít nhất 3 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    sex: z.enum(['female', 'male'] as const),
    phone: z
        .string()
        .regex(/^0[0-9]{9}$/, 'Số điện thoại phải có 10 số và bắt đầu bằng 0')

        .or(z.literal('')),
    address: z.string(),
    photo: z.string().url('Link ảnh không hợp lệ').or(z.literal('')),
    subjects: z.array(z.string()).default([]),
    classes: z.array(z.string()).default([]),
});

// Schema cho cập nhật giáo viên (password không bắt buộc)
export const updateTeacherSchema = z.object({
    name: z.string().min(3, 'Tên phải có ít nhất 3 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').optional(),
    sex: z.enum(['female', 'male'] as const),
    phone: z
        .string()
        .regex(/^0[0-9]{9}$/, 'Số điện thoại phải có 10 số và bắt đầu bằng 0')

        .or(z.literal('')),
    address: z.string(),
    photo: z.string().url('Link ảnh không hợp lệ').or(z.literal('')),
    subjects: z.array(z.string()).default([]),
    classes: z.array(z.string()).default([]),
});

// Type cho tạo mới
export type CreateTeacherInput = z.infer<typeof createTeacherSchema>;

// Type cho cập nhật
export type UpdateTeacherInput = z.infer<typeof updateTeacherSchema>;
