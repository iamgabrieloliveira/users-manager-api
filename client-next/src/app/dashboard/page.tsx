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

export default function Page() {
    const { user: loggedUser, setUser: setLoggedUser } = useContext(AuthContext);

    const [users, setUsers] = useState<UserData[]>([]);
    const [action, setAction] = useState<Action | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState<PaginationData['pagination']>([]);
    const [search, setSearch] = useState<string>('');

    const debouncedSearch = useDebounce(search, 500);

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

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
    
    useEffect(() => {
        listUsers();
    }, [debouncedSearch]);

    function onChangePage(page: number) {
        listUsers(page);
    }

    function onAction(action: Action, userId: number) {
        if (action === 'delete' && userId === loggedUser.id) {
            toast.error('You cannot delete yourself');
            return;
        }

        setAction(action);
        setSelectedUserId(userId);
    }
    
    function resetAction() {
        setAction(null);
        setSelectedUserId(null);
    }

    function onCloseModal() {
        resetAction();
    }

    function handleDeleteUser() {
        deleteUserRequest(selectedUserId)
            .then(() => {
                toast.success('User deleted successfully');
                resetAction();
            }).catch((err) => {
                handleErrorWithToast(err);
            });
    }

    function handleEditUser({ username, email, lastName, firstName }: UserPayload) {
        updateUserRequest(selectedUserId, {
            username,
            email,
            first_name: firstName,
            last_name: lastName,
        })
            .then(() => {
                toast.success('User updated successfully');

                if (selectedUserId === loggedUser.id) {
                    setLoggedUser(currentUser => ({
                        ...currentUser,
                        username,
                        email,
                        firstName,
                        lastName,
                    }));
                }

                resetAction();
                onChangePage(pagination.current_page);
            }).catch((err) => {
                handleErrorWithToast(err);
            });
    }

    return (
        <Wrapper>
            <Input
                onChange={(event) => setSearch(event.target.value)}
                className="mb-5" placeholder={'search by name'}/>
            <UsersTable
                onAction={onAction}
                lastPage={pagination?.last_page}
                onChangePage={onChangePage}
                users={users}
                isPaginationDisabled={isLoading}
            />
            <DeleteUserModal
                isOpen={action === 'delete'}
                onConfirm={handleDeleteUser}
                onClose={onCloseModal}
            />
            <EditUserModal
                isOpen={action === 'edit'}
                userId={selectedUserId}
                onSave={handleEditUser}
                onClose={onCloseModal}
            />
            <EditUserModal
                isOpen={action === 'details'}
                readonly
                userId={selectedUserId}
                onClose={onCloseModal}
            />
        </Wrapper>
    );
}
