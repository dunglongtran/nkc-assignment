import React from 'react';
import {Box, Grid} from "@chakra-ui/core";
import {PostsCard} from './posts.card'


export function PostsGrid({posts = []}: { posts: Array<any> }) {
    return <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {Array.from(posts).map((item: any, index) => <PostsCard key={`post-${item.id || index}`} post={item}/>)}

    </Grid>
}
