import React, { useState } from 'react';
import RoomFilter from './RoomFilter';
import RoomList from './RoomList';

const RoomPage = () => {
  const [filters, setFilters] = useState({
    location: '',
    chain: '',
    date: '',
  });

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <RoomFilter filters={filters} onChange={handleFilterChange} />
        </div>
        <div className="col-md-9">
          <RoomList filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
