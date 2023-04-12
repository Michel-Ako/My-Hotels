import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AvailableRoomsByHotel = () => {
    const [availableRooms, setAvailableRooms] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/hotel/availableRoomsByHotel/')
            .then((response) => {
                setAvailableRooms(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h2>Available Rooms by Location</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Hotel ID</th>
                        <th>Hotel Name</th>
                        <th>Available Rooms</th>
                    </tr>
                </thead>
                <tbody>
                    {availableRooms.map((room) => (
                        <tr key={room.id_hotel}>
                            <td>{room.id_hotel}</td>
                            <td>{room.nom_hotel}</td>
                            <td>{room.available_rooms}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AvailableRoomsByHotel;
