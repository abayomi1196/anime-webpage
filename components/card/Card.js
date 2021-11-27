import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";

import styles from "./Card.module.css";

function Card({ anime }) {
  return (
    <Link href={`/anime/${encodeURIComponent(anime.id)}`} passHref>
      <div className={styles.card}>
        <div className={styles.cardImage}>
          <Image
            src={anime.coverImage.extraLarge}
            alt={anime.title.english}
            width={"450px"}
            height={"350px"}
            objectFit={"cover"}
            placeholder='blur'
            blurDataURL={anime.coverImage.medium}
          />

          <div className={styles.cardImage__text}>
            <h4>{anime.title.english}</h4>
            <p>{anime.genres.slice(0, 2).join(", ")}</p>
          </div>
        </div>

        <div className={styles.cardText}>
          <div className={styles.cardText__duration}>
            <p>
              <span>
                {anime.startDate.year}{" "}
                {anime.endDate.year && anime.endDate.year > anime.startDate.year
                  ? `- ${anime.endDate.year}`
                  : null}
              </span>
              <span>
                {" "}
                {anime.format} •{" "}
                {anime.episodes
                  ? `${anime.episodes} ${
                      anime.episodes > 1 ? "episodes" : "episode"
                    }`
                  : "N/A"}
              </span>
            </p>
            <p>{anime.averageScore} / 100</p>
          </div>
        </div>
        <div className={styles.cardText__description}>
          {parse(`${anime.description.slice(0, 200)}...`)}
        </div>

        <div className={styles.cardText__studios}>
          {anime.studios.nodes
            .slice(0, 2)
            .map((node) => node.name)
            .join(", ")}
        </div>
      </div>
    </Link>
  );
}

export default Card;
