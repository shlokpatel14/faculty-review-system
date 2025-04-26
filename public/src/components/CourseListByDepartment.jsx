import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CourseListByDepartment.css';
import { useNavigate } from 'react-router-dom';

const CourseListByDepartment = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const hod = JSON.parse(localStorage.getItem('hod'));
    const department_id = hod?.department_id;

    if (!department_id) {
      setError("Department ID not found.");
      return;
    }

    // Sending POST request to fetch courses by department
    axios.post('http://localhost:8000/api/courses/department', {
      department_id: department_id
    })
    .then(res => {
      setCourses(res.data);
    })
    .catch(err => {
      console.error("Error fetching courses:", err);
      setError("Failed to fetch course data.");
    });
  }, []);

  const goToReport = (course_id) => {
    navigate(`/reviews/report/${course_id}`);
  };

  return (
    <div className="course-list-container">
      <h2>Courses in Your Department</h2>
      {error && <p className="error">{error}</p>}

      <ul className="course-list">
        {courses.map((course, index) => (
          <li key={index}>
            <p><strong>Course Name:</strong> {course.course_name}</p>
            <p><strong>Course Code:</strong> {course.course_id}</p>
            <p><strong>Semester:</strong> {course.semester}</p>
            <button onClick={() => goToReport(course.course_id)} className="report-btn">
              View Performance Report
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseListByDepartment;
