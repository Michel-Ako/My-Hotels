import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const BookingPage = ({ room }) => {
  const history = useHistory();

  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({
    nom_complet: '',
    nas: ''
  });
  const [signupForm, setSignupForm] = useState({
    nom_complet: '',
    nas: ''
  });

  const [reservationForm, setReservationForm] = useState({
    dateDebut: '',
    dateFin: '',
    client_ID: '',
    chambre_ID: room.numero_chambre
  });
  const [availableDates, setAvailableDates] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:8080/api/room/${room.numero_chambre}/disponibilites`)
      .then(response => setAvailableDates(response.data))
      .catch(error => console.log(error));
  }, [room.numero_chambre]);


  const handleLoginFormChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

 
  const handleSignupFormChange = (e) => {
    const { name, value } = e.target;
    setSignupForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleReservationFormChange = (e) => {
    const { name, value } = e.target;
    setReservationForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/clients/login', loginForm)
      .then(response => {
        setUser(response.data);
        setLoginForm({
          nom_complet: '',
          nas: ''
        });
      })
      .catch(error => console.log(error));
  };


  const handleSignupSubmit = (e) => {
    e.preventDefault();
 
    axios.post('http://localhost:8080/api/client/', signupForm)
      .then(response => {
        setUser(response.data);
        setSignupForm({
          nom_complet: '',
          nas: ''
        });
      })
      .catch(error => console.log(error));
  };


  const handleReservationSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/reservation/', reservationForm)
      .then(response => {
        history.push('/confirmation');
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1 className="mb-4">Book Room {room.numero_chambre}</h1>
          <form onSubmit={handleReservationSubmit}>
            <div className="form-group">
              <label htmlFor="dateDebut">Check-in Date</label>
              <input
                id="dateDebut"
                name="dateDebut"
                type="date"
                className="form-control"
                value={reservationForm.dateDebut}
                onChange={handleReservationFormChange}
                required
                />
                </div>
                <div className="form-group">
                <label htmlFor="dateFin">Check-out Date</label>
                <input
                             id="dateFin"
                             name="dateFin"
                             type="date"
                             className="form-control"
                             value={reservationForm.dateFin}
                             onChange={handleReservationFormChange}
                             required
                           />
                </div>
                <div className="form-group">
                <label htmlFor="client_ID">Client ID</label>
                <input
                id="client_ID"
                name="client_ID"
                type="text"
                className="form-control"
                value={reservationForm.client_ID}
                onChange={handleReservationFormChange}
                disabled={user ? true : false}
                required={!user}
                />
                </div>
                <div className="form-group">
                <button type="submit" className="btn btn-primary">
                Book Now
                </button>
                </div>
                </form>
                </div>
                <div className="col-md-6">
                {!user ? (
                <div>
                <h1>Sign Up</h1>
                <form onSubmit={handleSignupSubmit}>
                <div className="form-group">
                <label htmlFor="nom_complet">Full Name</label>
                <input
                                 id="nom_complet"
                                 name="nom_complet"
                                 type="text"
                                 className="form-control"
                                 value={signupForm.nom_complet}
                                 onChange={handleSignupFormChange}
                                 required
                               />
                </div>
                <div className="form-group">
                <label htmlFor="nas">National ID Number</label>
                <input
                                 id="nas"
                                 name="nas"
                                 type="text"
                                 className="form-control"
                                 value={signupForm.nas}
                                 onChange={handleSignupFormChange}
                                 required
                               />
                </div>
                <div className="form-group">
                <button type="submit" className="btn btn-primary">
                Sign Up
                </button>
                </div>
                </form>
                          <h1>Or</h1>
                
                          <h1>Log In</h1>
                          <form onSubmit={handleLoginSubmit}>
                            <div className="form-group">
                              <label htmlFor="nom_complet">Full Name</label>
                              <input
                                id="nom_complet"
                                name="nom_complet"
                                type="text"
                                className="form-control"
                                value={loginForm.nom_complet}
                                onChange={handleLoginFormChange}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="nas">National ID Number</label>
                              <input
                                id="nas"
                                name="nas"
                                type="text"
                                className="form-control"
                                value={loginForm.nas}
                                onChange={handleLoginFormChange}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <button type="submit" className="btn btn-primary">
                                Log In
                              </button>
                            </div>
                          </form>
                        </div>
                      ) : (
                        <div>
                          <h1>Welcome, {user.nom_complet}</h1>
                          <p>Your Client ID is: {user.client_ID}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                );
                };
                
                export default BookingPage;
