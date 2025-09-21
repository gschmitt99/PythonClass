import React, { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Content from "./components/Content";
import Footer from "./components/Footer";
import GoogleMapSection from "./components/GoogleMapSection";

const App = () => {
    console.log("App component rendered: env= ", process.env.REACT_APP_ENV);
    const [activePage, setActivePage] = useState("Home");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [cart, setCart] = useState([]);

    const handleAddToCart = (cartItem) => {
        setCart((prevCart) => [...prevCart, cartItem]);
    };

    const handleUpdateCartItem = (idx, newQuantity) => {
        setCart(cart =>
            cart.map((item, i) =>
                i === idx ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleDeleteCartItem = (idx) => {
        setCart(cart => cart.filter((_, i) => i !== idx));
    };

    const handlePlaceOrder = (orderData) => {
        alert("Thank you, your order has been placed!  You will receive an email confirmation shortly.");
        setCart([]);
        setActivePage("Home");
    };

    return (
        <div class="big-class">
            <Header
              cart={cart}
              setActivePage={setActivePage}
            />
            <Menu
              activePage={activePage}
              setActivePage={setActivePage}
              setSelectedCategory={setSelectedCategory}
            />
            <Content 
              onAddToCart={handleAddToCart}
              cart={cart}
              activePage={activePage}
              selectedCategory={selectedCategory}
              onUpdateCartItem={handleUpdateCartItem}
              onDeleteCartItem={handleDeleteCartItem}
              onPlaceOrder={handlePlaceOrder}
              setActivePage={setActivePage}
            />
            <GoogleMapSection />
            <Footer />
        </div>
    );
};

export default App;

