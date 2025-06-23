import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginRequest, LoginResponse, UserRegisterRequest } from './type';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation<LoginResponse, UserRegisterRequest>({
      query: (userData) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
