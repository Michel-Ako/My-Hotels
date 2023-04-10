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
        setRooms(response.data);
        setFilteredRooms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getHotelData = async (roomId) => {
    const hotelResponse = await axios.get(`http://localhost:8080/api/hotel/${roomId}/`);
    return hotelResponse.data;
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const applyFilters = async () => {
      const filtered = [];

      for (const room of rooms) {
        const hotelData = await getHotelData(room.id_hotel);

        const chainMatch = filters.chain === '' || hotelData.chaineHoteliere.nomChaine === filters.chain;
        const hotelMatch = filters.hotel === '' || hotelData.idHotel === filters.hotel;
        const capacityMatch = filters.capacity === '' || room.capacite >= parseInt(filters.capacity);
        const sizeMatch = filters.size === '' || room.superficie >= parseInt(filters.size);
        const totalRoomsMatch = filters.totalRooms === '' || hotelData.totalRooms >= parseInt(filters.totalRooms);
        const priceMatch = filters.price === '' || room.prixParNuit <= parseFloat(filters.price);

        if (
          chainMatch &&
          hotelMatch &&
          capacityMatch &&
          sizeMatch &&
          totalRoomsMatch &&
          priceMatch
        ) {
          filtered.push({ ...room, hotelData });
        }
      }

      setFilteredRooms(filtered);
    };

    applyFilters();
  }, [filters]);

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

