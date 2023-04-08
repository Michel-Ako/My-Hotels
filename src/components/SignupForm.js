import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = ({ setUser }) => {
  const [formData, setFormData] = useState({
    nom_complet: '',
    addresse: '',
    nas: '',
    date_enregistrement: new Date().toISOString().substr(0, 10)
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/client/', {
      client_id: 0,
      nom_complet: formData.nom_complet,
      addresse: formData.addresse,
      nas: formData.nas,
      date_enregistrement: formData.date_enregistrement
    })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="card mb-3">
      <div className="card-header">Sign Up</div>
      <div className="card-body">
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="nom_complet">Full Name</label>
            <input
              id="nom_complet"
              name="nom_complet"
              type="text"
              className="form-control"
              value={formData.nom_complet}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="addresse">Address</label>
            <input
              id="addresse"
              name="addresse"
              type="text"
              className="form-control"
              value={formData.addresse}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nas">NAS</label>
            <input
              id="nas"
              name="nas"
              type="text"
              className="form-control"
              value={formData.nas}
              onChange={handleFormChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
