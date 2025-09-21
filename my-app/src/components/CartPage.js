import React from "react";

const CartPage = ({ cart, onUpdateCartItem, onDeleteCartItem, setActivePage }) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const taxRate = 0.0825; // 8.25% for Texas
  const taxAmount = Math.round((subtotal * taxRate) * 100) / 100;
  const totalWithTax = Math.round((subtotal + taxAmount) * 100) / 100;
  cart.tax = taxAmount;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", fontSize: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "2em",
              fontSize: "1rem",
              fontFamily: "Arial, sans-serif"
            }}
            border="1"
            cellPadding="6"
            cellSpacing="0"
          >
            <thead>
              <tr>
                <th>Item</th>
                <th>Variation</th>
                <th>Modifiers</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => {
                const basePrice = item.variation.price || 0;
                const quantity = item.quantity || 1;
                const modifiers = item.modifiers || [];
                const modTotal = modifiers.reduce((sum, mod) => sum + (mod.amount || 0), 0);
                const extendedPrice = (basePrice + modTotal) * quantity;

                return (
                  <tr key={idx}>
                    <td><strong>{item.item.name}</strong></td>
                    <td>{item.variation.name} (${(basePrice / 100).toFixed(2)})</td>
                    <td>
                      {modifiers.length > 0
                        ? modifiers.map((mod, i) => (
                            <span key={mod.pk || i}>
                              {mod.name}
                              {mod.amount ? ` ($${(mod.amount / 100).toFixed(2)})` : ""}
                              {i < modifiers.length - 1 ? ", " : ""}
                            </span>
                          ))
                        : "-"}
                    </td>
                    <td>
                      <input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={e => onUpdateCartItem(idx, parseInt(e.target.value, 10))}
                        style={{
                          width: "60px",
                          fontSize: "2rem",
                          padding: "4px 6px",
                          textAlign: "center",
                          borderRadius: "4px",
                          border: "1px solid #ccc"
                        }}
                      />
                    </td>
                    <td>${(extendedPrice / 100).toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => onDeleteCartItem(idx)}
                        style={{ fontSize: "2rem", padding: "2px 6px" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}

              {/* Summary rows */}
              <tr>
                <td colSpan="4" style={{ textAlign: "right", fontWeight: "bold" }}>Subtotal:</td>
                <td colSpan="2" style={{ textAlign: "right" }}>${subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="4" style={{ textAlign: "right", fontWeight: "bold" }}>Tax (8.25%):</td>
                <td colSpan="2" style={{ textAlign: "right" }}>${taxAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="4" style={{ textAlign: "right", fontWeight: "bold" }}>Total:</td>
                <td colSpan="2" style={{ textAlign: "right", fontWeight: "bold" }}>${totalWithTax.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <button
            style={{ marginTop: "2em", fontWeight: "bold", fontSize: "1.1em" }}
            onClick={() => setActivePage("Checkout")}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;