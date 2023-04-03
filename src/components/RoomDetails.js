import React from 'react';
import { useParams } from 'react-router-dom';

const RoomDetails = () => {
  const { id } = useParams();

  // fetch room details by id and display them
  return (
    <div>
      <h1>Room Details</h1>
      <p>Details for room {id}</p>
    </div>
  );
};

export default RoomDetails;
