import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import { Tabs, Tab, Card, Form, Button } from 'react-bootstrap';


function Home() {
  const [hotels, setHotels] = useState([]);
  const [loginType, setLoginType] = useState('client');
  const [name, setName] = useState('');
  const [nas, setNas] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/hotel/').then((response) => {
      setHotels(response.data);
    });
  }, []);

  const handleLogin = () => {
    const apiEndpoint =
      loginType === 'client'
        ? `http://localhost:8080/api/client/byNomComplet/${name}/`
        : `http://localhost:8080/api/employees/byNomComplet/${name}/`;
  
    axios
      .get(apiEndpoint)
      .then((response) => {

        if (response.data.nas === parseInt(nas, 10)) {
          if (loginType === 'client') {
            navigate('/rooms');
          } else if (loginType === 'employee') {
            navigate('/EmployeeDashboard');
          }
        }
         else {
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
        <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
          <Tab eventKey="login" title="Login">
            <Card>
              <Card.Body>
                <Form>
                    <div className="form-group">
                      <label htmlFor="loginType">Login Type</label>
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
                      <label htmlFor="name">{"Full Name"}</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="nas">NAS</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nas"
                        value={nas}
                        maxLength="9"
                        onChange={(e) => setNas(e.target.value)}
                      />
                    </div>
                    <Button type="button" className="btn btn-primary btn-block" onClick={handleLogin}>
                      Login
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="signup" title="Client Registration">
              <Card>
                <Card.Body>
                  <SignUpForm />
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Home;