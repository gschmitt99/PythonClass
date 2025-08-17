// This is the only payment api
// const BASE_URL = "https://phoenix2025:5000";
const BASE_URL = "http://localhost:5000";

export const postPaymentToBackend = async (nonce, cart, form, onPlaceOrder) => {
  const url = `${BASE_URL}/process-payment`;
  console.log("Posting payment to backend:", { url, nonce, cart, form });
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nonce,
      order: {
        cart,
        customer: form,
      }
    })
  });
  const result = await response.json();
  if (result.success) {
    onPlaceOrder();
  } else {
    alert("Payment failed: " + (result.error || "Unknown error"));
  }
};
