import { api } from '@/services/api';

export type PaginationData = {
    pagination: {
        total: number;
        last_page: number;
        current_page: number,
        next_page_url: string | null,
    }
}

export type UserData = {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
}

type UpdateUserRequestPayload = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

type ListUserResponse = PaginationData & {
    users: UserData[];
}

type ListUserParams = {
    page: number,
    q?: string,
}

export async function listUsers(page: number = 1, search?: string): Promise<ListUserResponse> {
    const params: ListUserParams = { page };

    if (search) {
        params.q = search;
    }

    const response = await api.get<ListUserResponse>('/user', { params });
    return response.data;
}

export function deleteUser(userId: number) {
    return api.delete(`user/${userId}`);
}

export function updateUser(userId: number, payload: UpdateUserRequestPayload) {
    return api.put(`user/${userId}`, payload);
}

type UserInfo = {
    email: string,
    username: string;
    first_name: string;
    last_name: string;
}

export async function loadUserInfo(userId: number): Promise<UserInfo> {
    const { data } = await api.get<{ user: UserInfo }>(`user/${userId}`);
    return data.user;
}
