import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Login } from '../utils/auth';

import useAuthStore from '../store/auth.store';
import { listed } from '@/constant/listed';
import Input from '@/components/ui/InputField';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

 const { login, user, isLoading } = useAuthStore();
  // const handleSubmit = async (e: React.FormEvent) => {};

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().required(),
        password: yup.string().required(),
      })
    ),
  });

  const onSubmit = async (formData: Login) => {
    await login(formData);
  };

  useEffect(() => {
    if (user) {
      navigate(listed.dashboard);
    }
  }, [user, navigate]);
  
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      data-theme="dark"
    >
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="bg-gradient-to-r text-2xl font-bold from-green-500 via-green-600 to-emerald-600 bg-clip-text text-transparent">
            Welcome Back
          </span>
          <p className="text-white">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <div className="bg-base-200 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
            <label htmlFor="">Email</label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email')}
                error={errors.email?.message}
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="">Password</label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  error={errors.password?.message}
                  placeholder="Enter password"
                  required
                />
                 <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 "
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
           
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm ">Remember me</span>
              </label>
              <Link
                to="#"
                className="text-sm text-green-600 hover:text-green-500"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="">
              {"Don't have an account? "}
              <Link
                to="/register"
                className="text-green-600 hover:text-green-500 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
