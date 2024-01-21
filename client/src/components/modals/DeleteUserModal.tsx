import ConfirmationDialog, { type ConfirmationDialogProps } from '@/components/dialogs/ConfirmationDialog';

type DeleteUserDialogProps = Omit<ConfirmationDialogProps, 'body'>;

export default function DeleteUserModal(props: DeleteUserDialogProps) {
    return (
        <ConfirmationDialog
            {...props}
            body={
                <p>
                    Are you sure you want to delete this user account? This action cannot be undone.
                </p>
            }
        >
        </ConfirmationDialog>
    );
}
