import React from "react";
import styles from "./CatalogStyles.module.css";

const MenuItemTile = ({ itemId, itemName, itemDescription, itemPrice, onClick }) => (
  <div className={styles.tileCard} onClick={() => onClick(itemId)}>
    {/* <img src={`https://www.smorrsweets.com/wp-content/uploads/2024/10/13.png`} alt={itemName} className={styles.tileImage} /> */}
    <h3>{itemName}</h3>
    <h4>{itemDescription}</h4>
    <p style={{ fontSize: "0.9rem", color: "red" }}>
      ${itemPrice}
    </p>
  </div>
);

export default MenuItemTile;
