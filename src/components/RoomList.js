import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RoomFilter from './RoomFilter';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [filters, setFilters] = useState({
    chain: '',
    hotel: '',
    startDate: '',
    endDate: '',
    capacity: '',
    size: '',
    category: '',
    totalRooms: '',
    price: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/room/')
      .then((response) => {
        const updatedRooms = response.data.map(async (room) => {
          const hotelResponse = await axios.get(`http://localhost:8080/api/hotel/${room.id_hotel}`);
          const chainResponse = await axios.get(`http://localhost:8080/api/chain/${hotelResponse.data.chaineHoteliere.nomChaine}`);
          return {
            ...room,
            nomHotel: hotelResponse.data.nomHotel,
            nomChaine: chainResponse.data.nomChaine,
            categorie: hotelResponse.data.categorie,
            totalRooms: hotelResponse.data.totalRooms,
          };
        });
        Promise.all(updatedRooms).then((updatedRoomsData) => {
          setRooms(updatedRoomsData);
          setFilteredRooms(updatedRoomsData);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const filtered = rooms.filter((room) => {
      const chainMatch = filters.chain === '' || room.nomChaine === filters.chain;
      const hotelMatch = filters.hotel === '' || room.nomHotel === filters.hotel;
      const dateMatch =
        filters.startDate === '' || filters.endDate === ''
          ? true
          : new Date(filters.startDate) <= new Date(room.date) &&
          new Date(filters.endDate) >= new Date(room.date);
      const capacityMatch = filters.capacity === '' || room.capacite >= parseInt(filters.capacity);
      const sizeMatch = filters.size === '' || room.superficie >= parseInt(filters.size);
      const categoryMatch = filters.category === '' || room.categorie === parseInt(filters.category);
      const totalRoomsMatch = filters.totalRooms === '' || room.totalRooms >= parseInt(filters.totalRooms);
      const priceMatch = filters.price === '' || room.prixParNuit <= parseFloat(filters.price);

      return (
        chainMatch &&
        hotelMatch &&
        dateMatch &&
        capacityMatch &&
        sizeMatch &&
        categoryMatch &&
        totalRoomsMatch &&
        priceMatch
      );
    });
    setFilteredRooms(filtered);
  }, [filters, rooms]);

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <RoomFilter filters={filters} onChange={handleFilterChange} />
        </div>
        <div className="col-md-9">
          <h1 className="mb-4">Rooms</h1>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {filteredRooms.map((room) => (
              <div key={room.numeroChambre} className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Hotel Name: {room.nomHotel}</h5>
                    <p className="card-text">Room Number: {room.numeroChambre}</p>
                    <p className="card-text">Type: {room.typeChambre}</p>
                    <p className="card-text">Price: {room.prixParNuit}</p>
                    <p className="card-text">Capacity: {room.capacite}</p>
                    <Link to={"/rooms/${room.numeroChambre}"} className="btn btn-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
};

export default RoomList;
