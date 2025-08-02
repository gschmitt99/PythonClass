import React from "react";
import styles from "./CatalogStyles.module.css";

const MenuItemTile = ({ itemId, itemName, description, onClick }) => (
  <div className={styles.tileCard} onClick={() => onClick(itemId)}>
    <h3>{itemName}</h3>
    <p style={{ fontSize: "0.9rem", color: "#555" }}>
      {description}
    </p>
  </div>
);

export default MenuItemTile;
