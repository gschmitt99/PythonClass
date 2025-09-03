import React from "react";
import styles from "./CatalogStyles.module.css";

const MenuItemTile = ({ item, onClick }) => {
  const {pk, name, description, price, images} = item;
  console.log(`Item ${pk} has ${images?.length || 0} image(s)`);
  return (
  <div className={styles.tileCard} onClick={() => onClick(pk)}>
      {Array.isArray(images) && images.length > 0 && (
        <div className={styles.imageContainer}>
          {images.map((url) => (
          <img key={url} src={`/imagery/${url}.jpg`}
          />
          ))}
        </div>
      )}
    <h3>{name}</h3>
    <h4>{description}</h4>
    <p style={{ fontSize: "0.9rem", color: "red" }}>
      {price}
    </p>
  </div>
  );
};

export default MenuItemTile;
