import React from 'react';
import {
    Button, FormControl, FormLabel, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Stack, Textarea,
    useDisclosure
} from "@chakra-ui/core";

interface IPostFormProps {
    post: any
    changeAction: Function
}

export function PostForm(props: IPostFormProps) {

    const onChange = (value: object) => {
        typeof props.changeAction === 'function' && props.changeAction(value);
    }
    return (
        <Stack>
            <FormControl>
                <FormLabel>Title</FormLabel>
                <Input placeholder="please input post's title"
                       value={props.post.title ||''}
                       onChange={(event: any) => onChange({title: event.target.value})}/>
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Content</FormLabel>
                <Textarea placeholder="please input content"
                          value={props.post.content ||''}
                          onChange={(event: any) => onChange({content: event.target.value})}
                />
            </FormControl>
        </Stack>

    );
}
