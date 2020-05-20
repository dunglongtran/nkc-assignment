import React, {useState} from 'react';
import {
    Button, FormControl, FormLabel, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/core";
import {PostForm} from "./post.form";
import {UseDisclosureReturn} from "@chakra-ui/core/dist/useDisclosure";

interface IPostModalProps {
    confirmAction: Function
    closeAction: Function
    isOpen: boolean
    header: string
    nameAction: string
    post: any
}

export function PostModal(props: IPostModalProps) {
    const [updateValue, setUpdateValue] = useState({
    });
    const onClose = (event: React.MouseEvent | React.KeyboardEvent, reason?: "pressedEscape" | "clickedOverlay",) => {
        typeof props.closeAction == 'function' && props.closeAction(event, reason)
    }
    const onConfirm = (event: React.MouseEvent | React.KeyboardEvent, reason?: "pressedEscape" | "clickedOverlay",) => {
        typeof props.confirmAction === 'function' && props.confirmAction({...props.post,...updateValue});
        onClose(event, reason);
    }
    const update = (value: object) => {
        setUpdateValue({...updateValue, ...value})
    }
    return (

        <Modal isOpen={props.isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>{props.header}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={6}>
                    <PostForm post={{...props.post,...updateValue}} changeAction={update}/>
                </ModalBody>

                <ModalFooter>
                    <Button variantColor="blue" mr={3} onClick={onConfirm}>
                        {props.nameAction}
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
