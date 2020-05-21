import React from 'react';
import {PostsGrid} from '../components/posts.grid'
import {useQuery} from "@apollo/react-hooks";
import {GET_POSTS_QUERY} from "../graphqls/posts.query";
import {PostCreateModal} from "../components/post.modal";
import {AuthorsGrid} from "../components/authors.grid";
import {GET_AUTHORS_QUERY} from "../graphqls/authors.query";
import {AuthorCreateModal} from "../components/author.modal";

export function AuthorsScreen() {
    const {loading, data} = useQuery(GET_AUTHORS_QUERY, {variables: {}});

    return <React.Fragment>
        {!loading && data && <AuthorsGrid authors={data && data.getAuthors ? data.getAuthors : []}/>}
        <AuthorCreateModal />
    </React.Fragment>
}
