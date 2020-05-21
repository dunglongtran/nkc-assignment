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

interface IAuthorFormProps {
    author: any
    changeAction: Function
}

export function AuthorForm(props: IAuthorFormProps) {

    const onChange = (value: object) => {
        typeof props.changeAction === 'function' && props.changeAction(value);
    }
    return (
        <Stack>
            <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeholder="please input name"
                       value={props.author.name ||''}
                       onChange={(event: any) => onChange({name: event.target.value})}/>
            </FormControl>


        </Stack>

    );
}
