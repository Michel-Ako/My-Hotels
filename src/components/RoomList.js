import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RoomFilter from './RoomFilter';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [hotelDataList, setHotelDataList] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [filters, setFilters] = useState({
    chain: '',
    hotel: '',
    startDate: '',
    endDate: '',
    category: '',
    totalRooms: '',
    price: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/room/')
      .then((response) => {
        setRooms(response.data);
        setFilteredRooms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const fetchHotelData = async () => {
      const hotelDataPromises = rooms.map((room) => axios.get(`http://localhost:8080/api/hotel/${room.id_hotel}/`));
      const hotelDataResponses = await Promise.all(hotelDataPromises);
      const hotelData = hotelDataResponses.map((response) => response.data);
      setHotelDataList(hotelData);
    };

    if (rooms.length > 0) {
      fetchHotelData();
    }
  }, [rooms]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    if (rooms.length > 0 && hotelDataList.length > 0) {
      const filtered = rooms
        .map((room, index) => {
          const hotelData = hotelDataList[index];
          const chainMatch = filters.chain === '' || hotelData.chaineHoteliere.nomChaine === filters.chain;
          const hotelMatch = filters.hotel === '' || hotelData.idHotel.toString() === filters.hotel;
          const capacityMatch = filters.capacity === '' || room.capacite >= parseInt(filters.capacity);
          const totalRoomsMatch = filters.totalRooms === '' || hotelData.totalRooms >= parseInt(filters.totalRooms);
          const priceMatch = filters.price === '' || room.prixParNuit <= parseFloat(filters.price);

          if (chainMatch && hotelMatch && capacityMatch && totalRoomsMatch && priceMatch) {
            return { ...room, hotelData };
          } else {
            return null;
          }
        })
        .filter((room) => room !== null);

      setFilteredRooms(filtered);
    }
  }, [filters, rooms, hotelDataList]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <RoomFilter onChange={handleFilterChange} />
        </div>
        <div className="col-md-9">
          <h1 className="mb-4">Rooms</h1>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {filteredRooms.map((room) => (
              <div key={room.numeroChambre} className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">
                      Hotel Name:{" "}
                      {room.hotelData ? (
                        room.hotelData.nomHotel
                      ) : (
                        <span className="text-muted">Loading...</span>
                      )}
                    </h5><p className="card-text">Room Number: {room.numeroChambre}</p>
                    <p className="card-text">Type: {room.typeChambre}</p>
                    <p className="card-text">Price: {room.prixParNuit}</p>
                    <p className="card-text">Capacity: {room.capacite}</p>
                    <Link to={`/rooms/${room.numeroChambre}`} className="btn btn-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomList;

