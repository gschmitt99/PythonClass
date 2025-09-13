import React, { useState } from "react";
import { postContactMessageToBackend } from "../services/paymentAPI";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    humanCheck: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answer = e.target.humanCheck.value.trim();
    if (answer !== "7") {
      alert("Please verify you're human.");
      return;
    }
    try {
      const result = await postContactMessageToBackend(formData);
      if (result && result.status === "success") {
        alert("Message sent!  Thank you for your message, we will respond to you within 24 hours.");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
          humanCheck: "",
        });
      } else {
        console.error("Server responded with error:", result.message);
        alert("unexpected response from the server.  Server error:"  + (result.message || "unknown error"));
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="contact-container">
      {/* Left: Contact Form */}
      <div className="contact-form-section">
        <h2>Leave Us a Message</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="firstName" value={formData.firstName} placeholder="First Name" onChange={handleChange} required />
          <input type="text" name="lastName" value={formData.lastName} placeholder="Last Name" onChange={handleChange} required />
          <input type="tel" name="phone" value={formData.phone} placeholder="Phone" onChange={handleChange} />
          <input type="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} required />
          <input type="text" name="subject" value={formData.subject} placeholder="Subject" onChange={handleChange} />
          <textarea name="message" value={formData.message} placeholder="Your Message" rows="5" required onChange={handleChange} />
          <label htmlFor="humanCheck">What is 3 + 4?</label>
          <input type="text" name="humanCheck" value={formData.humanCheck} placeholder="Your answer" onChange={handleChange} required />
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </div>

      {/* Right: Direct Contact Info */}
      <div className="contact-info-section">
        <h2>Or Contact Us Directly</h2>
        <p>
          At S’M-ORR Sweets & Cafe, we’re passionate about bringing warmth and sweetness to every interaction,
          whether it’s through our desserts, coffee, or friendly service. Our team is here to make your experience
          special, and we love hearing from our customers! Whether you have a question about our menu, want to
          share feedback, or need help with an order, please don’t hesitate to reach out. Every message is important
          to us, and we’re dedicated to ensuring that your time with us is as delightful as our treats.
        </p>
        <p>
          You can contact us via the form below, call us directly, or visit us in person for a cozy conversation over
          a cup of coffee. Follow us on social media to stay updated on our latest offerings, seasonal sweets, and special
          events. We’re excited to connect with you and bring a little more sweetness to your day at S’m-ORR Sweets & Cafe!  
        </p>
        <ul>
          <li><strong>Phone:</strong>(832) 908-2091</li>
          <li><strong>Address:</strong>1250 Texas Pkwy Ste E, Stafford TX 77477</li>
          <li><strong>Email:</strong>inquiries@smorrsweets.com</li>
        </ul>
        <div className="social-icons">
          <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;