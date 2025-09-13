import React, { useState, useEffect } from "react";
import { createCatalogDataSource } from "../services/DataSourceFactory";
import ItemDetailPanel from "./ItemDetailPanel";
import MenuItemTile from "./MenuItemTile";
import styles from "./CatalogStyles.module.css";

const Content = ({ onAddToCart, cart, setActivePage }) => {
  const dataSource = createCatalogDataSource(process.env.REACT_APP_ENV);
  const [products, setProducts] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);

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
    const fetchMenuItems = async () => {
      const categories = await dataSource.getCategories();
      
      const random = Math.floor(Math.random() * categories.length);
      const selectedCategory = categories[random];

      console.log("Selected category:", selectedCategory.pk);

      const productList = await dataSource.getProductsByCategory(selectedCategory.pk);
      console.log("Products in selected category:", productList);
        // If you want to set state with these values, you can do so here

      setProducts(productList);
    };
    fetchMenuItems();
  }, []);

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
          {products?.length > 0
            ? `${products.length} items`
            : "No items available"}
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          padding: "20px"
        }}>
          {
          products.map((item) => (
            <MenuItemTile
              item={item}
              onClick={setSelectedItemId}
            />
          ))}
        </div>

        <div style={{ padding: "20px", textAlign: "center" }}>
            <p>This is the Home content area.</p>
        </div>
      </div>
    );
};

export default Content;
