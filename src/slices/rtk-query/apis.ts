import { token, API_ENDPOINTS, HTTP_HEADERS } from '@/constants/constants';
import { getItem } from '@/lib/localStorage';
import { LoginResponse, SignupResponse, TExecutionResponse, CodeRunResponse, GetUserResponse, ExecutionType, GetSubmissionsResponse } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'apis',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URI,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", HTTP_HEADERS.CONTENT_TYPE);
      headers.set("authorization", `${HTTP_HEADERS.AUTHORIZATION_PREFIX} ${getItem(token)}` || "");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: 'POST',
        body: { email, password },
      }),
    }),
    signup: builder.mutation<SignupResponse, { email: string, password: string, name: string }>({
      query: ({ email, password, name }) => ({
        url: API_ENDPOINTS.AUTH.SIGNUP,
        method: 'POST',
        body: { email, password, name },
      }),
    }),
    resetPassword: builder.mutation<string, { email: string }>({
      query: ({ email }) => ({
        url: API_ENDPOINTS.AUTH.RESET_PASSWORD,
        method: 'POST',
        body: { email },
      }),
    }),
    codeExecute: builder.mutation<TExecutionResponse, { code: string, language: string, type: ExecutionType }>({
      query: ({ code, language, type }) => ({
        url: API_ENDPOINTS.CODE.EXECUTE,
        method: 'POST',
        body: { code, language, type },
      }),
    }),
    codeRun: builder.mutation<CodeRunResponse, { code: string, lang: string }>({
      query: ({ code, lang }) => ({
        url: API_ENDPOINTS.CODE.RUN,
        method: 'POST',
        body: { code, lang },
      }),
    }),
    getUser: builder.query<GetUserResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.AUTH.USER,
      }),
    }),
    getSubmissions: builder.query<GetSubmissionsResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.CODE.SUBMISSIONS,
      }),
    }),
  }),
});

export const { 
  useGetSubmissionsQuery, 
  useLoginMutation, 
  useCodeExecuteMutation,
  useCodeRunMutation,
  useSignupMutation, 
  useResetPasswordMutation, 
  useGetUserQuery 
} = api;