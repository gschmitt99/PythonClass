import React, { useState } from "react";

import Home from "./Home";
import Shop from "./Shop";
import Contact from "./Contact";
import AboutUs from "./AboutUs";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";

const Content = ({
  activePage,
  selectedCategory,
  cart,
  onAddToCart,
  onUpdateCartItem,
  onDeleteCartItem,
  setActivePage,
  onPlaceOrder
}) => {
  return (
    <div>
      {activePage === "Home" && <h1><Home /></h1>}
      {activePage === "About" && <h1><AboutUs /></h1>}
      {activePage === "Shop" && 
        <h1>
          <Shop 
            selectedCategory={selectedCategory}
            onAddToCart={onAddToCart}
            cart={cart}
          />
        </h1>
      }
      {activePage === "Contact" && <h1><Contact /></h1>}
      {activePage === "Cart" && (
        <h1>
          <CartPage
            cart={cart}
            onUpdateCartItem={onUpdateCartItem}
            onDeleteCartItem={onDeleteCartItem}
            setActivePage={setActivePage}
          />
        </h1>
      )}
      {activePage === "Checkout" && (
        <h1>
          <CheckoutPage
            cart={cart}
            onPlaceOrder={onPlaceOrder} // Use the prop from App.js
          />
        </h1>
      )}
    </div>
  );
};

export default Content;
