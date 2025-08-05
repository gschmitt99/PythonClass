import React, { useEffect, useRef } from "react";

// this is the prod side
// const applicationId = "sq0idp-hS_mnV5vahBjmL9cwR-gLQ";
const applicationId = "sandbox-sq0idb-34agaTq2iqI355F57dbxKw";
const locationId = "LE6EZZN9R77KP";

const SquarePaymentForm = ({ onNonce }) => {
  const cardRef = useRef(null);
  const paymentsRef = useRef(null);
  const cardInstanceRef = useRef(null);

  useEffect(() => {
    let payments;
    let card;
    let destroyed = false;

    async function initializeSquare() {
      if (!window.Square) return;
      payments = window.Square.payments(applicationId, locationId);
      paymentsRef.current = payments;
      card = await payments.card();
      cardInstanceRef.current = card;
      if (cardRef.current?.children.length === 0 && !destroyed) {
        await card.attach(cardRef.current);
      }
    }

    initializeSquare();

    return () => {
      destroyed = true;
    };
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!cardInstanceRef.current) return;
    const result = await cardInstanceRef.current.tokenize();
    if (result.status === "OK") {
      onNonce(result.token); // send nonce to parent or backend
    } else {
      alert("Card details are invalid or incomplete.");
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <div ref={cardRef} style={{ marginBottom: "1em" }} />
      <button type="submit">Pay</button>
    </form>
  );
};

export default SquarePaymentForm;