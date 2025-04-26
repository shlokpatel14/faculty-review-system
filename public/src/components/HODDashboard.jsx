import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import './HODDashboard.css';

const HodDashboard = () => {
  const [hod, setHod] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedHod = JSON.parse(localStorage.getItem('hod')) || {};
    setHod(fetchedHod);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('hod_token');
    localStorage.removeItem('hod');
    navigate('/hod/login');
  };

  return (
    <div className="dashboard-container">
      <div className="hod-details">
        <h2>Welcome, {hod.name || "HOD"}</h2>
        <p><strong>Email:</strong> {hod.email || "Not provided"}</p>
        <p><strong>Department:</strong> {hod.branch || "Not assigned"}</p>
      </div>

      <div className="dashboard-links">
        <Link to="/faculty/register" className="dashboard-link">
          New Faculty
        </Link>
        <Link to="/hod/AddDepartment" className="dashboard-link">
          Add Department
        </Link>
        <Link to="/hod/AddCourse" className="dashboard-link">
          Add Course
        </Link>
        <Link to="/hod/listCourse" className="dashboard-link">
          List Course
        </Link>
        <Link to="/hod/faculty-list" className="dashboard-link">
          List Faculty
        </Link>
        <Link to="/hod/student-list" className="dashboard-link">
          List Students
        </Link>
        {/* <Link to="/hod/student-list" className="dashboard-link">
          Performance Report
        </Link> */}
      </div>

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default HodDashboard;
