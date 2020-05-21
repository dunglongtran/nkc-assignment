import React, {useState} from 'react';
import {
    Avatar,
    Badge,
    Box,
    Grid,
    Heading,
    Icon,
    IconButton,
    Image,
    Link,
    Stack,
    Textarea,
    useDisclosure
} from "@chakra-ui/core";
import {FaHeart} from 'react-icons/fa'
import {ConfirmDialog} from "./confirm.dialog";
import {useMutation} from "@apollo/react-hooks";
import {DELETE_POST_MUTATION, UPDATE_POST_MUTATION} from "../graphqls/posts.mutation";
import {useParams, useHistory} from "react-router-dom";
import {PostModal} from "./post.modal";

export function PostDetail({post = {}}: { post: any }) {
    const {id} = useParams();
    const history = useHistory()
    // @ts-ignore
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [isOpenDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentPost, setCurrentPost] = useState(post);
    const [deletePost] = useMutation(DELETE_POST_MUTATION, {variables: {id}})
    const [updatePost] = useMutation(UPDATE_POST_MUTATION, {
        variables: {
            input: {
                id: currentPost.id,
                title: currentPost.title,
                content: currentPost.content
            }
        }
    })
    const property = {
        imageUrl: "https://bit.ly/2Z4KKcF",
        imageAlt: "Rear view of modern home with pool",
        beds: 3,
        baths: 2,
        title: "Modern home in city center in the heart of historic Los Angeles",
        formattedPrice: "$1,900.00",
        reviewCount: 34,
        rating: 4,
        ...currentPost
    };
    const showDeleteDialog = () => setOpenDeleteDialog(true);
    const closeDeleteDialog = () => setOpenDeleteDialog(false);
    const deleteAction = async () => {
        try {
            const result = await deletePost();
            console.log(result)
        }catch (error) {

        }finally {
            history.goBack()
        }

    };
    const showUpdateModal = () => onOpen();
    const closeUpdateModal = () => onClose();
    const updateAction = async (nextPost: { id: string, title: string, content: string }) => {
        console.log('updateAction', nextPost)
        const {errors, data} = await updatePost({
            variables: {
                input: {
                    id: nextPost.id,
                    title: nextPost.title,
                    content: nextPost.content
                }
            }
        });
        data && typeof data.updatePost === 'object' && setCurrentPost({...currentPost, ...data.updatePost})
        console.log(data)
    };

    return (
        <React.Fragment>
            <Box maxW="50%" borderWidth="1px" rounded="lg" overflow="hidden" alignSelf={'center'} alignItems={'center'}
                 margin={'auto'}>
                <Box alignItems={'center'} position={'relative'}>
                    <Image src={property.imageUrl} alt={property.imageAlt} margin={'auto'} alignSelf={'center'}/>
                    <Stack size={'xs'} width={'auto'} position={'absolute'} right={'5%'} top={'25%'} background={'#333'} opacity={0.8} height={'auto'} padding={'5px'}>
                        <IconButton
                            variant="outline"
                            variantColor="teal"
                            aria-label="Call Sage"
                            icon={FaHeart}
                            size={'sm'}
                            isRound
                        />
                        <IconButton variant="outline"
                                    variantColor="teal" aria-label="Edit" icon="edit" size={'sm'} isRound
                                    onClick={showUpdateModal}/>
                        <IconButton variant="outline"
                                    variantColor="red" aria-label="Delete" icon="delete" size={'sm'} isRound
                                    onClick={showDeleteDialog}/>
                        <IconButton variant="outline"
                                    variantColor="teal" aria-label="Add" icon="add" size={'sm'} isRound/>
                    </Stack>
                </Box>
                <Box p="6">
                    <Box d="flex" alignItems="center">
                        <Avatar size={'xs'} name={currentPost.author.name} src="https://bit.ly/dan-abramov"/>
                        <Heading size={'xs'}>{currentPost.author.name}</Heading>
                    </Box>

                    <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                    >
                        <Link href={`${currentPost.id}`}>
                            {property.title}
                        </Link>
                    </Box>
                    <Box>
                        <Textarea
                            value={currentPost.content}
                            contentEditable={false}
                            size="sm"
                        />
                    </Box>
                </Box>
            </Box>
            <ConfirmDialog confirmAction={deleteAction} closeAction={closeDeleteDialog} isOpen={isOpenDeleteDialog}
                           header={' Delete Post'}
                           body={' Are you sure? You can\'t undo this action afterwards.'} nameAction={'Delete'}/>
            <PostModal closeAction={closeUpdateModal} confirmAction={updateAction} header={'Update Post'}
                       isOpen={isOpen} nameAction={'Update'}
                       post={currentPost}/>
        </React.Fragment>
    );
}
