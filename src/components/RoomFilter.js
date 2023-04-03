import React from 'react';

const RoomFilter = ({ filters, onChange }) => {
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
              <option value="New York">New York</option>
              <option value="Miami">Miami</option>
              <option value="Los Angeles">Los Angeles</option>
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
              <option value="Hilton">Hilton</option>
              <option value="Marriott">Marriott</option>
              <option value="Hyatt">Hyatt</option>
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
