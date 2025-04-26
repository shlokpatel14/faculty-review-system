import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import './FacultyLogin.css';

const FacultyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/auth/faculty/login', { email, password });

      localStorage.setItem('faculty_token', response.data.token);
      localStorage.setItem('faculty', JSON.stringify(response.data.faculty));
      localStorage.setItem('faculty_id', response.data.faculty.faculty_id);

      navigate('/faculty/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials.');
    }
  };

  return (
    <div className="faculty-login-container">
      <div className="faculty-login-box">
        <h2 className="faculty-login-title">Faculty Login</h2>

        {error && <div className="faculty-login-error">{error}</div>}

        <form onSubmit={handleLogin} className="faculty-login-form">
          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="faculty-login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default FacultyLogin;
