import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [student, setStudent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('student_token');
    if (!token) {
      navigate('/student/login'); // Redirect to login if token doesn't exist
      return;
    }
  
    const fetchStudentData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
  
        const res = await axios.get('/profile', { headers });
        setStudent(res.data);
      } catch (error) {
        console.error("Failed to fetch student data:", error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('student_token');
          navigate('/student/login'); // Redirect to login if token is invalid
        }
      }
    };
  
    fetchStudentData();
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem('student_token');
    localStorage.removeItem('department_id');
    localStorage.removeItem('semester');
    navigate('/student/login');
  };

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar">
        <h2>Student Dashboard</h2>
        <ul>
          <li><Link to="/student/login/dashboard">Dashboard</Link></li>
          <li><Link to="/student/login/dashboard/GetCoursesStudent">Courses</Link></li>
          <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>

      <div className="content">
        <h2>Welcome, {student.name}</h2>
        <div className="student-info">
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Enrollment No:</strong> {student.enrollment}</p>
          <p><strong>Department:</strong> {student.branch}</p>
          <p><strong>Semester:</strong> {student.semester}</p>
        </div>

        
      </div>
    </div>
  );
};

export default StudentDashboard;
