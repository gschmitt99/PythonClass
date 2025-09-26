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
  const [categoryName, setCategoryName] = useState("");

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
      setCategoryName(selectedCategory.name);

      const productList = await dataSource.getProductsByCategory(selectedCategory.pk);
      console.log("Products in selected category:", productList);

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

        {/* Delivery Section */}
        <section className={styles.deliverySection}>
          <h2 style={{ textAlign: "center", marginTop: "40px" }}>Delivery</h2>
          <p style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 20px" }}>
            Craving our wings, burgers, or sweets? Get them delivered straight to your door.
          </p>
          <div style={{ textAlign: "center" }}>
            <a
              href="https://www.doordash.com/store/s'm-orr-sweets-&-cafe-stafford-29869948/38221949/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                backgroundColor: "#e60000",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "bold"
              }}
            >
              Order on DoorDash
            </a>
          </div>
        </section>

        <h2 className={styles.sectionHeading}>
          {products?.length > 0
            ? `${categoryName}: ${products.length} total items`
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
