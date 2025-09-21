// This is the only payment api
// const BASE_URL = "https://phoenix2025:5000";
// const BASE_URL = "http://localhost:5000";
// const BASE_URL = "http://129.212.188.155:5000";
const BASE_URL = "https://beta.smorrsweets.com/api";

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

export async function postContactMessageToBackend(formData) {
  try {
    const url = `${BASE_URL}/contact`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${errorText}`);
    }

    return result;
  } catch (error) {
    console.error("Backend contact error:", error);
    throw error;
  }
}
