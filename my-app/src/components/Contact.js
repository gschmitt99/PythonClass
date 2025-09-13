import React from "react";
import "./Contact.css"; // Optional: for styling

const Contact = () => {
  return (
    <div className="contact-container">
      {/* Left: Contact Form */}
      <div className="contact-form-section">
        <h2>Leave Us a Message</h2>
        <form className="contact-form">
          <input type="text" name="firstName" placeholder="First Name" required />
          <input type="text" name="lastName" placeholder="Last Name" required />
          <input type="tel" name="phone" placeholder="Phone" />
          <input type="email" name="email" placeholder="Email" required />
          <input type="text" name="subject" placeholder="Subject" />
          <textarea name="message" placeholder="Your Message" rows="5" required />
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </div>

      {/* Right: Direct Contact Info */}
      <div className="contact-info-section">
        <h2>Or Contact Us Directly</h2>
        <p>
          At S’m-ORR Sweets & Cafe, we’re passionate about bringing warmth and sweetness to every interaction,
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
          <li><strong>Phone:</strong> (832) 906-2919</li>
          <li><strong>Address:</strong> 12503 Texas Pkwy Ste E, Stafford TX 77477</li>
          <li><strong>Email:</strong> inquiries@yourdomain.com</li>
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