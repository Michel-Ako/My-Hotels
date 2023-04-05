import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/rooms')
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
      <table className="table">
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Hotel Chain</th>
            <th>Price</th>
            <th>Capacity</th>
            <th>Location</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.roomNumber}</td>
              <td>{room.hotelChain}</td>
              <td>{room.price}</td>
              <td>{room.capacity}</td>
              <td>{room.location}</td>
              <td>
                <Link to={`/rooms/${room.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomList;
