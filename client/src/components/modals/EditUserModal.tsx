import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';

export type UserPayload = {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
}

type EditUserModalProps = {
    isOpen: boolean;
    readonly?: boolean;
    onClose: () => void;
    userId?: number,
    onSave?: (data: UserPayload) => void;
}

const formInitialState = {
    email: '',
    firstName: '',
    lastName: '',
    username: '',
};

export default function EditUserModal({ isOpen, userId, onClose, onSave, readonly }: EditUserModalProps) {
    const [form, setForm] = useState<UserPayload>(formInitialState);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!userId) return;

        setForm(formInitialState);

        (async () => {
            setIsLoading(true);
            const { data: { user } } = await api.get(`user/${userId}`);

            setForm({
                email: user.email,
                username: user.username,
                firstName: user.first_name,
                lastName: user.last_name,
            });
            setIsLoading(false);
        })();

    }, [userId]);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{
                                isLoading
                                    ? 'Loading...'
                                    : readonly
                                        ? `User: ${form.username}`
                                        : `Editing: ${form.username}`
                            }</ModalHeader>
                            <ModalBody>
                                <Input
                                    readOnly={readonly}
                                    onChange={(event) => {
                                        setForm((prev) => ({
                                            ...prev,
                                            username: event.target.value,
                                        }));
                                    }}
                                    value={form.username}
                                    autoFocus
                                    label="Username"
                                    placeholder="Set your username"
                                    variant="bordered"
                                />
                                <Input
                                    onChange={(event) => {
                                        setForm((prev) => ({
                                            ...prev,
                                            email: event.target.value,
                                        }));
                                    }}
                                    readOnly={readonly}
                                    autoFocus
                                    value={form.email}
                                    label="Email"
                                    placeholder="Enter your email"
                                    variant="bordered"
                                />
                                <Input
                                    label="First name"
                                    onChange={(event) => {
                                        setForm((prev) => ({
                                            ...prev,
                                            firstName: event.target.value,
                                        }));
                                    }}
                                    readOnly={readonly}
                                    value={form.firstName}
                                    placeholder="Enter your first name"
                                    type="text"
                                    variant="bordered"
                                />
                                <Input
                                    label="Last name"
                                    onChange={(event) => {
                                        setForm((prev) => ({
                                            ...prev,
                                            lastName: event.target.value,
                                        }));
                                    }}
                                    readOnly={readonly}
                                    value={form.lastName}
                                    placeholder="Enter your last name"
                                    type="text"
                                    variant="bordered"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                {
                                    !readonly &&
                                    <Button onClick={() => onSave(form)} color="primary" onPress={onClose}>
                                        Save
                                    </Button>
                                }
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
