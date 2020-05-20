import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button
} from "@chakra-ui/core";

interface IConfirmDialogProps {
    confirmAction: Function
    closeAction?: Function
    isOpen: boolean
    header: string
    body: string
    nameAction: string
}

export function ConfirmDialog(props: IConfirmDialogProps) {

    const onClose = () => {
        typeof props.closeAction === 'function' && props.closeAction();
    }
    const onConfirm = () => {
        typeof props.confirmAction === 'function' && props.confirmAction();
        onClose();
    }
    const cancelRef = React.useRef();


    return (

        <AlertDialog
            isOpen={props.isOpen}
            // @ts-ignore
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay/>
            <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    {props.header}
                </AlertDialogHeader>

                <AlertDialogBody>
                    {props.body}
                </AlertDialogBody>

                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variantColor="red" onClick={onConfirm} ml={3}>
                        {props.nameAction}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
