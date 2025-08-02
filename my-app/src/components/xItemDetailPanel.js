import React from "react";
import styles from "./CatalogStyles.module.css";
import ModifierList from "./ModifierList";

const ItemDetailPanel = ({ item, onBack }) => {
  const formattedPrice = parseFloat(item.price).toFixed(2);

  return (
    <div className={styles.itemDetailsContainer}>
      {/* Left panel: basic info */}
      <div className={styles.itemLeft}>
        <button onClick={onBack} style={{ marginBottom: "20px" }}>
          ← Back to Category
        </button>
        <h2>{item.name}</h2>
        <p className={styles.itemDescription}>{item.description}</p>
        <p className={styles.itemPrice}>Price: ${formattedPrice}</p>
      </div>

      {/* Right panel: variations + modifiers */}
      <div className={styles.itemRight}>
        <div>
          <h3>Variations</h3>
          {item.variations.map((variation) => (
            <div key={variation.pk} style={{ marginBottom: "6px" }}>
              {variation.name} — ${(variation.price / 100).toFixed(2)}
            </div>
          ))}
        </div>

        <div style={{ marginTop: "24px" }}>
          <h3>Available Modifiers</h3>
          {item.modifier_lists.map((list) => (
            <ModifierList key={list.pk} list={list} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPanel;
