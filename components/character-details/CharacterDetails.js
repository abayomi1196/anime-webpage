import { useQuery } from "@apollo/client";
import { GET_SINGLE_CHARACTER } from "../../graphql/queries";

function CharacterDetails({ characterId }) {
  const { data, loading, error } = useQuery(GET_SINGLE_CHARACTER, {
    variables: {
      characterId,
    },
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  console.log(data);
  return (
    <div>
      hello from single character
      <h2>{data.Character.name.userPreferred}</h2>
    </div>
  );
}

export default CharacterDetails;
