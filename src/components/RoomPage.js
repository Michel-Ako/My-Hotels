import React, { useState, useEffect } from 'react';
import RoomList from './RoomList';
import RoomFilter from './RoomFilter';
import axios from 'axios';

function RoomPage() {
  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    chain: '',
    date: '',
    capacity: '',
    price: ''
  });

  useEffect(() => {
    const apiUrl = `http://localhost:8080/api/room/}`;
    
    axios
      .get(apiUrl)
      .then(response => setRooms(response.data))
      .catch(error => console.log(error));
  }, [filters]);

  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <RoomFilter filters={filters} onChange={handleFilterChange} />
        </div>
        <div className="col-md-8">
          <RoomList rooms={rooms} />
        </div>
      </div>
    </div>
  );
}

export default RoomPage;
