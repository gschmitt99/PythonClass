import React, { useState, useEffect } from "react";
import styles from "./CatalogStyles.module.css";
// note, at this time, ItemCard is not being used, but will keep it around for a bit.
//import ItemCard from "./ItemCard";
import MenuItemTile from "./MenuItemTile";
import ItemDetailPanel from "./ItemDetailPanel";
//import { getCategoryData, getItemData } from "../services/catalogAPI";
import { createCatalogDataSource } from "../services/DataSourceFactory";

const Shop = ({ selectedCategory }) => {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const dataSource = createCatalogDataSource("mock")

  useEffect(() => {
    if (!selectedItemId) return;

    console.log("getting item data");
    const fetchDetails = async () => {
      const details = await dataSource.getItemData(selectedItemId);
      setItemDetails(details);
    };

    fetchDetails();
  }, [selectedItemId]);

  const handleBack = () => {
    setSelectedItemId(null);
    setItemDetails(null);
  };

  if (itemDetails) {
    const item = itemDetails;
    return <ItemDetailPanel item={item} onBack={handleBack} />;
  }

  return (
    <div>
      <h2 className={styles.sectionHeading}>Items in {selectedCategory.length}</h2>
      <div className={styles.gridContainer}>
        {selectedCategory.map(({pk, name}) => {
          return (
            <MenuItemTile
              key={pk}
              itemId={pk}
              itemName={name}
              onClick={setSelectedItemId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
