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
  query singleShow($mediaId: Int, $sort: [CharacterSort]) {
    Media(id: $mediaId) {
      id
      duration
      description
      bannerImage
      episodes
      genres
      status
      format
      averageScore
      source

      staff {
        nodes {
          id
          name {
            userPreferred
          }
          primaryOccupations
        }
      }

      coverImage {
        medium
        extraLarge
      }

      title {
        english
        native
        userPreferred
      }

      externalLinks {
        site
        url
        id
      }

      startDate {
        year
        month
        day
      }

      endDate {
        year
        month
        day
      }

      characters(sort: $sort) {
        nodes {
          id
          image {
            medium
            large
          }
          name {
            first
            last
            middle
          }
        }
      }

      relations {
        nodes {
          id
          format
          status
          title {
            userPreferred
          }
          coverImage {
            medium
            large
          }
        }
      }
    }
  }
`;

export const GET_SINGLE_CHARACTER = gql`
  query getCharacter($characterId: Int) {
    Character(id: $characterId) {
      gender
      age
      description
      name {
        native
        userPreferred
      }
      image {
        medium
        large
      }
    }
  }
`;
