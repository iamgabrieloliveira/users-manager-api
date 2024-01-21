import ConfirmationDialog, { type ConfirmationDialogProps } from '@/components/dialogs/ConfirmationDialog';

type ImpersonateConfirmationModalProps = Omit<ConfirmationDialogProps, 'body'>;

export default function ImpersonateConfirmationModal(props: ImpersonateConfirmationModalProps) {
    return (
        <ConfirmationDialog
            {...props}
            body={
                <p>
                    Are you sure you want to impersonate this user?
                </p>
            }
        >
        </ConfirmationDialog>
    );
}
