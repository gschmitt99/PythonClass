import React from "react";
import styles from "./CatalogStyles.module.css";

const ItemCard = ({ itemId, itemName, onClick }) => (
  <div
    className={styles.modifierBox}
    onClick={() => onClick(itemId)}
  >
    <h4>{itemName}</h4>
    <p style={{ fontSize: "0.9rem", color: "#666" }}>ID: {itemId}</p>
  </div>
);

export default ItemCard;
