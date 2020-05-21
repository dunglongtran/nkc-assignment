import React from 'react';
import {useQuery} from "@apollo/react-hooks";
import {useParams} from "react-router-dom";
import {DETAIL_POST_QUERY} from "../graphqls/posts.query";
import {PostDetail} from "../components/post.detail";
import {AuthorDetail} from "../components/author.detail";
import {DETAIL_AUTHOR_QUERY} from "../graphqls/authors.query";

export function AuthorScreen() {
    const {id} = useParams();
    const {loading, data} = useQuery(DETAIL_AUTHOR_QUERY, {variables: {id}});
    return <React.Fragment>
        {!loading && data && <AuthorDetail author={data && data.getAuthor ? data.getAuthor : {}}/>}
    </React.Fragment>
}
