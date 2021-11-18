import Image from "next/image";

import styles from "./Card.module.css";

function Card({ anime }) {
  return (
    <a className={styles.card}>
      <div className={styles.cardImage}>
        <Image
          src={anime.coverImage.extraLarge}
          alt={anime.title.english}
          width={"450px"}
          height={"350px"}
          objectFit={"cover"}
        />

        <div className={styles.cardImage__text}>
          <h4>{anime.title.userPreferred}</h4>
          <p>{anime.genres.slice(0, 2).join(", ")}</p>
        </div>
      </div>

      <div className={styles.cardText}>
        <div className={styles.cardText__duration}>
          <p>
            <span>
              {anime.startDate.year} - {anime.endDate.year || "PRESENT"}
            </span>
            {anime.episodes && <span>{anime.episodes} episodes</span>}
          </p>
          <p>{anime.duration} mins.</p>
        </div>
      </div>
    </a>
  );
}

export default Card;
