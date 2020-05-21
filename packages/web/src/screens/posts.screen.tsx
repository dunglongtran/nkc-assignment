import React from 'react';
import {PostsGrid} from '../components/posts.grid'
import {useQuery} from "@apollo/react-hooks";
import {GET_POSTS_QUERY} from "../graphqls/posts.query";
import {PostCreateModal} from "../components/post.modal";

export function PostsScreen() {
    const {loading, data} = useQuery(GET_POSTS_QUERY, {variables: {}});

    return <React.Fragment>
        {!loading && data && <PostsGrid posts={data && data.getPosts ? data.getPosts : []}/>}
        <PostCreateModal />
    </React.Fragment>
}
