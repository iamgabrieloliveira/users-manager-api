'use client';

import Wrapper from '@/components/dashboard/Wrapper';
import UsersTable, { Action } from '@/components/UsersTable';
import { useContext, useEffect, useState } from 'react';
import {
    deleteUser as deleteUserRequest,
    listUsers as listUsersRequest,
    updateUser as updateUserRequest,
    PaginationData,
    UserData
} from '@/services/dashboard';
import { handleErrorWithToast } from '@/services/api';
import toast from 'react-hot-toast';
import DeleteUserModal from '@/components/modals/DeleteUserModal';
import EditUserModal, { UserPayload } from '@/components/modals/EditUserModal';
import { AuthContext } from '@/contexts/AuthContext';
import { Input } from '@nextui-org/react';
import useDebounce from '@/hooks/useDebounce';
import { SearchIcon } from '@nextui-org/shared-icons';

const initialPaginationState = {
    current_page: 1,
    last_page: 1,
    next_page_url: null,
    total: 0,
};

export default function Page() {
    const { user, setUser: setLoggedUser } = useContext(AuthContext);
    const loggedUser = user!;

    const [users, setUsers] = useState<UserData[]>([]);
    const [action, setAction] = useState<Action | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState<PaginationData['pagination']>(initialPaginationState);
    const [search, setSearch] = useState<string>('');

    const debouncedSearch = useDebounce(search, 500);

    const [selectedUserId, setSelectedUserId] = useState<number | undefined>(undefined);

    function listUsers(page: number = 1) {
        setIsLoading(true);
        listUsersRequest(page, search)
            .then(({ users, pagination }) => {
                setUsers(users);
                setPagination(pagination);
            }).finally(() => {
                setIsLoading(false);
            });
    }
    
    useEffect(
        () => listUsers(),
        [debouncedSearch]
    );

    function onAction(action: Action, userId: number) {
        if (action === 'delete' && userId === loggedUser.id) {
            toast.error('You cannot delete yourself');
            return;
        }

        setAction(action);
        setSelectedUserId(userId);
    }
    
    function clearActionState() {
        setAction(null);
        setSelectedUserId(undefined);
    }

    function handleDeleteUser() {
        if (!selectedUserId) return;

        deleteUserRequest(selectedUserId)
            .then(() => {
                toast.success('User deleted successfully');
                clearActionState();
            }).catch((err) => {
                handleErrorWithToast(err);
            });
    }

    function handleEditUser({ username, email, lastName, firstName }: UserPayload) {
        if (!selectedUserId) return;

        const payload = {
            username,
            email,
            first_name: firstName,
            last_name: lastName,
        };

        updateUserRequest(selectedUserId, payload)
            .then(() => {
                toast.success('User updated successfully');

                if (selectedUserId === loggedUser.id) {
                    setLoggedUser({
                        id: loggedUser.id,
                        username,
                        email,
                        firstName,
                        lastName,
                    });
                }

                clearActionState();
                listUsers(pagination.current_page);
            }).catch((err) => {
                handleErrorWithToast(err);
            });
    }

    return (
        <Wrapper>
            <Input
                startContent={<SearchIcon className="text-default-300" />}
                onChange={(event) => setSearch(event.target.value)}
                className="mb-5" placeholder={'Search by name...'}
            />
            <UsersTable
                onAction={onAction}
                lastPage={pagination?.last_page}
                onChangePage={(page) => listUsers(page)}
                users={users}
                isPaginationDisabled={isLoading}
            />
            <DeleteUserModal
                isOpen={action === 'delete'}
                onConfirm={handleDeleteUser}
                onClose={clearActionState}
            />
            <EditUserModal
                isOpen={action === 'edit'}
                userId={selectedUserId}
                onSave={handleEditUser}
                onClose={clearActionState}
            />
            <EditUserModal
                isOpen={action === 'details'}
                readonly
                userId={selectedUserId}
                onClose={clearActionState}
            />
        </Wrapper>
    );
}
