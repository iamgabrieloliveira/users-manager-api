'use client';

import Wrapper from '@/components/dashboard/Wrapper';
import UsersTable, { Action } from '@/components/UsersTable';
import React, { useContext, useEffect, useState } from 'react';
import {
    deleteUser as deleteUserRequest,
    listUsers as listUsersRequest,
    updateUser as updateUserRequest,
    PaginationData,
    UserData
} from '@/services/dashboard';
import { handleErrorWithToast } from '@/services/api';
import { useQueryState } from 'nuqs';
import toast from 'react-hot-toast';
import DeleteUserModal from '@/components/modals/DeleteUserModal';
import EditUserModal, { UserPayload } from '@/components/modals/EditUserModal';
import { AuthContext } from '@/contexts/AuthContext';
import { SearchIcon } from '@nextui-org/shared-icons';
import DebouncedInput from '@/components/form/DebouncedInput';
import ImpersonateConfirmationModal from '@/components/modals/ImpersonateConfirmationModal';
import useJwt from '@/services/jwt';
import { impersonate } from '@/services/auth';

const initialPaginationState = {
    current_page: 1,
    last_page: 1,
    next_page_url: null,
    total: 0,
};

export default function Page() {
    const { setJwt } = useJwt();
    const { user, setUser: setLoggedUser } = useContext(AuthContext);
    const loggedUser = user!;

    const [users, setUsers] = useState<UserData[]>([]);
    const [action, setAction] = useState<Action | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState<PaginationData['pagination']>(initialPaginationState);

    const [queryString, setQueryString] = useQueryState('q');

    const [selectedUserId, setSelectedUserId] = useState<number | undefined>(undefined);

    function listUsers(page: number = 1) {
        setIsLoading(true);
        listUsersRequest(page, queryString)
            .then(({ users, pagination }) => {
                setUsers(users);
                setPagination(pagination);
            }).finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => listUsers(), []);

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
    
    function handleImpersonate() {
        if (!selectedUserId) return;

        if (selectedUserId === loggedUser.id) {
            toast.error('You already are logged as this user');
            return;
        }

        impersonate(selectedUserId)
            .then((token) => {
                setJwt(token, '1 hour');
                window.location.reload();

                toast.success(`Now you\'re logged as ${loggedUser.username}`);
            }).catch((err) => {
                handleErrorWithToast(err);
            });
    }

    function handleDeleteUser() {
        if (!selectedUserId) return;

        deleteUserRequest(selectedUserId)
            .then(() => {
                toast.success('User deleted successfully');
                clearActionState();
                listUsers(pagination.current_page);
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
            <DebouncedInput
                className="mb-5"
                initialValue={queryString}
                placeholder="Search by username, first name or last name"
                delay={500}
                icon={<SearchIcon/>}
                onStopTyping={() => listUsers()}
                onChange={(content) => setQueryString(content)}
            />
            <UsersTable
                onAction={onAction}
                lastPage={pagination?.last_page}
                onChangePage={(page) => listUsers(page)}
                users={users}
                isLoading={isLoading}
            />
            <DeleteUserModal
                isOpen={action === 'delete'}
                onConfirm={handleDeleteUser}
                onClose={clearActionState}
            />
            {
                action === 'edit' &&
                <EditUserModal
                    isOpen
                    readonly={false}
                    userId={selectedUserId}
                    onSave={handleEditUser}
                    onClose={clearActionState}
                />
            }
            {
                action === 'details' &&
                <EditUserModal
                    isOpen
                    readonly={true}
                    onSave={undefined}
                    userId={selectedUserId}
                    onClose={clearActionState}
                />
            }
            <ImpersonateConfirmationModal
                isOpen={action === 'impersonate'}
                onClose={clearActionState}
                onConfirm={handleImpersonate}
            />
        </Wrapper>
    );
}
