import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationList = ({ clientID }) => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/client/${clientID}/reservations/`)
      .then(response => setReservations(response.data))
      .catch(error => console.log(error));
  }, [clientID]);

  return (
    <div className="container">
      <h1 className="mb-4">My Reservations</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Room Number</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation.id_reservation}>
              <td>{reservation.id_reservation}</td>
              <td>{reservation.date_debut}</td>
              <td>{reservation.dat_fin}</td>
              <td>{reservation.numero_chambre}</td>
              <td>{reservation.numero_archive}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
