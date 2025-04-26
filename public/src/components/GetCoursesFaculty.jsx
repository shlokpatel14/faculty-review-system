// GetCoursesFaculty.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './CourseCard.css';


const GetCoursesFaculty = () => {
    
    const [courses, setCourses] = useState([]);
    const faculty_id = parseInt(localStorage.getItem('faculty_id'));

    const fetchCourses = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/courses/faculty', {
                faculty_id
            });
            setCourses(res.data);
        } catch (err) {
            console.error(err.response?.data || err);
        }
    };

    return (
<div className="course-card-container">
            <h2>Courses for Faculty</h2>
            <button className="fetch-button" onClick={fetchCourses}>
                Get Courses
            </button>
            <div className="course-list">
                {courses.length > 0 ? (
                    courses.map(course => (
                        <div key={course.course_id} className="course-card">
                            <h3>{course.course_name}</h3>
                            <p><strong>Course ID:</strong> {course.course_id}</p>
                            <button>
                                <a href={`/faculty/reviews/${course.course_id}`} className="review-button">
                                    see Review
                                </a>
                            </button><br></br><br></br>
                        </div>
                        
                    ))
                ) : (
                    <p className="no-courses">No courses available. Click "Get Courses" to fetch.</p>
                )}
            </div>
        </div>
    );
};

export default GetCoursesFaculty;
