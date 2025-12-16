import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { registerAuth } from '../../api/auth';
import { registerSchema } from '../../schema/authSchema';
import { useState } from 'react';

const Register = () => {
    const [disable, setDisable] = useState(true);
    const navi = useNavigate();
    interface IFormInput {
        userName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({ resolver: zodResolver(registerSchema) });
    const onSubmit: SubmitHandler<IFormInput> = async (dataFormInput) => {
        try {
            setDisable(true);
            // const { confirmPassword, ...data } = dataFormInput;
            await registerAuth(dataFormInput);
            toast.success('Thêm thành công');
            setDisable(false);
            navi('/auth/login');
        } catch (error: any) {
            setDisable(false);
            toast.error(error.response?.data.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md text-white border border-white/20">
                <h2 className="text-3xl font-bold text-center mb-6">Đăng ký tài khoản</h2>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    {/* UserName */}
                    <div>
                        <label className="block text-sm mb-1 font-medium">Tên người dùng</label>
                        <input
                            {...register('userName')}
                            type="text"
                            placeholder="Nhập tên người dùng"
                            className="w-full p-3 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                        {errors.userName && <p className="text-red-300 text-sm mt-1">{errors.userName.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-1 font-medium">Email</label>
                        <input
                            {...register('email', { required: true })}
                            type="email"
                            placeholder="Nhập email"
                            className="w-full p-3 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                        {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm mb-1 font-medium">Mật khẩu</label>
                        <input
                            {...register('password', { required: true })}
                            type="password"
                            placeholder="Nhập mật khẩu"
                            className="w-full p-3 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                        {errors.password && <p className="text-red-300 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm mb-1 font-medium">Xác nhận mật khẩu</label>
                        <input
                            {...register('confirmPassword', { required: true })}
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            className="w-full p-3 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-300 text-sm mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {/* Agree to terms */}
                    <div className="flex items-start space-x-2 mt-2">
                        <input
                            type="checkbox"
                            id="agreeItems"
                            className="mt-1 w-4 h-4 accent-pink-500 focus:ring-pink-400 cursor-pointer"
                            onChange={(e) => setDisable(!e.target.checked)}
                        />
                        <label htmlFor="agreeItems" className="text-sm text-white/80 cursor-pointer">
                            Tôi đồng ý với{' '}
                            <a href="#" className="text-pink-300 hover:underline">
                                điều khoản sử dụng
                            </a>{' '}
                            và{' '}
                            <a href="#" className="text-pink-300 hover:underline">
                                chính sách bảo mật
                            </a>
                            .
                        </label>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 font-semibold text-white shadow-lg transition duration-300"
                        disabled={disable}
                    >
                        Đăng ký
                    </button>

                    <p className="text-center text-sm mt-4 text-white/70">
                        Đã có tài khoản?
                        <Link to={`/auth/login`} className="text-pink-300 hover:underline">
                            Đăng nhập ngay
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
