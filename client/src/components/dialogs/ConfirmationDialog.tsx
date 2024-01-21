import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React from 'react';

export type ConfirmationDialogProps = {
    isOpen: boolean,
    onClose: () => void,
    onConfirm: () => void,
    body: React.ReactNode,
    confirmText?: string,
    goBackText?: string,
}

export default function ConfirmationDialog({ onClose, onConfirm, isOpen, body, confirmText, goBackText }: ConfirmationDialogProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
                        <ModalBody>
                            {body}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                { goBackText ?? 'Go back' }
                            </Button>
                            <Button onClick={onConfirm} color="primary" onPress={onClose}>
                                { confirmText ?? 'Confirm' }
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
