import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './SubmitReview.css'; // Assuming you have some CSS for styling

const SubmitReview = () => {
    const { course_id } = useParams();
    const [course, setCourse] = useState(null);
    const [formData, setFormData] = useState({
        review_id: '',
        rating_parameter1: '',
        rating_parameter2: '',
        rating_parameter3: '',
        rating_parameter4: '',
        rating_parameter5: '',
        rating_parameter6: '',
        rating_parameter7: '',
        rating_parameter8: '',
        rating_parameter9: ''
    });

    const enrollment = parseInt(localStorage.getItem('enrollment'));

    useEffect(() => {
        axios.get(`http://localhost:8000/api/courses/${course_id}`)
            .then(res => setCourse(res.data),
            console.log("Enrollment:", enrollment),
console.log("Course ID from URL:", course_id),
console.log("Course data:", course)
    
        )
            .catch(err => console.error("Failed to fetch course", err));
    }, [course_id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate course details
        if (!course || !course.course_id || !course.course_name || !course.faculty_id) {
            alert("Course details are missing. Please try again.");
            return;
        }

        // Validate enrollment
        if (!enrollment) {
            alert("Enrollment is missing. Please log in again.");
            return;
        }

        // Validate form data
        const validateFormData = () => {
            for (let i = 1; i <= 9; i++) {
                const rating = formData[`rating_parameter${i}`];
                if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
                    return false;
                }
            }
            return true;
        };

        if (!validateFormData()) {
            alert("Please provide valid ratings (1-5) for all parameters.");
            return;
        }

        // Generate review_id
        const review_id = `${enrollment}${course.course_id}`;

        // Prepare payload
        const payload = {
            ...formData,
            enrollment,
            review_id,
            course_id: course.course_id,
            course_name: course.course_name,
            faculty_id: course.faculty_id
        };

        try {
            const res = await axios.post('http://localhost:8000/api/reviews', payload);
            alert("Review submitted successfully!");
        } catch (err) {
            console.error("Review submission failed:", err.response?.data || err);
            alert("Failed to submit review. Check the console for more details.");
        }
    };

    if (!course) return <p>Loading course...</p>;

    return (
        <div className="submit-review-container" style={{ padding: "20px" }}>
            <h2>Submit Review</h2>
            <p><strong>Course:</strong> {course.course_name}</p>
            <p><strong>Enrollment:</strong> {enrollment}</p>

            <form onSubmit={handleSubmit}>
                
                    <div >
                        <label>1) Has the Teacher covered entire syllabus as presricbed by University? </label>
                        <input
                            type="number"
                            name={`rating_parameter1`}
                            min="1"
                            max="5"
                            value={formData[`rating_parameter1`]}
                            onChange={handleChange}
                            required
                        />
                        <label>2) Has the teacher covered relevant topics beyond syllabus?</label>
                        <input
                            type="number"
                            name={`rating_parameter2`}
                            min="1"
                            max="5"
                            value={formData[`rating_parameter2`]}
                            onChange={handleChange}
                            required
                        />
                        <label>3) Effectiveness of a teacher in terms of :
                            <p>Technical content , communication skills , use of teaching aids</p>
                        </label>
                        <input
                            type="number"
                            name={`rating_parameter3`}
                            min="1"
                            max="5"
                            value={formData[`rating_parameter3`]}
                            onChange={handleChange}
                            required
                        />
                        <label>4) Pace of which contents are covered</label>
                        <input
                            type="number"
                            name={`rating_parameter4`}
                            min="1"
                            max="5"
                            value={formData[`rating_parameter4`]}
                            onChange={handleChange}
                            required
                        />
                        <label>5) Motivation and insparation for student to team</label>
                        <input
                            type="number"
                            name={`rating_parameter5`}
                            min="1"
                            max="5"
                            value={formData[`rating_parameter5`]}
                            onChange={handleChange}
                            required
                        />
                        <label>6) Support for the development of Students skills<br></br>
                           <p>      Practical skills , Hand on trainings</p>
                        </label>
                        <input
                            type="number"
                            name={`rating_parameter6`}
                            min="1"
                            max="5"
                            value={formData[`rating_parameter6`]}
                            onChange={handleChange}
                            required
                        />
                        <label>7) Clarity of expectation of students</label>
                        <input
                            type="number"
                            name={`rating_parameter7`}
                            min="1"
                            max="5"
                            value={formData[`rating_parameter7`]}
                            onChange={handleChange}
                            required
                        />
                        <label>8) Feedback provided on students progress</label>
                        <input
                            type="number"
                            name={`rating_parameter8`}
                            min="1"
                            max="5"
                            value={formData[`rating_parameter8`]}
                            onChange={handleChange}
                            required
                        />
                        <label>9) Willingness to offer help and advice to students</label>
                        <input
                            type="number"
                            name={`rating_parameter9`}
                            min="1"
                            max="5"
                            value={formData[`rating_parameter9`]}
                            onChange={handleChange}
                            required
                        />
                    </div>
                
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default SubmitReview;
