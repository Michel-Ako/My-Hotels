import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeDashboard = ({ token }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await axios.get('/api/employees', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEmployees(res.data);
    };
    fetchEmployees();
  }, [token]);

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>{employee.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDashboard;
