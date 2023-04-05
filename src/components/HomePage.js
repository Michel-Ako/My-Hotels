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
    <div>
      <h1>Welcome to My Hotel Website!</h1>
      <h2>List of Hotels:</h2>
      {hotels.map((hotel) => (
        <div key={hotel.id}>
          <h3>{hotel.name}</h3>
          <p>{hotel.address}</p>
          <p>{hotel.rating} stars</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
