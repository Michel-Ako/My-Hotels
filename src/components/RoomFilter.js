import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomFilter = ({ filters, onChange }) => {
  const [chains, setChains] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedChain, setSelectedChain] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/chain/')
      .then(response => {
        console.log(response.data);
        setChains(response.data);
      })
      .catch(error => console.log(error));
    axios.get('http://localhost:8080/api/hotel/')
      .then(response => {
        console.log(response.data);
        setHotels(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChainChange = (e) => {
    const { value } = e.target;
    setSelectedChain(value);
    onChange('chain', value);
  };

  const filteredHotels = selectedChain
    ? hotels.filter(hotel => hotel.chaineHoteliere.nomChaine === selectedChain)
    : hotels;

  return (
    <div className="card mb-3">
      <div className="card-header">Filter Rooms</div>
      <div className="card-body">
        <form>
          <div className="form-group">
            <label htmlFor="chain">Chain</label>
            <select
              id="chain"
              name="chain"
              className="form-control"
              value={selectedChain}
              onChange={handleChainChange}
            >
              <option value="">All Chains</option>
              {chains.map(chain => (
                <option key={chain.nomChaine} value={chain.nomChaine}>{chain.nomChaine}</option>
              ))}
            </select>
          </div>

          {filteredHotels.length > 0 && (
            <div className="form-group">
              <label htmlFor="hotel">Hotel</label>
              <select
                id="hotel"
                name="hotel"
                className="form-control"
                value={filters.hotel}
                onChange={(e) => onChange('hotel', e.target.value)}
              >
                <option value="">All Hotels</option>
                {filteredHotels.map(hotel => (
                  <option key={hotel.idHotel} value={hotel.idHotel}>{hotel.nomHotel}</option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              className="form-control"
              value={filters.date}
              onChange={(e) => onChange('date', e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomFilter;
