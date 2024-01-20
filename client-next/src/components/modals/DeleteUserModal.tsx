import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';

type DeleteUserModalProps = {
    isOpen: boolean,
    onClose: () => void,
    onConfirm: () => void,
}

export default function DeleteUserModal({ onClose, onConfirm, isOpen }: DeleteUserModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
                        <ModalBody>
                            <p>
                                Are you sure you want to delete this user account? This action cannot be undone.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Go back
                            </Button>
                            <Button onClick={onConfirm} color="primary" onPress={onClose}>
                                Confirm
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
