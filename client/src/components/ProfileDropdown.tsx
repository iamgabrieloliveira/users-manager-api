'use client';

import { Menu, Transition } from '@headlessui/react';
import { Fragment, useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

type ProfileDropdownProps = {
    user: {
        username: string,
    }
}

export default function ProfileDropdown({ user }: ProfileDropdownProps) {
    const { signOut } = useContext(AuthContext);

    return (
        <Menu as="div" className="relative ml-3">
            <div>
                <Menu.Button
                    className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5"/>
                    <span className="sr-only">Open user menu</span>
                    <span
                        className="text-white text-xl font-bold">Hello, {user.username}</span>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        <span onClick={() => signOut()} className="cursor-pointer block px-4 py-2 text-sm text-gray-700">
                            Logout
                        </span>
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
