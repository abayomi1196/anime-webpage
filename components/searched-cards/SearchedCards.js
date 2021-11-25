import { useContext } from "react";
import { useQuery } from "@apollo/client";

import { SearchContext } from "../../context/SearchContext";
import styles from "../../styles/Home.module.css";
import { GET_SEARCHED_ANIMES } from "../../graphql/queries";

import SingleSearchCard from "../single-search-card/SingleSearchCard";

function SearchCards() {
  const { searchTerm } = useContext(SearchContext);

  const { data, loading, error } = useQuery(GET_SEARCHED_ANIMES, {
    variables: {
      search: searchTerm,
      sort: "POPULARITY_DESC",
      type: "ANIME",
    },
  });

  const searchedAnimes = data?.Page?.media;

  return (
    <main className={styles.main}>
      <div className={styles.gridWrapper}>
        <h3>you searched for `{searchTerm}`</h3>

        {loading && <p>Loading...</p>}

        {error && <p>Error loading data</p>}

        {searchedAnimes?.length && (
          <div className={styles.grid}>
            {searchedAnimes.map((anime) => (
              <SingleSearchCard anime={anime} key={anime.id} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default SearchCards;
