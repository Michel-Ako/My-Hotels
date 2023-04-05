import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import RoomPage from './components/RoomPage';
import RoomDetails from './components/RoomDetails';
import Login from './components/Login';
import Register from './components/Register';
import EmployeeDashboard from './components/EmployeeDashboard';
import axios from 'axios';
import './App.css';

function App() {
  const [hotels, setHotels] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:8080/hotels').then(response => {
      setHotels(response.data);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage hotels={hotels} />} />
          <Route exact path="/rooms" element={<RoomPage hotels={hotels} />} />
          <Route exact path="/rooms/:id" element={<RoomDetails hotels={hotels} />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/employee" element={<EmployeeDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;