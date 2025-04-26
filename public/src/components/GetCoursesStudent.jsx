import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CourseCard.css'; // Common CSS file
import { useNavigate } from 'react-router-dom';

const GetCoursesStudent = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // ✅ Convert to integers using parseInt
        const department_id = parseInt(localStorage.getItem('department_id'));
        const semester = parseInt(localStorage.getItem('semester'));

        const response = await axios.post('http://localhost:8000/api/courses/student', {
          department_id,
          semester
        });

        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmitReview = (course_id) => {
    navigate(`/student/review/${course_id}`);
  };

  return (
    <div className="course-card-container">
      <h2>Available Courses</h2>
      {courses.map(course => (
        <div key={course.course_id} className="course-card">
          <h3>{course.course_name}</h3>
          <p><strong>Semester:</strong> {course.semester}</p>
          <button onClick={() => handleSubmitReview(course.course_id)}>
            Submit Review
          </button><br></br><br></br>
        </div>
      ))}
    </div>
  );
};

export default GetCoursesStudent;
