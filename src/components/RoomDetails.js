import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useParams } from 'react-router-dom';
import Navbar from './Navbar';

const RoomDetails = () => {
  const [room, setRoom] = useState({});
  const [hotel, setHotel] = useState({});
  const [loading, setLoading] = useState(true);
  const [booked, setBooked] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { id: roomId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/room/${roomId}/`)
      .then((response) => {
        setRoom(response.data);
        setLoading(false);
        return axios.get(`http://localhost:8080/api/hotel/${response.data.id_hotel}/`);
      })
      .then((response) => {
        setHotel(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [roomId]);

  const handleBookRoom = () => {
    const bookingData = {
      numero_chambre: room.numeroChambre,
      start_date: startDate,
      end_date: endDate,
    };

    axios
      .post('http://localhost:8080/api/booking/', bookingData)
      .then((response) => {
        setBooked(true);
      })
      .catch((error) => {
        console.log(error);
      });
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
            <td>{hotel.chaineHoteliere ? hotel.chaineHoteliere.nomChaine : ''}</td>
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
      <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        {booked ? (
          <p className="text-success">Room booked successfully!</p>
          ) : (
          <button className="btn btn-primary" onClick={handleBookRoom}>
          Book Room
          </button>
          )}
          </div>
          </>
          );
          };
          
          export default RoomDetails;
