import React, { useState } from 'react';
import axios from 'axios';
import './studentAuth.css';
import { useNavigate } from 'react-router-dom';

const StudentAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    enrollment: '',
    name: '',
    email: '',
    password: '',
    mobile_no: '',
    department_id: '',
    semester: '',
    branch: ''
  });
  const [loginData, setLoginData] = useState({ enrollment: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "department_id" ? parseInt(value) : value;
    setForm({ ...form, [name]: newValue });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const validateRegister = () => {
    const { enrollment, name, email, password, mobile_no, semester, department_id, branch } = form;
    if (!enrollment || !name || !email || !password || !mobile_no || !semester || !department_id || !branch) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateRegister()) return;

    try {
      const res = await axios.post('http://localhost:8000/api/auth/student/register', form, {
        withCredentials: true
      });
      setSuccess("Registered successfully. You can now log in.");
      setForm({
        enrollment: '', name: '', email: '', password: '',
        mobile_no: '', semester: '', department_id: '', branch: ''
      });
      setError('');
      navigate('/student/login');
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginData.enrollment || !loginData.password) {
      setError("Enrollment and password are required.");
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/auth/student/login', loginData, {
        withCredentials: true
      });

      const { token, student } = res.data;
      localStorage.setItem('student_token', token);
      localStorage.setItem('enrollment', loginData.enrollment);
      localStorage.setItem('student', JSON.stringify(student));
      localStorage.setItem('department_id', student.department_id);
      localStorage.setItem('semester', student.semester);

      setSuccess("Login successful!");
      setError('');
      navigate('dashboard');
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="auth-box">
      <h2 className="auth-title">{isLogin ? 'Student Login' : 'Student Registration'}</h2>

      {error && <p className="auth-error">{error}</p>}
      {success && <p className="auth-success">{success}</p>}

      <form onSubmit={isLogin ? handleLogin : handleRegister} className="auth-form">
        {!isLogin && (
          <>
            <div className="form-group">
              <label>Enrollment</label>
              <input type="number" name="enrollment" value={form.enrollment} onChange={handleRegisterChange} />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={form.name} onChange={handleRegisterChange} />
            </div>
            <div className="form-group">
              <label>Branch</label>
              <input type="text" name="branch" value={form.branch} onChange={handleRegisterChange} />
            </div>
            <div className="form-group">
              <label>Mobile No</label>
              <input type="text" name="mobile_no" value={form.mobile_no} onChange={handleRegisterChange} />
            </div>
            <div className="form-group">
              <label>Semester</label>
              <input type="number" name="semester" value={form.semester} onChange={handleRegisterChange} />
            </div>
            <div className='form-group'>
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleRegisterChange} />
            </div>
            <div className="form-group">
              <label>Department</label>
              <select name="department_id" value={form.department_id} onChange={handleRegisterChange}>
                <option value="">Select Department</option>
                <option value="12">Computer Engineering</option>
                <option value="16">Information Technology</option>
                <option value="10">Electrical Engineering</option>
                <option value="08">Mechanical Engineering</option>
              </select>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" value={form.password} onChange={handleRegisterChange} />
            </div>
          </>
        )}

        {isLogin && (
          <>
            <div className="form-group">
              <label><b>Enrollment</b></label>
              <input
                type="number"
                name="enrollment"
                value={loginData.enrollment}
                onChange={handleLoginChange}
              />
            </div>
            <div className="form-group">
              <label><b>Password</b></label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
              />
            </div>
          </>
        )}

        <button type="submit" className="auth-button">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <button onClick={toggleMode} className="auth-toggle">
        {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default StudentAuth;
