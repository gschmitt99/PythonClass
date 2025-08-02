import React, { useState, useMemo } from "react";
import styles from "./CatalogStyles.module.css";

const ItemDetailPanel = ({ item, onBack }) => {
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [selectedModifiersByList, setSelectedModifiersByList] = useState({});

  // Final price calculation
  const finalPrice = useMemo(() => {
    const base = selectedVariation?.price ? selectedVariation.price / 100 : 0;

    const modifiersTotal = Object.values(selectedModifiersByList).flat().reduce((sum, mod) => {
      return sum + (mod.amount ? mod.amount / 100 : 0);
    }, 0);

    return (base + modifiersTotal).toFixed(2);
  }, [selectedVariation, selectedModifiersByList]);

  const toggleModifier = (listPk, modifier) => {
    setSelectedModifiersByList((prev) => {
      const existing = prev[listPk] || [];
      const isSelected = existing.some((m) => m.pk === modifier.pk);
      const updated = isSelected
        ? existing.filter((m) => m.pk !== modifier.pk)
        : [...existing, modifier];
      return { ...prev, [listPk]: updated };
    });
  };

  return (
    <div className={styles.itemDetailsContainer}>
      {/* Left Panel */}
      <div className={styles.itemLeft}>
        <button onClick={onBack} style={{ marginBottom: "20px" }}>
          ← Back to Category
        </button>
        <h2>{item.name}</h2>
        <p className={styles.itemDescription}>{item.description}</p>
        <p className={styles.itemPrice}>
          Total Price: ${finalPrice}
        </p>
      </div>

      {/* Right Panel */}
      <div className={styles.itemRight}>
        <div>
          <h3>Variations</h3>
          {item.variations.map((variation) => (
            <label key={variation.pk} style={{ display: "block", marginBottom: "6px" }}>
              <input
                type="radio"
                name="variation"
                value={variation.pk}
                checked={selectedVariation?.pk === variation.pk}
                onChange={() => setSelectedVariation(variation)}
              />
              {variation.name} — ${(variation.price / 100).toFixed(2)}
            </label>
          ))}
        </div>

        <div style={{ marginTop: "24px" }}>
          <h3>Available Modifiers</h3>
          {item.modifier_lists.map((list) => (
            <div key={list.pk} style={{ marginBottom: "16px" }}>
              <h4>{list.name}</h4>
              {list.modifiers.map((mod) => (
                <label key={mod.pk} style={{ display: "block", marginBottom: "4px" }}>
                  <input
                    type="checkbox"
                    checked={selectedModifiersByList[list.pk]?.some((m) => m.pk === mod.pk) || false}
                    onChange={() => toggleModifier(list.pk, mod)}
                  />
                  {mod.name}
                  {mod.amount ? ` (+$${(mod.amount / 100).toFixed(2)})` : ""}
                </label>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPanel;
