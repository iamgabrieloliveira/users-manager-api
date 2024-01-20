import { api } from '@/services/api';

export type SignInRequestData = {
    email: string,
    password: string,
}

export type SignUpRequestData = {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

type SignInResponse = {
    token: string,
    user: {
        id: number,
        username: string,
        first_name: string,
        last_name: string,
        email: string,
    }
}

type SignUpResponse = {
    id: number,
}

type RecoverAuthenticatedUserInfoResponse = {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
}

export async function signIn({ email, password }: SignInRequestData): Promise<SignInResponse> {
    const response = await api.post<SignInResponse>('auth/login', { email, password });
    const { token, user } = response.data;

    return { token, user };
}

export async function signUp({ firstName, lastName, email, username, password }: SignUpRequestData): Promise<SignUpResponse > {
    const response = await api.post<SignUpResponse>('user', {
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password,
    });
    const { id } = response.data;

    return { id };
}

export function signOut() {
    return api.post('auth/logout');
}

export async function recoverAuthenticatedUserInfo(): Promise<RecoverAuthenticatedUserInfoResponse> {
    const response = await api.get<RecoverAuthenticatedUserInfoResponse>('auth/me');
    return response.data;
}
