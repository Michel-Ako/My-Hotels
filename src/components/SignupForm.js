import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const [nomComplet, setNomComplet] = useState('');
  const [adresse, setAdresse] = useState('');
  const [nas, setNas] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const clientData = {
      nomComplet,
      adresse,
      nas,
      etatPaiement: 'Paid',
      dateEnregistrement: new Date().toISOString(),
    };

    try {
      console.log(clientData);
      const response = await axios.post('http://localhost:8080/api/client/add/', clientData);
      console.log(response);
      alert('Client successfully created!');
    } catch (error) {
      console.error(error);
      alert('Error: Failed to create the client');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nomComplet">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="nomComplet"
            value={nomComplet}
            onChange={(e) => setNomComplet(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="adresse">Adresse</label>
          <input
            type="text"
            className="form-control"
            id="adresse"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nas">NAS</label>
          <input
            type="text"
            className="form-control"
            id="nas"
            value={nas}
            onChange={(e) => setNas(e.target.value)}
            maxLength={9}
            pattern="\d*"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
