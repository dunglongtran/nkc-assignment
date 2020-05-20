import gql from 'graphql-tag';

export const UPDATE_POST_MUTATION=gql`
    mutation updatePost($input: UpdatePostInput!) {
        updatePost(input: $input) {
            id
            title
            content
        }
    }
`;

export const DELETE_POST_MUTATION=gql`
    mutation deletePost($id:String!){
        deletePost(id:$id){
            id
            title
        }
    }
`;
