import { gql } from "@apollo/client";

export const GET_ALL_ANIMES = gql`
  query allAnimes(
    $page: Int
    $perPage: Int
    $type: MediaType
    $sort: [MediaSort]
  ) {
    Page(page: $page, perPage: $perPage) {
      media(type: $type, sort: $sort) {
        id
        popularity
        meanScore
        coverImage {
          extraLarge
        }
        title {
          english
          userPreferred
        }
      }
    }
  }
`;
