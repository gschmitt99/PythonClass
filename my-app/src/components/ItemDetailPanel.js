import React, { useState, useMemo } from "react";
import styles from "./CatalogStyles.module.css";

const ItemDetailPanel = ({ item, cart, onBack, onAddToCart, setActivePage }) => {
  const {pk, name, description, price, images} = item;
  const [selectedVariation, setSelectedVariation] = useState(
    item.variations && item.variations.length > 0 ? item.variations[0] : null
  );
  const [selectedModifiersByList, setSelectedModifiersByList] = useState({});
  const [kitchenNotes, setKitchenNotes] = useState(""); // New state for notes
  const [showBanner, setShowBanner] = useState(false);

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

  // Handler for Add to Cart
  const handleAddToCart = () => {
    if (!selectedVariation) {
      alert("Please select a variation before adding to cart.");
      return;
    }
    setShowBanner(true);

    // Flatten modifiers into a single array
    const selectedModifiers = Object.values(selectedModifiersByList).flat();
    onAddToCart({
      item,
      variation: selectedVariation,
      modifiers: selectedModifiers,
      price: finalPrice,
      notes: kitchenNotes, // Pass notes to cart
    });
  };

  return (
    <div style={{ marginLeft: "5%", marginRight: "auto"}}>
      <div>
        {showBanner && ( /* banner when the item has been added to the cart */
          <div style={{
            backgroundColor: "#dff0d8",
            color: "#3c763d",
            padding: "12px 20px",
            borderRadius: "6px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}>
          <span><strong>{item.name}</strong> has been added to your cart.</span>
            <div
              style={{
              cursor: "pointer",
              color: "#3c763d",
              textDecoration: "underline",
            }}
            onClick={() => setActivePage("Cart")}
            >
            🛒 Cart: {cart.length} item{cart.length !== 1 ? "s" : ""}
            </div>
          </div>
        )}
        <div className={styles.itemDetailsContainer}>
          {/* Image Panel (Far Left) */}
          <div className={styles.imageContainer}>
            {item.images?.length > 0 ? (
              item.images.map((imageRecord) => (
                <img
                  key={imageRecord.url}
                  src={`/imagery/${imageRecord.url}.jpg`}
                  alt={`Image of ${item.name}`}
                  style={{
                    width: "30vw",
                    maxWidth: "300px",
                    height: "auto",
                    objectFit: "contain",
                    marginBottom: "12px",
                    borderRadius: "8px"
                  }}
                />
              ))
            ) : (
              <div style={{ width: "30vw", maxWidth: "300px", height: "200px", backgroundColor: "#f0f0f0" }} />
            )}
          </div>

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
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariation}
              style={{ marginTop: "16px", padding: "10px 20px", fontWeight: "bold" }}
            >
              Add to Cart
            </button>
            {/* Notes to Kitchen */}
            <div style={{ marginTop: "16px" }}>
              <label>
                <strong>Notes to Kitchen:</strong>
                <textarea
                  value={kitchenNotes}
                  onChange={e => setKitchenNotes(e.target.value)}
                  rows={3}
                  style={{ width: "100%", marginTop: "4px" }}
                  placeholder="Add any special instructions..."
                />
              </label>
            </div>
          </div>

          {/* Right Panel */}
          <div className={styles.itemRight}>
            {item.variations.length > 1 && (
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
            )}

            {item.modifier_lists.length > 0 && (
              <div style={{ marginTop: "12px", fontSize: "0.775rem" }}>
                <h3 style={{ fontSize: "1rem", marginBottom: "6px" }}>Available Modifiers</h3>
                {item.modifier_lists.map((list) => (
                  <div key={list.pk} style={{ marginBottom: "12px" }}>
                    <h4 style={{ fontSize: "0.95rem", marginBottom: "6px" }}>{list.name}</h4>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, max-content)", // each column fits content
                        columnGap: "24px", // spacing between columns
                        rowGap: "8px",
                      }}
                    >
                      {list.modifiers.map((mod) => (
                        <label
                          key={mod.pk}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            whiteSpace: "nowrap", // prevents wrapping
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedModifiersByList[list.pk]?.some((m) => m.pk === mod.pk) || false}
                            onChange={() => toggleModifier(list.pk, mod)}
                            style={{ marginRight: "6px" }}
                          />
                          {mod.name}
                          {mod.amount ? ` (+$${(mod.amount / 100).toFixed(2)})` : ""}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPanel;