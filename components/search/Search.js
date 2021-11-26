import { useState, useContext, useRef } from "react";
import styles from "./Search.module.css";

import { SearchContext } from "../../context/SearchContext";

function Search() {
  const inputRef = useRef();

  const [searchTerm, setSearchTerm] = useState("");

  const { updateSearchTerm } = useContext(SearchContext);

  function handleSubmit(e) {
    e.preventDefault();
    updateSearchTerm(searchTerm.trim());
    inputRef.current.blur();
  }

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input
          type='text'
          placeholder='search your favorite animes...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          ref={inputRef}
        />

        <button
          onClick={() => {
            setSearchTerm("");
            updateSearchTerm("");
          }}
          type='button'
        >
          Reset
        </button>
      </div>

      <small>Press enter to search</small>
    </form>
  );
}

export default Search;
