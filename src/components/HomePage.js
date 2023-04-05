import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/hotels").then((response) => {
      setHotels(response.data);
    });
  }, []);

  return (
    <div className="Title">
      <h1>Welcome to My Hotel Website!</h1>
    </div>
  );
}

export default Home;
