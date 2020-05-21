import gql from 'graphql-tag';

export const CREATE_AUTHOR_MUTATION = gql`
    mutation createAuthor($input: CreateAuthorInput!) {
        createAuthor(input: $input) {
            id
            name
        }
    }
`;

export const UPDATE_AUTHOR_MUTATION = gql`
    mutation updatePost($input: UpdatePostInput!) {
        updatePost(input: $input) {
            id
            title
            content
        }
    }
`;

export const DELETE_AUTHOR_MUTATION = gql`
    mutation deletePost($id:String!){
        deletePost(id:$id){
            id
            title
        }
    }
`;
