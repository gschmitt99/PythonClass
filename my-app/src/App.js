import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Content from "./components/Content";
import Footer from "./components/Footer";

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
        // TODO: Implement email logic here
        alert("Order placed! (Implement email logic here)");
        setCart([]); // Clear the cart
        // TODO: may put in some kind of thank you page.
        // I have looked at this as a possible solution:
        // https://www.emailjs.com/pricing/
        // not sure what volume is going to be.
        setActivePage("Home");
    };

    return (
        <div>
            <Header />
            <Menu 
              setActivePage={setActivePage}
              setSelectedCategory={setSelectedCategory}
            />
            <div 
               style={{ position: "fixed", top: 10, right: 10, cursor: "pointer", color: "blue", textDecoration: "underline" }}
               onClick={() => setActivePage("Cart")}
            >
              🛒 Cart: {cart.length} item{cart.length !== 1 ? "s" : ""}
            </div>
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
            <Footer />
        </div>
    );
};

export default App;

