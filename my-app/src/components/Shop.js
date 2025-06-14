import React, { useState, useEffect } from "react";

const Content = ({ activePage }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
      console.log("fetching data");
      fetch("http://phoenix2025:5000/data")
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error("Error fetching data:", error));
  }, [activePage]);

  return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <p>This is the shop content area.</p>
            {data ? <p>{data.message} (Value: {data.value})</p> : <p>Loading...</p>}
        </div>
  );
};

export default Content;
