import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './DepatCourse.css';

const AddDepartment = () => {
  const [departmentId, setDepartmentId] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Check if HOD is logged in
    const hodToken = localStorage.getItem('hod_token');
    if (!hodToken) {
      navigate('/hod/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/departments', {
        department_id: departmentId,
        name,
      });
      setMessage(response.data.message || 'Department added successfully!');
      setMessageType('success');
      setDepartmentId('');
      setName('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error occurred');
      setMessageType('error');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Department</h2>

      {message && (
        <p className={`form-message ${messageType}`}>{message}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Department ID"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Department Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
        <button type="submit">Add Department</button>
      </form>
    </div>
  );
};

export default AddDepartment;
