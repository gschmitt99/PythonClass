import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";

const Header = ({ setActivePage, cart }) => {
    return (
    <header
      style={{
        backgroundColor: "#007BFF",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        zIndex: 1000,
      }}
    >
      {/* Left Section */}
      <div style={{ display: "flex", gap: "30px" }}>
        <FaMapMarkerAlt />
        <div>1250 Texas Pkwy Ste E, Stafford, TX 77477</div>
        <FaPhoneAlt />
        <div>(832) 908-2091</div>
        <FaClock />
        <div>Mon–Sat 10am–7pm | Closed Sunday</div>
      </div>

      {/* Right Section */}
      <div
        style={{
          cursor: "pointer",
          color: "white",
          textDecoration: "underline",
        }}
        onClick={() => setActivePage("Cart")}
      >
    🛒 Cart: {cart.length} item{cart.length !== 1 ? "s" : ""}
      </div>
    </header>
    );
};

export default Header;
