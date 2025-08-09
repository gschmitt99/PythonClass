const createSquareOrder = async (cart) => {
  const line_items = cart.map(entry => ({
    catalog_object_id: entry.variation_id,
    quantity: "1",
    note: entry.note || "",
    modifiers: entry.modifiers?.map(mod => ({
      catalog_object_id: mod.id
    })) || []
  }));

  const orderPayload = {
    order: {
      location_id: "YOUR_LOCATION_ID",
      line_items
    }
  };

  try {
    const response = await fetch("https://connect.squareup.com/v2/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Square-Version": "2024-06-12",
        "Authorization": `Bearer YOUR_SQUARE_ACCESS_TOKEN`
      },
      body: JSON.stringify(orderPayload)
    });

    const data = await response.json();
    console.log("Order response:", data);
    return data;
  } catch (error) {
    console.error("Error creating Square order:", error);
  }
};
