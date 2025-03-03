import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Login, loginResponse } from '../utils/auth';
import { authApi } from '../midleware/auth.api';
import useAuthStore from '../store/auth.store';
import { listedUser } from '../constant/listed';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus,
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
    try {
      const {data} = await authApi.login(formData);
      const token = data.data.token;
      const tokenApi = data.data.user.apiToken
      
      useAuthStore.getState().setAuth({ accessToken: token });
      useAuthStore.getState().setApiToken({tokenApi: tokenApi})
      navigate(listedUser.whatsapp)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-1/3 shadow-md p-5 rounded-md flex flex-col gap-3">
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">username</label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full text-black"
            {...register('email')}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">password</label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full text-black "
            {...register('password')}
          />
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
      </div>
    </div>
  );
};

export default SignIn;
