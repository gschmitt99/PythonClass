import React, { useState, useEffect } from "react";
import styles from "./CatalogStyles.module.css";
import MenuItemTile from "./MenuItemTile";
import ItemDetailPanel from "./ItemDetailPanel";
import { createCatalogDataSource } from "../services/DataSourceFactory";

const Shop = ({ selectedCategory, onAddToCart, cart, setActivePage }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  
  const itemsPerPage = 9;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pagedItems = selectedCategory?.slice(startIndex, startIndex + itemsPerPage);

  const dataSource = createCatalogDataSource(process.env.REACT_APP_ENV);

  // Fetch item details when an item is selected
  useEffect(() => {
    if (!selectedItemId) return;

    const fetchDetails = async () => {
      const details = await dataSource.getItemData(selectedItemId);
      setItemDetails(details);
    };

    fetchDetails();
  }, [selectedItemId]);

  useEffect(() => {
    setSelectedItemId(null);
    setItemDetails(null);
    setCurrentPage(1);
  }, [selectedCategory]);

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
        {selectedCategory?.length > 0
          ? `${selectedCategory.length} items`
          : "No items available"}
      </h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        padding: "20px"
      }}>
        {
        pagedItems.map((item) => (
          <MenuItemTile
            item={item}
            onClick={setSelectedItemId}
          />
        ))}
</div>


      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
        <button
          disabled={startIndex + itemsPerPage >= selectedCategory.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Shop;