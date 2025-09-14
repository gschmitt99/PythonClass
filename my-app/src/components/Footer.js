import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
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
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "8px" }}>
                <a
                  href="https://www.facebook.com/profile.php?id=61561442950345"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    color: "#1877F2",
                    textDecoration: "none",
                    fontSize: "18px",
                  }}
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  href="https://www.instagram.com/sm_orrsweets/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  color: "#c13584",
                  textDecoration: "none",
                  fontSize: "18px",
                  }}
                >
                  <i className="fab fa-instagram" />
                </a>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <div><strong>Working Hours</strong></div>
          <div>Mon–Sat 10am–7pm </div>
          <div>Sunday: Closed</div>
        </div>
      </footer>

      <div style={{
        backgroundColor: "#007BFF",
        color: "white",
        textAlign: "center",
        padding: "10px 20px",
        borderTop: "1px solid rgba(255,255,255,0.3)",
        fontSize: "0.85rem"
      }}>
        <p style={{ margin: 0 }}>
          Copyright © {currentYear} S’M-ORR Sweets &amp; Cafe. Made with ❤ by Schmittware Sotware.
        </p>
      </div>
    </>
  );
};

export default Footer;