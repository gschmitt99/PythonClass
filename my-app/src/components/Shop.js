import React, { useState, useEffect } from "react";
import styles from "./CatalogStyles.module.css";
import MenuItemTile from "./MenuItemTile";
import ItemDetailPanel from "./ItemDetailPanel";
import { createCatalogDataSource } from "../services/DataSourceFactory";

const Shop = ({ selectedCategory, onAddToCart, cart, setActivePage }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [fallbackCategory, setFallbackCategory] = useState(null);

  const itemsPerPage = 9;
  const startIndex = (currentPage - 1) * itemsPerPage;

  const dataSource = createCatalogDataSource(process.env.REACT_APP_ENV);

  // If no category is selected, pick a random one
  useEffect(() => {
    if (selectedCategory) {
      return;
    }

    const fetchRandomCategory = async () => {
      const categories = await dataSource.getCategories();
      if (!categories || categories.length === 0) return;

      const random = Math.floor(Math.random() * categories.length);
      const categoryItems = await dataSource.getProductsByCategory(categories[random].pk);
      categoryItems.categoryName = categories[random].name;
      setFallbackCategory(categoryItems);
    };

    fetchRandomCategory();
  }, []);

  const effectiveCategory = selectedCategory || fallbackCategory;
  const pagedItems = effectiveCategory?.slice(startIndex, startIndex + itemsPerPage);

  // Fetch item details when an item is selected
  useEffect(() => {
    if (!selectedItemId) return;

    const fetchDetails = async () => {
      const details = await dataSource.getItemData(selectedItemId);
      setItemDetails(details);
    };

    fetchDetails();
  }, [selectedItemId]);

  // Reset state when category changes
  useEffect(() => {
    setSelectedItemId(null);
    setItemDetails(null);
    setCurrentPage(1);
  }, [effectiveCategory]);

  const handleBack = () => {
    setSelectedItemId(null);
    setItemDetails(null);
  };

  if (itemDetails) {
    return (
      <ItemDetailPanel
        item={itemDetails}
        cart={cart}
        onBack={handleBack}
        onAddToCart={onAddToCart}
        setActivePage={setActivePage}
      />
    );
  }
  return (
    <div>
      <h2 className={styles.sectionHeading}>
        {effectiveCategory?.length > 0
          ? `${effectiveCategory.categoryName}: ${effectiveCategory.length} total items`
          : "No items available"}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          padding: "20px"
        }}
      >
        {pagedItems?.map((item) => (
          <MenuItemTile
            key={item.id}
            item={item}
            onClick={setSelectedItemId}
          />
        ))}
      </div>

      {effectiveCategory?.length > itemsPerPage && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
          <button
            disabled={startIndex + itemsPerPage >= effectiveCategory.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;