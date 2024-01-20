'use client';

import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';
import { DeleteIcon, EditIcon, EyeIcon } from '@nextui-org/shared-icons';

export type Action = 'details' | 'edit' | 'delete';

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
    isPaginationDisabled: boolean,
}

export default function UsersTable({ users, onChangePage, isPaginationDisabled, lastPage, onAction }: UsersTableProps) {
    return (
        <Table isStriped bottomContent={
            <Pagination
                isDisabled={isPaginationDisabled}
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
            <TableBody emptyContent={'List is empty'}>
                {
                    users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.first_name}</TableCell>
                            <TableCell>{user.last_name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <div className="relative flex items-center gap-2">
                                    <Tooltip content="Details">
                                        <span onClick={() => onAction('details', user.id)}
                                            className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <EyeIcon/>
                                        </span>
                                    </Tooltip>
                                    <Tooltip content="Edit user">
                                        <span onClick={() => onAction('edit', user.id)}
                                            className="text-lg text-default-400 cursor-pointer active:opacity-50">
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
