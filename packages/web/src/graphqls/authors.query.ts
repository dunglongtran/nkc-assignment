import gql from 'graphql-tag';

export const GET_AUTHORS_QUERY=gql`
    query getAuthors {
        getAuthors {
            id
            name
        }
    }
`;

export const DETAIL_AUTHOR_QUERY=gql`
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
