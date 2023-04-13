import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const EmployeeDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [roomNumber, setRoomNumber] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [reservationError, setReservationError] = useState('');

  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/reservation/');
      setReservations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleRoomNumberChange = (event) => {
    setRoomNumber(event.target.value);
  };

  const handleCheckInDateChange = (event) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutDateChange = (event) => {
    setCheckOutDate(event.target.value);
  };

  const handleReservationSubmit = async (event) => {
    event.preventDefault();

    const currentDate = new Date().toISOString();

    try {
      const response = await axios.post('http://localhost:8080/api/reservation/', {
        dateReservation: currentDate,
        roomNumber: roomNumber,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate
      });
      setRoomNumber('');
      setCheckInDate('');
      setCheckOutDate('');
      setReservationError('');
      setReservations([...reservations, response.data]);
    } catch (error) {
      console.error(error);
      setReservationError('There was an error creating the reservation');
    }
  };

  const handleReservationCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/reservation/${id}`);
      setReservations(reservations.filter(reservation => reservation.id !== id));
    } catch (error) {
      console.error(error);
      setReservationError('There was an error canceling the reservation');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Employee Dashboard</h1>

        <h2>All Reservations</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Check In Date</th>
              <th>Check Out Date</th>
              <th>Reservation Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.numero_chambre}</td>
                <td>{reservation.date_debut}</td>
                <td>{reservation.date_fin}</td>
                <td>{reservation.date_reservation}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleReservationCancel(reservation.id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr />

        <h2>Make a Reservation</h2>
        {reservationError && <div className="alert alert-danger">{reservationError}</div>}
        <form onSubmit={handleReservationSubmit}>
          <div className="form-group">
            <label htmlFor="roomNumber">Room Number:</label>
            <input type="text" className="form-control" id="roomNumber" value={roomNumber} onChange={
              handleRoomNumberChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="checkInDate">Check In Date:</label>
            <input type="date" className="form-control" id="checkInDate" value={checkInDate} onChange={handleCheckInDateChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="checkOutDate">Check Out Date:</label>
            <input type="date" className="form-control" id="checkOutDate" value={checkOutDate} onChange={handleCheckOutDateChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  );
};

export default EmployeeDashboard;