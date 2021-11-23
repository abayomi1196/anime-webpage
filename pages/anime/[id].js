import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import parser from "html-react-parser";

import styles from "../../styles/SingleAnime.module.css";
import client from "../../apollo-client";
import { GET_ANIMES, GET_SINGLE_ANIME } from "../../graphql/queries";

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_ANIMES,
    variables: {
      type: "ANIME",
      sort: "TRENDING_DESC",
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
      sort: "FAVOURITES_DESC",
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
                  : "- Present"}
              </span>
            </p>

            <p>{parser(singleShow.description)}</p>
          </div>
        </div>

        <div className={styles.animeInfo}>
          <div className={styles.animeInfo__details}>
            <div>
              <h3>General Details</h3>
              <p>
                <span>Source </span>
                <span>{singleShow.source}</span>
              </p>

              <p>
                <span>Format </span>
                <span>{singleShow.format}</span>
              </p>

              <p>
                <span>Episode Count </span>
                <span>{singleShow.episodes} episode(s)</span>
              </p>

              <p>
                <span>Episode Duration </span>
                <span>{singleShow.duration} mins.</span>
              </p>

              <p>
                <span>Average Score </span>
                <span>{singleShow.averageScore}%</span>
              </p>

              {singleShow.staff.nodes
                .filter((node) => node.primaryOccupations[0] === "Director")
                .slice(0, 1)
                .map((node) => (
                  <p key={node.id}>
                    <span>{node.primaryOccupations[0]}</span>
                    <span>{node.name.userPreferred}</span>
                  </p>
                ))}
            </div>

            <div>
              <h3>Relevant Links</h3>

              {singleShow.externalLinks.map((link) => {
                if (
                  link.site === "Netflix" ||
                  link.site === "Adult Swim" ||
                  link.site === "Hulu" ||
                  link.site === "Crunchyroll"
                ) {
                  return (
                    <p key={link.id}>
                      <a href={link.url} rel='noreferrer' target='_blank'>
                        {link.site}
                      </a>
                    </p>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>

          <div className={styles.animeInfo__info}>
            {/* characters */}
            <div className={styles.animeInfo__characters}>
              <h3>Popular Characters</h3>
              <div className={styles.characters_grid}>
                {singleShow.characters.nodes.slice(0, 12).map((character) => (
                  <Link
                    key={character.id}
                    href={`/character/${encodeURIComponent(character.id)}`}
                    passHref
                  >
                    <div key={character.id} className={styles.singleCharacter}>
                      <div>
                        <Image
                          src={character.image.large}
                          width={"150px"}
                          height={"150px"}
                          objectFit='cover'
                          alt={character.name.first}
                          placeholder='blur'
                          blurDataURL={character.image.medium}
                        />
                      </div>
                      <p>
                        {character.name.first} {character.name.middle}{" "}
                        {character.name.last}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {/* end of characters */}

            {/* related shows */}
            <div className={styles.animeInfo__related}>
              <h3>Related Media</h3>
              <div className={styles.related__grid}>
                {singleShow.relations?.nodes?.slice(0, 6).map((node) => (
                  <div key={node.id} className={styles.singleRelation}>
                    <Image
                      src={node.coverImage.large}
                      width={"250px"}
                      height={"200px"}
                      objectFit='cover'
                      alt={node.title.userPreferred}
                      placeholder='blur'
                      blurDataURL={node.coverImage.medium}
                    />

                    <div className={styles.singleRelation__text}>
                      <h4>{node.title.userPreferred}</h4>
                      <small>{node.format}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* end of related shows */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SingleAnime;
