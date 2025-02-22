export type Theme = 'light' | 'dark';

export interface ApiError {
    data: {
        message: string;
    };
    status: number;
    message: string;
}

export interface SignupResponse {
    token: string;
    data: {
        email: string;
        name: string;
        token: string;
    };
    message: string;
}

export interface LoginResponse {
    token: string;
    data: {
        email: string;
        name: string;
        token: string;
    };
    message: string;
}

export type GetUserResponse = {
    data: {
        email: string;
        name: string;
    };
    message: string;
}

export type TExecutionResponse = { output: string, executionTime: string, memoryUsage: string, message: string }

export type ExecutionType = "submission" |  "execution";

export type GetSubmissionsResponse = {
    id: string;
    code: string;
    language: string;
    createdAt: string;
    status: string;
    updatedAt: string;
    message: string;
}[];