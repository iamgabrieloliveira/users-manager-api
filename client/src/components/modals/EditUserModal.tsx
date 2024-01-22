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
import { handleErrorWithToast } from '@/services/api';
import { loadUserInfo } from '@/services/dashboard';

export type UserPayload = {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
}

type BaseEditUserModalProps = {
    isOpen: boolean;
    userId?: number,
    onClose: () => void;
}

type ReadonlyModalProps = {
    readonly: true;
    onSave: undefined;
}

type InteractiveModalProps = {
    readonly: false;
    onSave: (data: UserPayload) => void;
}

// to explicitly tells to the compiler when readonly is false onSave must be given
type EditUserModalProps = BaseEditUserModalProps & ReadonlyModalProps
    | BaseEditUserModalProps & InteractiveModalProps;

const formInitialState = {
    email: '',
    firstName: '',
    lastName: '',
    username: '',
};

export default function EditUserModal({ isOpen, userId, onClose, onSave, readonly }: EditUserModalProps) {
    const [form, setForm] = useState<UserPayload>(formInitialState);
    const [isLoading, setIsLoading] = useState(false);

    function handleSave() {
        if (!readonly) {
            onSave(form);
        }

        onClose();
    }

    useEffect(() => {
        if (!userId) return;

        loadUserInfo(userId)
            .then((user) => {
                setForm({
                    email: user.email,
                    username: user.username,
                    firstName: user.first_name,
                    lastName: user.last_name,
                });
            }).catch((err) => {
                handleErrorWithToast(err);
            }).finally(() => setIsLoading(false));
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
                                    <Button onClick={() => handleSave()} color="primary">
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
