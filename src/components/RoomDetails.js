import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const RoomDetails = (props) => {
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(true);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const roomId = props.match.params.id;
    axios
      .get(`http://localhost:8080/api/room/${roomId}/`)
      .then((response) => {
        setRoom(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.match.params.id]);

  const handleBookRoom = () => {
    setBooked(true);
  };

  return (
    <>
    <Navbar />
    <div className="container my-5">
      <h1 className="mb-4">{room.type}</h1>
      <table className="table">
        <tbody>
          <tr>
            <th>Room Number</th>
            <td>{room.numeroChambre}</td>
          </tr>
          <tr>
            <th>Hotel Chain</th>
            <td>{room.id_hotel}</td>
          </tr>
          <tr>
            <th>Price</th>
            <td>{room.prixParNuit}</td>
          </tr>
          <tr>
            <th>Capacity</th>
            <td>{room.capacite}</td>
          </tr>
          <tr>
            <th>View</th>
            <td>{room.vue}</td>
          </tr>
          <tr>
            <th>Availability</th>
            <td>{room.disponibilite ? 'Available' : 'Not Available'}</td>
          </tr>
        </tbody>
      </table>
      {booked ? (
        <p className="text-success">Room booked successfully!</p>
      ) : (
        <button className="btn btn-primary" onClick={handleBookRoom}>
          Book Room
        </button>
      )}
      <Link className="btn btn-secondary ml-3" to="/booking" key="booking-link">
        Make a Reservation
      </Link>
    </div>
    </>
  );
};

export default RoomDetails;