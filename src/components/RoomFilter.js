import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomFilter = ({ filters, onChange }) => {
  const [locations, setLocations] = useState([]);
  const [chains, setChains] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/locations')
      .then(response => setLocations(response.data))
      .catch(error => console.log(error));
    axios.get('http://localhost:8080/chains')
      .then(response => setChains(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="card mb-3">
      <div className="card-header">Filter Rooms</div>
      <div className="card-body">
        <form>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <select
              id="location"
              name="location"
              className="form-control"
              value={filters.location}
              onChange={handleFilterChange}
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location.id} value={location.name}>{location.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="chain">Chain</label>
            <select
              id="chain"
              name="chain"
              className="form-control"
              value={filters.chain}
              onChange={handleFilterChange}
            >
              <option value="">All Chains</option>
              {chains.map(chain => (
                <option key={chain.id} value={chain.name}>{chain.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              className="form-control"
              value={filters.date}
              onChange={handleFilterChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomFilter;
