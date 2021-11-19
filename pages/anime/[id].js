import Image from "next/image";
import Head from "next/head";

import parser from "html-react-parser";

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
        <title>{singleShow.title.english} | Popular Anime List</title>
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

        <div className={styles.header}>
          <div className={styles.coverWrapper}>
            <Image
              src={singleShow.coverImage.extraLarge}
              alt={singleShow.title.userPreferred}
              placeholder='blur'
              blurDataURL={singleShow.coverImage.medium}
              layout='fill'
              className={styles.headerImage}
            />
          </div>

          <div className={styles.description}>
            <h2>
              <span>
                <i>{singleShow.title.userPreferred}</i>
              </span>
              <span>{singleShow.status}</span>
            </h2>
            <p className={styles.genres}>
              <span>{singleShow.genres.join(", ")}</span>
              <span>
                {singleShow.startDate.year}{" "}
                {singleShow.endDate.year
                  ? `- ${singleShow.endDate.year}`
                  : "Present"}
              </span>
            </p>

            <p>{parser(singleShow.description)}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SingleAnime;