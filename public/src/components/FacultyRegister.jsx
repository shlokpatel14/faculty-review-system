import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import './FacultyRegister.css'; // External CSS file


const FacultyRegister = () => {
  const [formData, setFormData] = useState({
    faculty_id: '',
    name: '',
    email: '',
    password: '',
    mobile_no: '',
    department_id: '',
    branch: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('hod_token');
    if (!token) {
      setError('Unauthorized access. Only HOD can register faculty.');
      return;
    }

    try {
      const response = await axios.post('/auth/faculty/register', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess('Faculty registered successfully.');
      setFormData({
        faculty_id: '',
        name: '',
        email: '',
        password: '',
        mobile_no: '',
        department_id: '',
        branch: '',
      });
    } catch (err) {
      if (err.response?.status === 422) {
        setError('Validation error. Please check your inputs.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="faculty-register-container">
      <form className="faculty-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Faculty Registration</h2>

        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}

        {['faculty_id', 'name', 'email', 'password', 'mobile_no', 'department_id', 'branch'].map(field => (
          <div key={field} className="form-group">
            <label>{field.replace('_', ' ').toUpperCase()}</label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required={field !== 'department_id'} // department_id is nullable
            />
          </div>
        ))}

        <button type="submit" className="submit-btn">Register Faculty</button>
      </form>
    </div>
  );
};

export default FacultyRegister;
