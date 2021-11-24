import "../styles/globals.css";

// apollo
import { ApolloProvider } from "@apollo/client";
import { SearchContextProvider } from "../context/SearchContext";

import client from "../apollo-client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <SearchContextProvider>
        <Component {...pageProps} />
      </SearchContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
