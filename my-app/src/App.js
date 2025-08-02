import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Content from "./components/Content";
import Footer from "./components/Footer";

const App = () => {
    const [activePage, setActivePage] = useState("Home");
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <div>
            <Header />
            <Menu 
              setActivePage={setActivePage}
              setSelectedCategory={setSelectedCategory}
            />
            <Content 
              activePage={activePage}
              selectedCategory={selectedCategory}
            />
            <Footer />
        </div>
    );
};

export default App;
