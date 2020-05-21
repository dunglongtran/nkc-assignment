import React from 'react';
import {useQuery} from "@apollo/react-hooks";
import {useParams} from "react-router-dom";
import {DETAIL_POST_QUERY} from "../graphqls/posts.query";
import {PostDetail} from "../components/post.detail";

export function PostScreen() {
    const {id} = useParams();
    const {loading, data} = useQuery(DETAIL_POST_QUERY, {variables: {id}});
    return <React.Fragment>
        {!loading && data && <PostDetail post={data && data.getPost ? data.getPost : {}}/>}
    </React.Fragment>
}
