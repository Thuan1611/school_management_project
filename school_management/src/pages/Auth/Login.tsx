import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from '../../schema/authSchema';
import { loginAuth } from '../../api/auth';
import { useState } from 'react';

const Login = () => {
    const [saveData, setSaveData] = useState(false);
    const [disable, setDisable] = useState(false);
    const navi = useNavigate();
    interface IFormInput {
        email: string;
        password: string;
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({ resolver: zodResolver(loginSchema) });

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            setDisable(true);
            const { data: response } = await loginAuth(data);
            if (saveData) {
                localStorage.setItem('user', JSON.stringify(response.user));
                localStorage.setItem('accessToken', JSON.stringify(response.accessToken));
            }
            toast('Đăng nhập thành công');
            navi('/');
            setDisable(false);
        } catch (errors: any) {
            toast.error(errors.response?.data.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md text-white border border-white/20">
                <h2 className="text-3xl font-bold text-center mb-6">Đăng nhập tài khoản</h2>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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

                    {/* Agree to terms */}
                    <div className="flex items-start space-x-2 mt-2">
                        <input
                            type="checkbox"
                            id="agreeItems"
                            className="mt-1 w-4 h-4 accent-pink-500 focus:ring-pink-400 cursor-pointer"
                            onChange={(e) => setSaveData(e.target.checked)}
                        />
                        <label htmlFor="agreeItems" className="text-sm text-white/80 cursor-pointer">
                            Lưu thông tin đăng nhập
                        </label>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 font-semibold text-white shadow-lg transition duration-300"
                        disabled={disable}
                    >
                        Đăng nhập
                    </button>
                    <p className="text-center text-sm mt-4 text-white/70">
                        Chưa có tài khoản?{' '}
                        <Link to={`/auth/register`} className="text-pink-300 hover:underline">
                            Đăng ký ngay
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
