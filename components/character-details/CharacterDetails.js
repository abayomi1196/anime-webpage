import parser from "html-react-parser";
import { markdown } from "markdown";

import Image from "next/image";

import { useQuery } from "@apollo/client";
import { GET_SINGLE_CHARACTER } from "../../graphql/queries";

function CharacterDetails({ characterId }) {
  const { data, loading, error } = useQuery(GET_SINGLE_CHARACTER, {
    variables: {
      characterId,
    },
  });

  if (loading) return <h2>Loading...</h2>;

  if (error) {
    console.error(error);
    return null;
  }

  console.log(data);

  const character = data.Character;
  return (
    <div>
      <h2>
        {character.name.userPreferred} - {character.name.native}
      </h2>
      <p>{character.gender}</p>
      <p>{character.age}</p>
      <p>{parser(markdown.toHTML(character.description))}</p>
      <Image
        src={character.image.large}
        alt={character.name.userPreferred}
        width={"500px"}
        height={"450px"}
        objectFit='cover'
        placeholder='blur'
        blurDataURL={character.image.medium}
      />
    </div>
  );
}

export default CharacterDetails;
