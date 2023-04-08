import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ setUser }) => {
  const history = useNavigate();

  const [formData, setFormData] = useState({
    nom_complet: '',
    nas: ''
  });
  const [error, setError] = useState(null);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/client/')
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const client = clients.find(
      (client) =>
        client.nas === formData.nas &&
        client.nom_complet === formData.nom_complet
    );
    if (client) {
      setUser(client);
      history.push('/reservations');
    } else {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="container">
      <h1 className="mb-4">Login</h1>
      {error && <div className="alert alert-danger">{error}</div>}
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
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
