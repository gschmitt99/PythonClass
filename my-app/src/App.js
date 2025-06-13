import React, { useState } from "react";
import Header from "./components/Header";
//import Content from "./components/Content";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Shop from "./components/Shop";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const Menu = ({ setActivePage }) => {
  return (
    <nav>
      <button onClick={() => setActivePage("Home")}>Home</button>
      <button onClick={() => setActivePage("About")}>About</button>
      <button onClick={() => setActivePage("Shop")}>Shop</button>
      <button onClick={() => setActivePage("Contact")}>Contact</button>
    </nav>
  );
};

const Content = ({ activePage }) => {
  return (
    <div>
      {activePage === "Home" && <h1><Home /></h1>}
      {activePage === "About" && <h1><AboutUs /></h1>}
      {activePage === "Shop" && <h1><Shop /></h1>}
      {activePage === "Contact" && <h1><Contact /></h1>}
    </div>
  );
};

const App = () => {
    const [activePage, setActivePage] = useState("Home");

    return (
        <div>
            <Header />
            <Menu setActivePage={setActivePage} />
            <Content activePage={activePage} />
            <Content />
            <Footer />
        </div>
    );
};

export default App;
