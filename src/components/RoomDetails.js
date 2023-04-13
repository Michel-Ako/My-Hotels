import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const RoomDetails = () => {
  const location = useLocation();
  const roomId = location.pathname.split('/').pop();

  const [room, setRoom] = useState({});
  const [reservation, setReservation] = useState({
    date_debut: '',
    date_fin: '',
    numero_chambre: parseInt(roomId),
    date_reservation: new Date().toISOString(),
  });

  useEffect(() => {
    const fetchRoomDetails = async () => {
      const response = await axios.post("http://localhost:8080/api/room", JSON.stringify(this.room), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setRoom(response.data);
    };
    fetchRoomDetails();
  }, [roomId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(reservation)
      await axios.post('http://localhost:8080/api/reservation/', reservation);
      alert('Reservation created successfully');
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('Failed to create reservation');
    }
  };

  return (
    <div>
      <h1>Room Details</h1>
      {room && (
        <div>
          <p>Room Number: {room.numeroChambre}</p>
          <p>Type: {room.typeChambre}</p>
          <p>Price: {room.prixParNuit}</p>
          <p>Capacity: {room.capacite}</p>
          <p>View: {room.vue}</p>
          <p>Availability: {room.disponibilite ? 'Available' : 'Not Available'}</p>
          <p>Hotel ID: {room.id_hotel}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input type="date" name="date_debut" value={reservation.date_debut} onChange={handleInputChange} />
        </label>
        <label>
          End Date:
          <input type="date" name="date_fin" value={reservation.date_fin} onChange={handleInputChange} />
        </label>
        <button type="submit">Make Reservation</button>
      </form>
    </div>
  );
};

export default RoomDetails;
