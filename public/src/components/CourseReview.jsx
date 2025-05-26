import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CourseReviews.css';
import { useParams } from 'react-router-dom';

const CourseReviews = () => {
  const { course_id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [searchEnrollment, setSearchEnrollment] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/reviews/course/${course_id}`)
      .then(res => {
        setReviews(res.data);
      })
      .catch(err => console.error("Failed to fetch reviews", err));
  }, [course_id]);

  const handleFilterChange = (e) => {
    setSearchEnrollment(e.target.value);
  };

  const filtered = reviews.filter(r =>
    String(r.enrollment).toLowerCase().includes(searchEnrollment.toLowerCase())
  );

  return (
    <div className="course-reviews-container">
      <h2>Review Submissions for {course_id}</h2>

      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <input
          type="text"
          placeholder="Search by enrollment"
          value={searchEnrollment}
          onChange={handleFilterChange}
          style={{
            padding: '10px 15px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            width: '60%',
            maxWidth: '300px'
          }}
        />
      </div>

      {filtered.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>No matching enrollments found.</p>
      ) : (
        <div className="reviews-grid">
          {filtered.map((review, idx) => (
            <div key={idx} className="review-card">
              <p><strong>Enrollment:</strong> {review.enrollment}</p>
              <p style={{ color: 'green' }}>✅ Review Submitted</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseReviews;
