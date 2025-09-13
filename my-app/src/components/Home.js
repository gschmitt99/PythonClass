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
        <section className={styles.promoGrid}>
          <div className={styles.promoItem}>
            <h3>FRESH INGREDIENTS</h3>
            <p>All of our products are made with the finest quality ingredients and guaranteed fresh.</p>
          </div>
          <div className={styles.promoItem}>
            <h3>BAKED WITH LOVE</h3>
            <p>We are passionate about baking. Each of our handmade items are carefully baked with love.</p>
          </div>
          <div className={styles.promoItem}>
            <h3>OUR FAVORITE BAKERY PRODUCTS</h3>
            <p>Check some of our best products and feel the great passion for food.</p>
          </div>
        </section>

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
      </div>
    );
};

export default Content;
