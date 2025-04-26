import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FacultyList.css'; // Create CSS as needed

const FacultyList = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const hodData = JSON.parse(localStorage.getItem('hod'));

    if (!hodData || !hodData.department_id) {
      setError('HOD data is missing or invalid.');
      return;
    }

    axios.get(`http://localhost:8000/api/faculty/by-department/${hodData.department_id}`)
      .then(res => setFacultyList(res.data))
      .catch(err => {
        console.error('Error fetching faculty:', err);
        setError('Failed to fetch faculty data.');
      });
  }, []);

  return (
    <div className="faculty-list-container">
      <h2>Faculty in Your Department</h2>
      {error && <p className="error">{error}</p>}
      {facultyList.length === 0 ? (
        <p>No faculty found.</p>
      ) : (
        <ul className="faculty-list">
          {facultyList.map(faculty => (
            <li key={faculty.faculty_id}>
              <strong>Name:</strong> {faculty.name} <br />
              <strong>Email:</strong> {faculty.email} <br />
              <strong>Mobile:</strong> {faculty.mobile_no}<br />
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FacultyList;
