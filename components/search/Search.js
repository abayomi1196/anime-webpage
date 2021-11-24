import styles from "./Search.module.css";

function Search() {
  return (
    <div className={styles.searchBar}>
      <input type='text' placeholder='search your favorite animes...' />
      <small>Press enter to search</small>
    </div>
  );
}

export default Search;
