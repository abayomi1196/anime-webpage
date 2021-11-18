import Image from "next/image";

import styles from "./Card.module.css";

function Card({ anime }) {
  return (
    <a className={styles.card}>
      <Image
        src={anime.coverImage.extraLarge}
        alt={anime.title.english}
        width={"300px"}
        height={"250px"}
        objectFit={"cover"}
      />

      {/* truncate the name, if its too long */}
      {anime.title.userPreferred.length >= 30 ? (
        <h4>{anime.title.userPreferred.slice(0, 30)}...</h4>
      ) : (
        <h4>{anime.title.userPreferred}</h4>
      )}
    </a>
  );
}

export default Card;
