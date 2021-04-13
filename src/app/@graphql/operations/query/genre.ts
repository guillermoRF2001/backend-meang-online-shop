import { GENRE_FRAGMENT } from '@graphql/operations/fragment/genre';
import { RESULT_INFO_FRAGMENT } from '@graphql/operations/fragment/result-info';
import gql from 'graphql-tag';

export const GENRE_LIST_QUERY = gql`
    query genresList($page: Int, $itemsPage: Int){
        genres (page: $page, itemsPage: $itemsPage){
            info{
                ...ResultInfoObject
            }
            status
            message
            genres{
                ...GenreObject
            }
        }
    }
    ${RESULT_INFO_FRAGMENT}
    ${GENRE_FRAGMENT}
`;

