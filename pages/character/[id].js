import Head from "next/head";
import { useRouter } from "next/router";

import ClientOnly from "../../components/ClientOnly";
import CharacterDetails from "../../components/character-details/CharacterDetails";

function SingleCharacter() {
  const { query } = useRouter();

  return (
    <div>
      <ClientOnly>
        <CharacterDetails characterId={query.id} />
      </ClientOnly>
    </div>
  );
}

export default SingleCharacter;
