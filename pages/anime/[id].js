import Image from "next/image";
import Head from "next/head";

import styles from "../../styles/SingleAnime.module.css";
import client from "../../apollo-client";
import { GET_ANIMES, GET_SINGLE_ANIME } from "../../graphql/queries";

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_ANIMES,
    variables: {
      type: "ANIME",
      sort: "POPULARITY_DESC",
    },
  });

  // paths to be pre-rendered
  const paths = data.Page.media.map((movie) => {
    return { params: { id: movie.id.toString() } };
  });

  // fallback-false means other routes return 404
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: GET_SINGLE_ANIME,
    variables: {
      mediaId: params.id,
    },
  });

  // pass data to page via props
  return { props: { singleShow: data.Media } };
}

function SingleAnime({ singleShow }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{singleShow.title.english}</title>
        <meta
          name='description'
          content={`Anime Web Page showing ${singleShow.title.english} details`}
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div className={styles.bannerWrapper}>
          <Image
            src={singleShow.bannerImage}
            alt={singleShow.title.english}
            placeholder='blur'
            blurDataURL={singleShow.coverImage.medium}
            layout='fill'
            className={styles.bannerImage}
          />
        </div>

        <h2>{singleShow.title.userPreferred}</h2>
      </main>
    </div>
  );
}

export default SingleAnime;
