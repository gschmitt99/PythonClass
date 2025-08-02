import React, { useState } from "react";

import Home from "./Home";
import Shop from "./Shop";
import Contact from "./Contact";
import AboutUs from "./AboutUs";

const Content = ({ activePage, selectedCategory }) => {
  return (
    <div>
      {activePage === "Home" && <h1><Home /></h1>}
      {activePage === "About" && <h1><AboutUs /></h1>}
      {activePage === "Shop" && <h1><Shop selectedCategory={selectedCategory}/></h1>}
      {activePage === "Contact" && <h1><Contact /></h1>}
    </div>
  );
};

export default Content;
