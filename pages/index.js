import { useContext } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import client from "../apollo-client";
import { GET_ANIMES } from "../graphql/queries";

import Card from "../components/card/Card";
import ClientOnly from "../components/ClientOnly";
import Search from "../components/search/Search";
import SearchCards from "../components/searched-cards/SearchedCards";

import { SearchContext } from "../context/SearchContext";

export async function getStaticProps() {
  const { data: popularData } = await client.query({
    query: GET_ANIMES,
    variables: {
      type: "ANIME",
      sort: "FAVOURITES_DESC",
    },
  });

  return {
    props: {
      popularAnimes: popularData.Page.media,
    },
  };
}

export default function Home({ popularAnimes }) {
  const { searchTerm } = useContext(SearchContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Popular Anime List</title>h
        <meta
          name='description'
          content='Anime List showing both currently trending and old time classics for old heads'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Search />
        {searchTerm && (
          <ClientOnly>
            <SearchCards />
          </ClientOnly>
        )}

        {!searchTerm && (
          <div className={styles.gridWrapper}>
            <h3>Most Popular.</h3>
            <div className={styles.grid}>
              {popularAnimes.map((anime) => (
                <Card anime={anime} key={anime.id} />
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href='https://github.com/abayomi1196/anime-webpage'
          target='_blank'
          rel='noopener noreferrer'
        >
          <span>
            <Image src='/github.svg' alt='Github Logo' width={82} height={46} />
          </span>
        </a>
      </footer>
    </div>
  );
}
