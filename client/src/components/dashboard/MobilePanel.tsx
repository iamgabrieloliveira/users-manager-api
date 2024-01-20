import { Disclosure } from '@headlessui/react';

type DashboardMobilePanelProps = {
    user: {
        username: string,
        email: string,
    }
}

export default function MobilePanel({ user }: DashboardMobilePanelProps) {
    return (
        <Disclosure.Panel className="md:hidden">
            <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                    <div className="ml-3">
                        <div
                            className="text-base font-medium leading-none text-white">{user.username}</div>
                        <div
                            className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                </div>
            </div>
        </Disclosure.Panel>
    );
}
