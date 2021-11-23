import parser from "html-react-parser";
import { markdown } from "markdown";

import Image from "next/image";

import { useQuery } from "@apollo/client";
import { GET_SINGLE_CHARACTER } from "../../graphql/queries";

import styles from "./CharacterDetails.module.css";

function CharacterDetails({ characterId }) {
  const { data, loading, error } = useQuery(GET_SINGLE_CHARACTER, {
    variables: {
      characterId,
    },
  });

  const character = data?.Character;
  return (
    <div className={styles.container}>
      {loading && <p>Loading...</p>}

      {error && <p>Error loading data...</p>}

      {!error && !loading && (
        <>
          <div className={styles.imageWrapper}>
            <Image
              src={character.image.large}
              alt={character.name.userPreferred}
              objectFit='cover'
              layout='fill'
              placeholder='blur'
              blurDataURL={character.image.medium}
            />
          </div>
          <div className={styles.textWrapper}>
            <h2>
              {character.name.userPreferred} - {character.name.native}
            </h2>
            {character.gender && (
              <p>
                <strong>Gender: </strong> {character.gender}
              </p>
            )}
            {character.age && (
              <p>
                <strong>Age: </strong> {character.age}
              </p>
            )}
            <div className={styles.description}>
              {parser(
                markdown
                  .toHTML(character.description.replace(/~!.*!~/g, ""))
                  .replace(/<strong>/g, "<br /><strong>")
                  .replace(/<br \/>/, "")
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CharacterDetails;
