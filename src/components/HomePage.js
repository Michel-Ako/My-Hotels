import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignUpForm from './SignUpForm';

function Home() {
  const [hotels, setHotels] = useState([]);
  const [loginType, setLoginType] = useState('client');
  const [name, setName] = useState('');
  const [nas, setNas] = useState('');
  const history = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/hotel/').then((response) => {
      setHotels(response.data);
    });
  }, []);

  const handleLogin = () => {
    const apiEndpoint = loginType === 'client' ? 'clientLogin' : 'employeeLogin';

    axios
      .post(`http://localhost:8080/api/${apiEndpoint}`, {
        name,
        nas,
      })
      .then((response) => {
        if (response.data.success) {
          if (loginType === 'client') {
            history.push('/roomPage');
          } else if (loginType === 'employee') {
            history.push('/EmployeeDashboard');
          }
        } else {
          alert('Invalid credentials. Please try again.');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('An error occurred. Please try again.');
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mt-5 mb-4">Welcome to My Hotel Website!</h1>
          <ul className="nav nav-tabs" id="myTabs" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="login-tab" data-toggle="tab" href="#login" role="tab" aria-controls="login" aria-selected="true">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="signup-tab" data-toggle="tab" href="#signup" role="tab" aria-controls="signup" aria-selected="false">Sign Up</a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
              <div className="card">
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="loginType">Login Type:</label>
                      <select
                        className="form-control"
                        id="loginType"
                        value={loginType}
                        onChange={(e) => setLoginType(e.target.value)}
                      >
                        <option value="client">Client</option>
                        <option value="employee">Employee</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">{"Name"}</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="nas">NAS:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nas"
                        value={nas}
                        onChange={(e) => setNas(e.target.value)}
                      />
                    </div>
                    <button type="button" className="btn btn-primary btn-block" onClick={handleLogin}>
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="signup" role="tabpanel" aria-labelledby="signup-tab">
              <div className="card">
                <div className="card-body">
                  <SignUpForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;