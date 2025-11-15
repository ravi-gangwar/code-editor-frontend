import { token, API_ENDPOINTS, HTTP_HEADERS } from '@/constants/constants';
import { getItem } from '@/lib/localStorage';
import { LoginResponse, SignupResponse, CodeRunResponse, GetUserResponse } from '@/types';
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
    wakeUpCodeExecute: builder.query<{ status: string; pid?: number }, void>({
      queryFn: async () => {
        try {
          const response = await fetch('https://code-execute-7t0f.onrender.com/health', {
            method: 'GET',
          });
          const data = await response.json();
          return { data };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: String(error) } };
        }
      },
    }),
    wakeUpBackend: builder.query<string, void>({
      queryFn: async () => {
        try {
          const response = await fetch('https://code-editor-backend-0pia.onrender.com', {
            method: 'GET',
          });
          const data = await response.text();
          return { data };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: String(error) } };
        }
      },
    }),
  }),
});

export const { 
  useLoginMutation, 
  useCodeRunMutation,
  useSignupMutation, 
  useResetPasswordMutation, 
  useGetUserQuery,
  useWakeUpCodeExecuteQuery,
  useWakeUpBackendQuery,
} = api;