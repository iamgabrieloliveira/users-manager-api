'use client';

import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';
import { DeleteIcon, AvatarIcon, EditIcon, EyeIcon } from '@nextui-org/shared-icons';
import { Spinner } from '@nextui-org/spinner';

export type Action = 'details' | 'edit' | 'delete' | 'impersonate';

type User = {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
}

type UsersTableProps = {
    users: User[];
    lastPage: number;
    onAction: (action: Action, userId: number) => void,
    onChangePage: (page: number) => void;
    isLoading: boolean,
}

export default function UsersTable({ users, onChangePage, isLoading, lastPage, onAction }: UsersTableProps) {
    return (
        <Table isStriped bottomContent={
            <Pagination
                isDisabled={isLoading}
                onChange={onChangePage}
                total={lastPage}
            />
        } aria-label="Users List">
            <TableHeader>
                <TableColumn>Username</TableColumn>
                <TableColumn>First Name</TableColumn>
                <TableColumn>Last Name</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn align="center"/>
            </TableHeader>
            {/* todo(iamgabrieloliveira): refactor to use isLoading and loadingContext props, I got some using this */}
            <TableBody emptyContent={ isLoading ? <Spinner label="Loading..."/> : 'List is empty'}>
                {
                    users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.first_name}</TableCell>
                            <TableCell>{user.last_name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <div className="relative flex items-center gap-2">
                                    <Tooltip content="Impersonate">
                                        <span onClick={() => onAction('impersonate', user.id)}
                                            className="text-lg text-zinc-500 cursor-pointer active:opacity-50">
                                            <AvatarIcon/>
                                        </span>
                                    </Tooltip>
                                    <Tooltip content="Details">
                                        <span onClick={() => onAction('details', user.id)}
                                            className="text-lg text-blue-600 cursor-pointer active:opacity-50">
                                            <EyeIcon/>
                                        </span>
                                    </Tooltip>
                                    <Tooltip content="Edit user">
                                        <span onClick={() => onAction('edit', user.id)}
                                            className="text-lg text-zinc-600 cursor-pointer active:opacity-50">
                                            <EditIcon/>
                                        </span>
                                    </Tooltip>
                                    <Tooltip color="danger" content="Delete user">
                                        <span onClick={() => onAction('delete', user.id)}
                                            className="text-lg text-danger cursor-pointer active:opacity-50">
                                            <DeleteIcon/>
                                        </span>
                                    </Tooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}
