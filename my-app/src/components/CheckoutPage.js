import React, { useState } from "react";
import SquarePaymentForm from "./SquarePaymentForm";
import { postPaymentToBackend } from "../services/paymentAPI";

const CheckoutPage = ({ cart, onPlaceOrder }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    street: "",
    apt: "",
    city: "",
    state: "TX",
    zip: "",
    phone: "",
    email: "",
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Checkout</h2>
      <form>
        <div>
          <label>
            First Name*<br />
            <input name="firstName" value={form.firstName} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Last Name*<br />
            <input name="lastName" value={form.lastName} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Company Name<br />
            <input name="company" value={form.company} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Street Address*<br />
            <input name="street" value={form.street} onChange={handleChange} required placeholder="House number and street name" />
          </label>
        </div>
        <div>
          <label>
            Apartment, suite, unit, etc (optional)<br />
            <input name="apt" value={form.apt} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Town/City*<br />
            <input name="city" value={form.city} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            State*<br />
            <select name="state" value={form.state} onChange={handleChange} required>
              <option value="TX">Texas</option>
              {/* Add more states if needed */}
            </select>
          </label>
        </div>
        <div>
          <label>
            Zip Code*<br />
            <input name="zip" value={form.zip} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Phone*<br />
            <input name="phone" value={form.phone} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Email*<br />
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
        </div>
        <hr />
        <h3>Your Order</h3>
        <ul>
          {cart.map((item, idx) => (
            <li key={idx}>
              <strong>{item.item.name}</strong> — {item.variation.name}
              {item.modifiers.length > 0 && (
                <span>
                  {" "}with {item.modifiers.map(mod => mod.name).join(", ")}
                </span>
              )}
              {" "}x {item.quantity || 1} = ${(item.price * (item.quantity || 1)).toFixed(2)}
              {item.notes && (
                <div>
                  <em>Notes:</em> {item.notes}
                </div>
              )}
            </li>
          ))}
        </ul>
        <div style={{ fontWeight: "bold" }}>
          Total: $
          {cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0).toFixed(2)}
        </div>
        <div style={{ margin: "1em 0" }}>
          <strong>Shipping:</strong> Local Pickup
        </div>
      </form>
      {}
      4111 1111 1111 1111
      <SquarePaymentForm onNonce={(nonce) => postPaymentToBackend(nonce, cart, form, onPlaceOrder)} />
    </div>
  );
};

export default CheckoutPage;