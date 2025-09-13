import React, { useState, useEffect } from "react";
import { createCatalogDataSource } from "../services/DataSourceFactory";

const Menu = ({ activePage, setActivePage, setSelectedCategory }) => {
  const dataSource = createCatalogDataSource(process.env.REACT_APP_ENV);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const isMenuActive = activePage === "Menu" || menuItems.some(item => item.name === activePage);

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
    const details = await dataSource.getProductsByCategory(categoryId);
    setActivePage("Shop");
    setSelectedCategory(details);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div className="nav-wrapper">
      <nav className="navbar">
        <div className="logo-anchor">
          <div className="logo-container">
            <img src="/imagery/Sm-orr-Sweets-Logo-v2.png"
              sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 1342px, 100vw"
            />
          </div>
        </div>

        <div className="nav-left">
          <span
            className={activePage === "Home" ? "active" : ""}
            onClick={() => setActivePage("Home")}
          >
            Home
          </span>
          <span
            className={activePage === "About" ? "active" : ""}
            onClick={() => setActivePage("About")}
          >
            About Us
          </span>
        </div>

        <div className="nav-right">
          <div
            className="dropdown-wrapper"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >

            <span
              className={`dropdown-trigger ${isMenuActive ? "active" : ""}`}
              onClick={() => setActivePage("Menu")}
            >
              Shop <span className="dropdown-arrow">▼</span>
            </span>
            {showDropdown && (
              <ul className="dropdown-menu">
                {menuItems.map(({ pk, name }) => (
                  <li key={pk} onClick={() => handleItemClick(pk)}>
                    {name}
                    </li>
                  ))}
                </ul>
              )}
          </div>
            <span className={activePage === "Contact" ? "active" : ""}
            onClick={() => setActivePage("Contact")}
          >
            Contact
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
