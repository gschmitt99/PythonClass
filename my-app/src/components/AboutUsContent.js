import React from "react";

const AboutUsContent = () => {
    return (
        <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
            <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "10px" }}>ABOUT US</h1>
            <h3 style={{ textAlign: "center", fontWeight: "normal", color: "#555", marginBottom: "40px" }}>
                Take a look at our bakery and discover how we work.
            </h3>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "center" }}>
                <div style={{ flex: "1 1 500px", fontSize: "1.1rem", lineHeight: "1.6", color: "#333" }}>
                    <p>
                        Founded in 1989, SM-ORR Sweets, formerly known as blissful creations, has built a reputation for 
                        delivering high-quality baked goods across Houston neighborhoods. As a family-owned business serving
                        the Houston community for over 35 years, we blend elegance with taste in every creation.
                    </p>
                    <p>
                        At S’M-ORR Sweets, we deliver southern treats with an elegant twist. By baking 
                        from scratch and providing each guest with a piece of paradise, everyone leaves our bakery with a smile.
                        Often times our products don't leave the parking lot in our bag, but rather our customer's stomachs!
                        We enjoy bringing our community together with our mouth-watering Texas treats. We offer wings, phillies, burgers,
                        ice cream, coffee and more.
                    </p>
                    <p>
                        From muffins and pies to burgers, ice cream, and coffee, our menu is crafted to satisfy
                        every craving.  Whether you're stopping by for a quick treat or planning a celebration, we bring
                        the comfort of flavor to your table.
                    </p>
                </div>

                <div style={{ flex: "1 1 400px", textAlign: "center" }}>
                    <img
                        src="/path-to-your-image.jpg"
                        alt="Baker placing bread in oven"
                        style={{ width: "100%", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    />
                </div>
            </div>

            <blockquote style={{
                marginTop: "60px",
                fontStyle: "italic",
                fontSize: "1.3rem",
                textAlign: "center",
                color: "#7a4e2d"
            }}>
                “From savory delights to indulgent treats, our creations bring the comfort of flavor to your table.”
            </blockquote>
        </div>
    );
};

export default AboutUsContent;