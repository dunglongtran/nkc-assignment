import React from 'react';
import {Box, Grid} from "@chakra-ui/core";
import {PostsCard} from './posts.card'
import {AuthorsCard} from "./authors.card";


export function AuthorsGrid({authors = []}: { authors: Array<any> }) {
    return <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {Array.from(authors).map((item: any, index) => <AuthorsCard key={`author-${item.id || index}`} author={item}/>)}

    </Grid>
}
