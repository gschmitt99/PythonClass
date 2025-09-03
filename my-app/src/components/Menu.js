import React, { useState, useEffect } from "react";
//import { getCategories, getCategoryData } from "../services/catalogAPI";
import { createCatalogDataSource } from "../services/DataSourceFactory";

const Menu = ({ setActivePage, setSelectedCategory }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  // TODO: make this look like this:
  // const dataSource = createCatalogDataSource(process.env.REACT_APP_ENV);
  const dataSource = createCatalogDataSource("mock")

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setActivePage("Shop"); // Still route to Shop view if needed
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      const details = await dataSource.getCategories();
      setMenuItems(details);
    };

    fetchMenuItems();
  }, []);

  const handleItemClick = async(categoryId) => {
    const details = await dataSource.getCategoryData(categoryId);
    setActivePage("Shop");
    setSelectedCategory(details);
  };

  return (
    <nav>
      <button onClick={() => setActivePage("Home")}>Home</button>
      <button onClick={() => setActivePage("About")}>About</button>
      <div
        style={{ position: "relative", display: "inline-block" }}
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <button onClick={() => setActivePage("Menu")}>Shop</button>
        {showDropdown && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              padding: "8px",
              margin: 0,
              listStyleType: "none",
              zIndex: 1,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              minWidth: "160px"
            }}
          >
            {menuItems.map(({ pk, name }) => {
              return (
                <li
                  style={{ padding: "6px 12px", cursor: "pointer" }}
                  onClick={() => handleItemClick(pk)}
                >
                  {name}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <button onClick={() => setActivePage("Contact")}>Contact</button>
    </nav>
  );
};

export default Menu;
