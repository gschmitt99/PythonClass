import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";

const Footer = () => {
    return (
    <footer
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
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <FaMapMarkerAlt />
          <span>1250 Texas Pkwy Ste E, Stafford, TX 77477</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <FaPhoneAlt />
          <span>(832) 908-2091</span>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <p>
          Friendly Cafe, with sweets, wings, fries, Phillies — All home-style cooking with food *you*.
        </p>

        <div><strong>Follow us on:</strong></div>
        <div>
          <a href="https://facebook.com" style={{ color: "white", marginRight: "10px" }}>Facebook</a>
          <a href="https://twitter.com" style={{ color: "white", marginRight: "10px" }}>Twitter</a>
          <a href="https://instagram.com" style={{ color: "white" }}>Instagram</a>
        </div>
      </div>

      {/* Right Section */}
      <div>
        <div><strong>Working Hours</strong></div>
        <div>Mon–Sat 10am–7pm </div>
        <div>Sunday: Closed</div>
      </div>

    </footer>
    );
};

export default Footer;
