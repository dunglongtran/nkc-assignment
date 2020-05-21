import React, {useState} from 'react';
import {
    Button, FormControl, FormLabel, IconButton, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Select,
    useDisclosure
} from "@chakra-ui/core";
import {PostForm} from "./post.form";
import {UseDisclosureReturn} from "@chakra-ui/core/dist/useDisclosure";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {GET_POSTS_QUERY} from "../graphqls/posts.query";
import {GET_AUTHORS_QUERY} from "../graphqls/authors.query";
import {CREATE_POST_MUTATION, UPDATE_POST_MUTATION} from "../graphqls/posts.mutation";
import {useParams, useHistory} from "react-router-dom"
import {CREATE_AUTHOR_MUTATION} from "../graphqls/authors.mutation";
import {AuthorForm} from "./author.form";

interface IPostModalProps {
    confirmAction: Function
    closeAction: Function
    isOpen: boolean
    header: string
    nameAction: string
    post: any
}

export function PostModal(props: IPostModalProps) {
    const [updateValue, setUpdateValue] = useState({});
    const onClose = (event: React.MouseEvent | React.KeyboardEvent, reason?: "pressedEscape" | "clickedOverlay",) => {
        typeof props.closeAction == 'function' && props.closeAction(event, reason)
    }
    const onConfirm = (event: React.MouseEvent | React.KeyboardEvent, reason?: "pressedEscape" | "clickedOverlay",) => {
        typeof props.confirmAction === 'function' && props.confirmAction({...props.post, ...updateValue});
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
                    <PostForm post={{...props.post, ...updateValue}} changeAction={update}/>
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

export function AuthorCreateModal() {
    const history=useHistory()
    const {loading, data} = useQuery(GET_AUTHORS_QUERY, {variables: {}});
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [updateValue, setUpdateValue] = useState({});
    const [createAuthor] = useMutation(CREATE_AUTHOR_MUTATION,)
    const onConfirm = async (event: React.MouseEvent | React.KeyboardEvent, reason?: "pressedEscape" | "clickedOverlay",) => {
        const {data} =await createAuthor({variables: {input: updateValue}});
        data && typeof data.createAuthor === 'object' && history.push(`/authors/${data.createAuthor.id}`)
    }
    const update = (value: object) => {
        setUpdateValue({...updateValue, ...value})
    }


    return (
        <React.Fragment>
            <IconButton variant="outline"
                        variantColor="teal" aria-label="Add" icon="add" size={'lg'} isRound onClick={onOpen}
                        position={'fixed'} bottom={'10vh'} right={'5vh'}/>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Add Author</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <AuthorForm author={{...updateValue}} changeAction={update}/>

                    </ModalBody>

                    <ModalFooter>
                        <Button variantColor="blue" mr={3} onClick={onConfirm}>
                            Add
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </React.Fragment>
    );
}
