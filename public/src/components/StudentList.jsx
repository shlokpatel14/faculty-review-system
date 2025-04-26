import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; // adjust path if needed
import './StudentList.css'; // the CSS we wrote earlier

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  const department_id = JSON.parse(localStorage.getItem('hod'))?.department_id;

  useEffect(() => {
    if (!department_id) {
      setError("Department ID not found.");
      return;
    }

    axios.get(`/students/by-department/${department_id}`)
      .then(res => {
        setStudents(res.data);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch student list.');
      });
  }, [department_id]);

  return (
    <div className="student-list-container">
      <h2>Students in Department</h2>

      {error && <div className="error">{error}</div>}

      <ul className="student-list">
        {students.map((student, index) => (
          <li key={index}>
            <p><strong>Enrollment:</strong> {student.enrollment}</p>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Semester:</strong> {student.semester}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
