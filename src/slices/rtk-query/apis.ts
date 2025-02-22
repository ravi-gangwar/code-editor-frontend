import { token } from '@/constants/constants';
import getBackendURI from '@/lib/getBackendURI';
import { getItem } from '@/lib/localStorage';
import { LoginResponse, SignupResponse, TExecutionResponse, GetUserResponse, ExecutionType, GetSubmissionsResponse } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'apis',
    baseQuery: fetchBaseQuery({ 
    baseUrl: getBackendURI("production"),
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("authorization", `Bearer ${getItem(token)}` || "");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: ({ email, password }) => ({
                url: "auth/login",
                method: 'POST',
                body: { email, password },
            }),
        }),
        signup: builder.mutation<SignupResponse, { email: string, password: string, name: string }>({
            query: ({ email, password, name }) => ({
            url: "auth/signup",
            method: 'POST',
            body: { email, password, name },
        }),
        }),
        resetPassword: builder.mutation<string, { email: string }>({
            query: ({ email }) => ({
            url: "auth/resetpassword",
            method: 'POST',
            body: { email },
        }),
        }),
        codeExecute: builder.mutation<TExecutionResponse, { code: string, language: string, type: ExecutionType }>({
            query: ({ code, language, type }) => ({
            url: "code/execute",
            method: 'POST',
            body: { code, language, type },
        }),
        }),
        getUser: builder.query<GetUserResponse, void>({
            query: () => ({
                url: "auth/user",
            }),
        }),
        getSubmissions: builder.query<GetSubmissionsResponse, void>({
            query: () => ({
                url: "code/submissions",
            }),
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSubmissionsQuery, useLoginMutation, useCodeExecuteMutation, useSignupMutation, useResetPasswordMutation, useGetUserQuery } = api