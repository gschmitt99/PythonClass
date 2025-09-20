import React from "react";

const CartPage = ({ cart, onUpdateCartItem, onDeleteCartItem, setActivePage }) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const taxRate = 0.0825; // 8.25% for Texas
  const taxAmount = Math.round((subtotal * taxRate) * 100) / 100;
  const totalWithTax = Math.round((subtotal + taxAmount) * 100) / 100;
  cart.tax = taxAmount;
  return (
  <div>
    <h2>Your Shopping Cart</h2>
    {cart.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <>
        <ul>
          {cart.map((item, idx) => (
            <li key={idx} style={{ marginBottom: "1em" }}>
              <strong>{item.item.name}</strong>
              <br />
              <span>
                <em>Variation:</em> {item.variation.name}
                {item.variation.price && (
                  <> (${(item.variation.price / 100).toFixed(2)})</>
                )}
              </span>
              <br />
              {item.modifiers.length > 0 && (
                <span>
                  <em>Modifiers:</em>{" "}
                  {item.modifiers.map((mod, i) => (
                    <span key={mod.pk || i}>
                      {mod.name}
                      {mod.amount ? ` ($${(mod.amount / 100).toFixed(2)})` : ""}
                      {i < item.modifiers.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </span>
              )}
              {item.notes && (
                <div>
                  <em>Notes to Kitchen:</em> {item.notes}
                </div>
              )}
              <br />
              Quantity:{" "}
              <input
                type="number"
                min={1}
                value={item.quantity || 1}
                onChange={e => onUpdateCartItem(idx, parseInt(e.target.value, 10))}
                style={{ width: "50px" }}
              />
              <button onClick={() => onDeleteCartItem(idx)} style={{ marginLeft: "10px" }}>
                Delete
              </button>
              <br />
              <span>
                Price: ${item.price} x {item.quantity || 1} = ${(item.price * (item.quantity || 1)).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: "2em", fontWeight: "bold" }}>
          <table style={{ width: "100%", maxWidth: "400px", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ textAlign: "left", padding: "0.5em 0" }}>Subtotal:</td>
                <td style={{ textAlign: "right", padding: "0.5em 0" }}>${(subtotal).toFixed(2)}</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left", padding: "0.5em 0" }}>Tax (8.25%):</td>
                <td style={{ textAlign: "right", padding: "0.5em 0" }}>${(taxAmount).toFixed(2)}</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left", padding: "0.5em 0", fontWeight: "bold" }}>Total:</td>
                <td style={{ textAlign: "right", padding: "0.5em 0", fontWeight: "bold" }}>${(totalWithTax).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
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