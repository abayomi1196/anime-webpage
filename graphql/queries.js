import { gql } from "@apollo/client";

export const GET_ANIMES = gql`
  query allAnimes($type: MediaType, $sort: [MediaSort]) {
    Page(page: 1, perPage: 20) {
      media(type: $type, sort: $sort) {
        id
        genres
        description
        episodes
        averageScore
        format

        coverImage {
          medium
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

export const GET_SINGLE_ANIME = gql`
  query singleShow($mediaId: Int) {
    Media(id: $mediaId) {
      id
      duration
      description
      bannerImage
      episodes

      coverImage {
        medium
        large
      }

      title {
        english
        native
        userPreferred
      }

      externalLinks {
        site
        url
      }

      characters {
        nodes {
          image {
            large
          }
          id
          name {
            first
            last
            middle
          }
          description
        }
      }
    }
  }
`;
