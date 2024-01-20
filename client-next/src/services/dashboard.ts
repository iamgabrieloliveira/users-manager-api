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

type UpdateUserRequesyPayload = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

type ListUserResponse = PaginationData & {
    users: UserData;
}

export async function listUsers(page: number = 1, search?: string): Promise<ListUserResponse> {
    const params = { page };

    if (search) {
        params.q = search;
    }

    const response = await api.get<ListUserResponse>('/user', { params });
    return response.data;
}

export function deleteUser(userId: number) {
    return api.delete(`user/${userId}`);
}

export function updateUser(userId: number, payload: UpdateUserRequesyPayload) {
    return api.put(`user/${userId}`, payload);
}
