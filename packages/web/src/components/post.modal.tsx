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

export function PostCreateModal() {
    const history = useHistory()
    const {loading, data} = useQuery(GET_AUTHORS_QUERY, {variables: {}});
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [updateValue, setUpdateValue] = useState({authorId: "", title: "", content: ""});
    const [createPost] = useMutation(CREATE_POST_MUTATION,)
    const onConfirm = async (event: React.MouseEvent | React.KeyboardEvent, reason?: "pressedEscape" | "clickedOverlay",) => {
        const {authorId,title,content} = updateValue
        if (authorId && title && content) {
            const {data} = await createPost({variables: {input: updateValue}});
            data && typeof data.createPost === 'object' && history.push(`/posts/${data.createPost.id}`)
        } else {
            alert("Please input required fields")
        }
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
                    <ModalHeader>Add Post</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <PostForm post={{...updateValue}} changeAction={update}/>
                        <FormControl isRequired>
                            <FormLabel htmlFor="author">Author</FormLabel>
                            <Select id="author" placeholder="Select author"
                                    value={updateValue.authorId}
                                    onChange={(event: any) => update({authorId: event.target.value})}>
                                {!loading && data && Array.isArray(data.getAuthors) && (Array.from(data.getAuthors)).map((item: any, index) => (
                                        <option key={`author-${item.id}`} value={item.id}>{item.name}</option>
                                    )
                                )}

                            </Select>
                        </FormControl>
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
