import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RoomPage from './components/RoomPage';
import RoomDetails from './components/RoomDetails';
import Login from './components/Login';
import SignupForm from './components/SignUpForm';
import EmployeeDashboard from './components/EmployeeDashboard';
import ReservationList from './components/ReservationList';
import AvailableRoomsByHotel from './components/AvailableRoomsByHotel';
import HotelRoomCapacity from './components/HotelRoomCapacity';
import axios from 'axios';
import './App.css';

function App() {
  const [hotels, setHotels] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:8080/api/hotel/').then(response => {
      setHotels(response.data);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/availableRoomsByHotel" element={<AvailableRoomsByHotel/>} />
          <Route exact path="/hotelRoomCapacity" element={<HotelRoomCapacity />} />
          <Route exact path="/" element={<HomePage hotels={hotels} />} />
          <Route exact path="/rooms" element={<RoomPage hotels={hotels} />} />
          <Route exact path="/rooms/:id" element={<RoomDetails hotels={hotels} />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/SignUp" element={<SignupForm />} />
          <Route exact path="/employee" element={<EmployeeDashboard />} />
          <Route exact path="/reservations/:client_id" component={ReservationList} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;