import React from "react";

const AboutUsServices = () => {
    const serviceData = [
        {
            title: "Bakery",
            icon: "🍞",
            description:
                "Choose from a rich variety of cookies, pastries, and cakes."
        },
        {
            title: "Cakes",
            icon: "🎂",
            description:
                "We specialize in custom cakes for all occasions. Choose from a variety of designs to create the perfect cake for you."
        },
        {
            title: "Catering",
            icon: "🧁",
            description:
                "We do catering from weddings to business functions. Our authentic food can be delivered or served for you."
        }
    ];

    return (
        <div style={{ padding: "60px 20px", backgroundColor: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "40px" }}>
                {serviceData.map((service, index) => (
                    <div
                        key={index}
                        style={{
                            flex: "1 1 300px",
                            textAlign: "center",
                            padding: "20px",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                        }}
                    >
                        <div style={{ fontSize: "3rem", marginBottom: "10px" }}>{service.icon}</div>
                        <h2 style={{ marginBottom: "10px", fontSize: "1.5rem" }}>{service.title}</h2>
                        <p style={{ color: "#555", fontSize: "1rem", lineHeight: "1.6" }}>{service.description}</p>
                    </div>
                ))}
            </div>

            <div
                style={{
                    marginTop: "60px",
                    backgroundColor: "#000",
                    color: "#fff",
                    padding: "40px 20px",
                    textAlign: "center",
                    borderRadius: "8px"
                }}
            >
                <h2 style={{ fontSize: "1.8rem", marginBottom: "20px", color: "#FFA500" }}>
                    DISCOVER OUR FIRST-CLASS PRODUCTS BAKED FOR YOU WITH LOVE!
                </h2>
                <button
                    style={{
                        padding: "12px 24px",
                        fontSize: "1rem",
                        backgroundColor: "#FFA500",
                        color: "#000",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                      VIEW PRODUCTS
                </button>
            </div>
        </div>
    );
};

export default AboutUsServices;