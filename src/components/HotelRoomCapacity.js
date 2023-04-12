import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from './Navbar';
import '../App.css';

function HotelRoomCapacity() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [roomCapacity, setRoomCapacity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/hotel/");
      console.log(response.data)
      setHotels(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setIsLoading(false);
    }
  };

  const fetchRoomCapacity = async (hotelId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/hotel/hotelRoomCapacity/${hotelId}/`
      );
      console.log(response)
      setRoomCapacity(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching room capacity:", error);
      setIsLoading(false);
    }
  };

  const handleHotelChange = (event) => {
    const hotelId = event.target.value;
    setSelectedHotel(hotelId);
    fetchRoomCapacity(hotelId);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="title">Hotel Room Capacity</h2>
        <select
          className="hotel-select"
          value={selectedHotel}
          onChange={handleHotelChange}
        >
          <option value="">Select a hotel</option>
          {hotels.map((hotel) => (
            <option key={hotel.idHotel} value={hotel.idHotel}>
              {hotel.nomHotel}
            </option>
          ))}
        </select>
        {isLoading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : roomCapacity ? (
          <div>
            <h3>{roomCapacity.nomHotel}</h3>
            <p>Total room capacity: {roomCapacity.total_capacity}</p>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default HotelRoomCapacity;
