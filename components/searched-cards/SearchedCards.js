import { useContext } from "react";

import { SearchContext } from "../../context/SearchContext";

function SearchCards() {
  const { searchTerm } = useContext(SearchContext);

  return (
    <div>
      <p>you searched for `{searchTerm}`</p>
    </div>
  );
}

export default SearchCards;
