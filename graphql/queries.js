import { gql } from "@apollo/client";

export const GET_ANIMES = gql`
  query allAnimes($type: MediaType, $sort: [MediaSort]) {
    Page(page: 1, perPage: 10) {
      media(type: $type, sort: $sort) {
        id
        status
        genres
        description
        episodes
        duration

        coverImage {
          extraLarge
        }

        title {
          userPreferred
          english
        }

        studios {
          nodes {
            name
          }
        }

        startDate {
          year
        }

        endDate {
          year
        }
      }
    }
  }
`;
