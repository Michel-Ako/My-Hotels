import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RoomDetails = (props) => {
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(true);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const roomId = props.match.params.id;
    axios
      .get(`http://localhost:8080/api/room/${roomId}`)
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
    <div className="container my-5">
      {loading ? (
        <div className="text-center">
          <span className="spinner-border"></span>
        </div>
      ) : (
        <>
          <h1 className="mb-4">{room.type}</h1>
          <table className="table">
            <tbody>
              <tr>
                <th>Room Number</th>
                <td>{room.numero_chambre}</td>
              </tr>
              <tr>
                <th>Hotel Chain</th>
                <td>{room.id_hotel}</td>
              </tr>
              <tr>
                <th>Price</th>
                <td>{room.prix}</td>
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
                <th>Extent</th>
                <td>{room.etendue}</td>
              </tr>
              <tr>
                <th>Damage</th>
                <td>{room.dommage}</td>
              </tr>
              <tr>
                <th>Amenities</th>
                <td>{room.commodites}</td>
              </tr>
              <tr>
                <th>Availability</th>
                <td>{room.disponibilite ? 'Available' : 'Not Available'}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{room.etat}</td>
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
          <Link className="btn btn-secondary ml-3" to="/booking">
            Make a Reservation
          </Link>
        </>
      )}
    </div>
  );
};

export default RoomDetails;
