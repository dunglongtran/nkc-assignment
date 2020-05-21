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
    query getAuthor($id: String!) {
        getAuthor(id: $id) {
            id
            name
            posts {
                id
                title
                content
                author {
                    id
                    name
                }
            }
        }
    }
`;
