import gql from 'graphql-tag';

export const GET_POSTS_QUERY=gql`
    query getPosts {
        getPosts {
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

export const DETAIL_POST_QUERY=gql`
    query getPost($id: String!) {
        getPost(id: $id) {
            id
            title
            content
            author {
                id
                name
                posts {
                    id
                    title
                }
            }
        }
    }
`;
