import gql from 'graphql-tag';

export const CREATE_POST_MUTATION = gql`
    mutation createPost($input: CreatePostInput!) {
        createPost(input: $input) {
            id
            title
            content
            author {
                id
                name
            }
        }
    }
`;

export const UPDATE_POST_MUTATION = gql`
    mutation updatePost($input: UpdatePostInput!) {
        updatePost(input: $input) {
            id
            title
            content
        }
    }
`;

export const DELETE_POST_MUTATION = gql`
    mutation deletePost($id:String!){
        deletePost(id:$id){
            id
            title
        }
    }
`;
