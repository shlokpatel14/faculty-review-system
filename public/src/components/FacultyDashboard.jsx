import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FacultyDashboard.css';

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState({});
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const storedFaculty = JSON.parse(localStorage.getItem('faculty'));
    if (storedFaculty) {
      setFaculty(storedFaculty);
      fetchCourses(storedFaculty.faculty_id);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('faculty_token');
    localStorage.removeItem('faculty');
    navigate('/faculty/login');
  };

  const fetchCourses = async (faculty_id) => {
    try {
      const res = await axios.post('http://localhost:8000/api/courses/faculty', {
        faculty_id,
      });
      setCourses(res.data);
    } catch (err) {
      console.error('Error fetching courses:', err.response?.data || err);
    }
  };

  return (
    <div className="faculty-dashboard-container">
      <h2>Welcome, {faculty.name || 'Faculty'}</h2>

      <div className="faculty-info">
        <p><strong>Faculty ID:</strong> {faculty.faculty_id}</p>
        <p><strong>Email:</strong> {faculty.email}</p>
      </div>

      <div className="faculty-links">
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="course-card-container">
        <h2>Courses Assigned</h2>
        <div className="course-list">
          {courses.length > 0 ? (
            courses.map(course => (
              <div key={course.course_id} className="course-card">
                <h3>{course.course_name}</h3>
                <p><strong>Course ID:</strong> {course.course_id}</p>
                <div className="course-buttons">
                  <a href={`/faculty/reviews/${course.course_id}`} className="review-button">
                    See Review
                  </a>
                  <a
        href={`/reviews/report/${course.course_id}`}
        className="performance-button"
      >
        Performance Report
      </a>
                </div>
              </div>
            ))
          ) : (
            <p className="no-courses">No courses available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
