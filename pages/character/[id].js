import Head from "next/head";
import { useRouter } from "next/router";

import ClientOnly from "../../components/ClientOnly";
import CharacterDetails from "../../components/character-details/CharacterDetails";

function SingleCharacter() {
  const { query } = useRouter();

  return (
    <div>
      <Head>
        <title>Character Detail | Popular Anime List</title>
        <meta name='description' content={`Anime Web Page showing details`} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <ClientOnly>
        <CharacterDetails characterId={query.id} />
      </ClientOnly>
    </div>
  );
}

export default SingleCharacter;
