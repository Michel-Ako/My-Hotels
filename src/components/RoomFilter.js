import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomFilter = ({ onChange }) => {
  const [filters, setFilters] = useState({
    chain: '',
    hotel: '',
    startDate: '',
    endDate: '',
    capacity: '',
    size: '',
    totalRooms: '',
    price: '',
  });

  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedChain, setSelectedChain] = useState('');
  const [chains, setChains] = useState([]);
  const [roomPrices, setRoomPrices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/chain/')
      .then(response => {
        console.log(response.data);
        setChains(response.data);
      })
      .catch(error => console.log(error));
    axios.get('http://localhost:8080/api/hotel/')
      .then(response => {
        console.log(response.data);
        setHotels(response.data);
      })
      .catch(error => console.log(error));
    const fetchHotels = async () => {
      const response = await axios.get('http://localhost:8080/api/hotel/');
      setHotels(response.data);
    };

    const fetchRooms = async () => {
      const response = await axios.get('http://localhost:8080/api/room/');
      setRooms(response.data);
    };

    fetchHotels();
    fetchRooms();
  }, []);

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleChainChange = (e) => {
    const { value } = e.target;
    setSelectedChain(value);
    setFilters({ ...filters, chain: value, hotel: '' });
  };

  useEffect(() => {
    onChange(filters);
  }, [filters]);

  const filteredHotels = selectedChain
    ? hotels.filter(hotel => hotel.chaineHoteliere.nomChaine === selectedChain)
    : hotels;

  const uniqueCapacityOptions = Array.from(new Set(rooms.map(room => room.capacite))).sort((a, b) => a - b);
  const uniqueSizeOptions = Array.from(new Set(rooms.map(room => room.superficie))).sort((a, b) => a - b);
  const uniqueTotalRoomsOptions = Array.from(new Set(hotels.map(hotel => hotel.totalRooms))).sort((a, b) => a - b);
  const uniquePriceOptions = Array.from(new Set(rooms.map(room => room.prixParNuit))).sort((a, b) => a - b);

  return (
    <form className="room-filter">
      <div className="form-group">
        <label htmlFor="chain">Chain</label>
        <select
          id="chain"
          name="chain"
          className="form-control"
          value={selectedChain}
          onChange={handleChainChange}
        >
          <option value="">All Chains</option>
          {chains.map(chain => (
            <option key={chain.nomChaine} value={chain.nomChaine}>{chain.nomChaine}</option>
          ))}
        </select>
      </div>
      {filteredHotels.length > 0 && (
        <div className="form-group">
          <label htmlFor="hotel">Hotel</label>
          <select
            id="hotel"
            name="hotel"
            className="form-control"
            value={filters.hotel}
            onChange={handleInputChange}
          >
            <option value="">All Hotels</option>
            {filteredHotels.map(hotel => (
              <option key={hotel.idHotel} value={hotel.idHotel}>{hotel.nomHotel}</option>
            ))}
          </select>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="capacity">Room Capacity</label>
        <select
          className="form-select"
          name="capacity"
          value={filters.capacity}
          onChange={handleInputChange}
        >
          <option value="">Select Capacity</option>
          {uniqueCapacityOptions.map((capacity, index) => (
            <option key={index} value={capacity}>
              {capacity}
            </option>
          ))}
        </select>
      </div>
    
      <div className="form-group">
        <label htmlFor="size">Room Size</label>
        <select
          className="form-select"
          name="size"
          value={filters.size}
          onChange={handleInputChange}
        >
          <option value="">Select Size</option>
          {uniqueSizeOptions.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="totalRooms">Total number of rooms in the hotel</label>
        <select
          className="form-select"
          name="totalRooms"
          value={filters.totalRooms}
          onChange={handleInputChange}
        >
          <option value="">Select Total Rooms</option>
          {uniqueTotalRoomsOptions.map((totalRooms, index) => (
            <option key={index} value={totalRooms}>
              {totalRooms}
            </option>
          ))}
        </select>
      </div>
    
      <div className="form-group">
        <label htmlFor="price">Price Per Night</label>
        <select
          className="form-select"
          name="price"
          value={filters.price}
          onChange={handleInputChange}
        >
          <option value="">Select Price</option>
          {uniquePriceOptions.map((price, index) => (
            <option key={index} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>
    </form>
    );
  };
export default RoomFilter;