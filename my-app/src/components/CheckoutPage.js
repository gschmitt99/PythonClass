import React, { useState } from "react";
import SquarePaymentForm from "./SquarePaymentForm";
import { postPaymentToBackend } from "../services/paymentAPI";
import styles from "./ErrorStyles.module.css";

const CheckoutPage = ({ cart, onPlaceOrder }) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const checkoutCart = {
    items: cart.map((entry) => ({
      variation_pk: entry.variation.pk,
      modifiers: entry.modifiers || [],
      price: Math.round(parseFloat(entry.price || 0) * 100),
      quantity: String(entry.quantity || 1),
      note: entry.note || ""
    })),
    tax: Math.round(parseFloat(cart.tax || 0) * 100)
  };
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

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateCart = async (nonce, cart, form, onPlaceOrder) => {
    // actually validate and send the cart.
    const requiredFields = ["firstName", "lastName", "city", "state", "zip", "phone", "email"];
    let newErrors = {};

    requiredFields.forEach(field => {
      const error = validateField(field, form[field] || "");
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear errors if valid
    postPaymentToBackend(nonce, cart, form, onPlaceOrder);
  };

  const validateField = (name, value) => {
    const trimmed = value.trim();
    if (!trimmed) return "This field is required.";

    const validators = {
      email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address."
      },
      phone: {
        regex: /^\d{10}$/,
        message: "Phone number must be exactly 10 digits."
      },
      zip: {
        regex: /^\d{5}$/,
        message: "Zip code must be exactly 5 digits."
      }
    };

    if (validators[name]) {
      if (!validators[name].regex.test(trimmed)) {
        return validators[name].message;
      }
    }

    return "";
};

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", fontSize: "1rem", lineHeight: "1.2" }}>
      <h2>Checkout</h2>
      <form>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem"
          }}
        >
          <div>
            <label>
              First Name*<br />
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.firstName ? styles.inputError : ""}
                required
              />
              {errors.firstName && <div className={styles.errorMessage}>{errors.firstName}</div>}
            </label>
          </div>
          <div>
            <label>
              Last Name*<br />
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.lastName ? styles.inputError : ""}
                required
              />
              {errors.lastName && <div className={styles.errorMessage}>{errors.lastName}</div>}
            </label>
          </div>
          <div>
            <label>
              Company Name (optional)<br />
              <input name="company" value={form.company} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Street Address*<br />
              <input
                name="street"
                value={form.street}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.street ? styles.inputError : ""}
                required
                placeholder="House number and street name"
              />
              {errors.street && <div className={styles.errorMessage}>{errors.street}</div>}
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
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.city ? styles.inputError : ""}
                required
              />
              {errors.city && <div className={styles.errorMessage}>{errors.city}</div>}
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
              <input
                name="zip"
                value={form.zip}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.zip ? styles.inputError : ""}
                required
              />
              {errors.zip && <div className={styles.errorMessage}>{errors.zip}</div>}
            </label>
          </div>
          <div>
            <label>
              Phone*<br />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.phone ? styles.inputError : ""}
                required
              />
              {errors.phone && <div className={styles.errorMessage}>{errors.phone}</div>}
            </label>
          </div>
          <div>
            <label>
              Email*<br />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email ? styles.inputError : ""}
                required
              />
              {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
            </label>
          </div>
        </div>
        <hr />
        <h3>Your Order</h3>
        <table style={{ borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif' }} border="1" cellPadding="6" cellSpacing="0">
          <thead>
            <tr>
              <th>Item</th>
              <th>Variation</th>
              <th>Modifier</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => {
              const basePrice = item.price || 0;
              const quantity = item.quantity || 1;
              const modifiers = item.modifiers || [];
              const modifierTotal = modifiers.reduce((sum, mod) => sum + (mod.price || 0), 0);
              const subtotal = (basePrice + modifierTotal) * quantity;

              return (
                <React.Fragment key={idx}>
                  <tr>
                    <td>{item.item.name}</td>
                    <td>{item.variation.name}</td>
                    <td>-</td>
                    <td>${(basePrice)}</td>
                  </tr>
                  {modifiers.map((mod, mIdx) => (
                    <tr key={`mod-${idx}-${mIdx}`}>
                      <td></td>
                      <td></td>
                      <td>{mod.name}</td>
                      <td>${(mod.price)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td><strong>Subtotal</strong></td>
                    <td><strong>${(subtotal)}</strong></td>
                  </tr>
                </React.Fragment>
              );
            })}

            {/* Tax and total rows */}
            <tr>
              <td></td>
              <td></td>
              <td><strong>Tax (8.25%)</strong></td>
              <td>
                <strong>
                  ${((cart.reduce((sum, item) => {
                    const base = item.price || 0;
                    const mods = item.modifiers || [];
                    const modTotal = mods.reduce((s, m) => s + (m.price || 0), 0);
                    return sum + (base + modTotal) * (item.quantity || 1);
                  }, 0) * 0.0825)).toFixed(2)}
                </strong>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td><strong>Total</strong></td>
              <td>
                <strong>
                  ${((cart.reduce((sum, item) => {
                    const base = item.price || 0;
                    const mods = item.modifiers || [];
                    const modTotal = mods.reduce((s, m) => s + (m.price || 0), 0);
                    return sum + (base + modTotal) * (item.quantity || 1);
                  }, 0) * 1.0825)).toFixed(2)}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: "2em", fontWeight: "bold" }}>
          <table style={{ width: "100%", maxWidth: "400px", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ textAlign: "left", padding: "0.5em 0" }}>Subtotal:</td>
                <td style={{ textAlign: "right", padding: "0.5em 0" }}>${(subtotal).toFixed(2)}</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left", padding: "0.5em 0" }}>Tax (8.25%):</td>
                <td style={{ textAlign: "right", padding: "0.5em 0" }}>${(cart.tax).toFixed(2)}</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left", padding: "0.5em 0", fontWeight: "bold" }}>Total:</td>
                <td style={{ textAlign: "right", padding: "0.5em 0", fontWeight: "bold" }}>${(Math.round((subtotal + cart.tax)*100)/100).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ margin: "1em 0" }}>
          <strong>Shipping:</strong> Local Pickup
        </div>
      </form>
      {}
      <SquarePaymentForm onNonce={(nonce) => validateCart(nonce, checkoutCart, form, onPlaceOrder)} />
    </div>
  );
};

export default CheckoutPage;