import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RoomDetails() {
  const [room, setRoom] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/rooms/${id}`).then((response) => {
      setRoom(response.data);
    });
  }, [id]);

  return (
    <div>
      <h1>{room.name}</h1>
      <p>{room.description}</p>
      <p>${room.price} per night</p>
      <p>Maximum occupancy: {room.maxOccupancy}</p>
      <p>{room.petFriendly ? 'Pet friendly' : 'No pets allowed'}</p>
    </div>
  );
}

export default RoomDetails;
