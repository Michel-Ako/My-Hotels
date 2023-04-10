import React, { useState, useEffect } from 'react';
import RoomList from './RoomList';
import RoomFilter from './RoomFilter';
import axios from 'axios';
import Navbar from './Navbar';

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
    axios
      .get('http://localhost:8080/api/room/')
      .then((response) => {
        console.log(response.data);
        setRooms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <>
    <Navbar />
    <div className="container mt-5">
      <div className="row">
        <div>
          <RoomList rooms={rooms} />
        </div>
      </div>
    </div>
    </>
  );
  
}

export default RoomPage;