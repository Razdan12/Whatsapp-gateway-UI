import { Eye, EyeOff, Mail, Lock} from 'lucide-react';
import  { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Login } from '../utils/auth';
import { authApi } from '../midleware/auth.api';
import useAuthStore from '../store/auth.store';
import { listed } from '@/constant/listed';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      const {data} = await authApi.login(formData);
      const token = data.data.token;
      const tokenApi = data.data.user.apiToken
      
      useAuthStore.getState().setAuth({ accessToken: token });
      useAuthStore.getState().setApiToken({tokenApi: tokenApi})
      navigate(listed.dashboard)
    } catch (error) {
      console.log(error);
    }finally {
      setIsLoading(false);
    }
  };

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
              <label
                htmlFor="email"
                className="block text-sm font-medium  mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                   {...register('email')}
                  className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                   {...register('password')}
                  className="w-full pl-10 pr-12 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
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
