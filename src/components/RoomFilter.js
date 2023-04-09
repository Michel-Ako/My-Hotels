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
    hotelCategory: '',
    totalRooms: '',
    price: '',
  });

  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedChain, setSelectedChain] = useState('');
  const [chains, setChains] = useState([]);
  const [hotelCategories, setHotelCategories] = useState([]);
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

  const filteredHotels = selectedChain
    ? hotels.filter(hotel => hotel.chaineHoteliere.nomChaine === selectedChain)
    : hotels;

  const filteredRooms = filteredHotels.filter((hotel) => {
    if (filters.hotel && hotel.idHotel !== parseInt(filters.hotel)) {
      return false;
    }

    if (filters.startDate && filters.endDate) {
      const startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);

      const availableRooms = hotel.chambre.filter((room) => {
        const isRoomAvailable = room.reservation.every((reservation) => {
          const reservationStartDate = new Date(reservation.dateDebut);
          const reservationEndDate = new Date(reservation.dateFin);

          const isBefore = reservationEndDate < startDate;
          const isAfter = reservationStartDate > endDate;

          return isBefore || isAfter;
        });

        return isRoomAvailable;
      });

      if (availableRooms.length < 1) {
        return false;
      }
    }

    if (filters.capacity && parseInt(filters.capacity) > 0) {
      const availableRooms = hotel.chambre.filter((room) => {
        return room.capacite >= parseInt(filters.capacity);
      });

      if (availableRooms.length < 1) {
        return false;
      }
    }

    if (filters.size && parseFloat(filters.size) > 0) {
      const availableRooms = hotel.chambre.filter((room) => {
        return room.Etendue >= parseFloat(filters.size);
      });

      if (availableRooms.length < 1) {
        return false;
      }
    }

    if (filters.hotelCategory && parseInt(filters.hotelCategory) > 0) {
      if (parseInt(filters.hotelCategory)
        !== parseInt(hotel.Nombre_etoiles)) {
        return false;
      }
    }

    if (filters.totalRooms && parseInt(filters.totalRooms) > 0) {
      if (parseInt(filters.totalRooms) !== parseInt(hotel.Nombre_chambre)) {
        return false;
      }
    }

    if (filters.price && parseFloat(filters.price) > 0) {
      const availableRooms = hotel.chambre.filter((room) => {
        return room.prixParNuit <= parseFloat(filters.price);
      });

      if (availableRooms.length < 1) {
        return false;
      }
    }

    return true;
  });

  useEffect(() => {
    onChange(filteredRooms);
  }, [filteredRooms]);

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
        <label htmlFor="startDate">Reservation Start Date</label>
        <input
          type="date"
          className="form-control"
          name="startDate"
          value={filters.startDate}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="endDate">Reservation End Date</label>
        <input
          type="date"
          className="form-control"
          name="endDate"
          value={filters.endDate}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="capacity">Room Capacity</label>
        <select
          className="form-select"
          name="capacity"
          value={filters.capacity}
          onChange={handleInputChange}
        >
          <option value="">Select Capacity</option>
          {rooms.map((room, index) => (
            <option key={index} value={room.capacite}>
              {room.capacite}
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
          {rooms.map((room, index) => (
            <option key={index} value={room.Etendue}>
              {room.Etendue}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="hotelCategory">Hotel Category</label>
        <select
          className="form-select"
          name="hotelCategory"
          value={filters.hotelCategory}
          onChange={handleInputChange}
        >
          <option value="">Select Category</option>
          {hotelCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
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
          {hotels.map((hotel, index) => (
            <option key={index} value={hotel.Nombre_chambre}>
              {hotel.Nombre_chambre}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="price">Room Price</label>
        <select
          className="form-select"
          name="price"
          value={filters.price}
          onChange={handleInputChange}
        >
          <option value="">Select Price</option>
          {roomPrices.map((price, index) => (
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
