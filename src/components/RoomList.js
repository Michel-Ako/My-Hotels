import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/room/')
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="mb-4">Rooms</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {rooms.map((room) => (
          <div key={room.numero_chambre} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Room Number: {room.numero_chambre}</h5>
                <p className="card-text">Hotel ID: {room.ID_hotel}</p>
                <p className="card-text">Type: {room.Type_chambre}</p>
                <p className="card-text">Price: {room.PrixParNuit}</p>
                <p className="card-text">Capacity: {room.Capacite}</p>
                <Link to={`/rooms/${room.numero_chambre}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
