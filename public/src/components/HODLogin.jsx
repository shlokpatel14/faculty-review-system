import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import './HODLogin.css';
const HodLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('auth/hod/login', { email, password });

      localStorage.setItem('hod_token', response.data.token);
      localStorage.setItem('hod', JSON.stringify(response.data.hod));

      navigate('dashboard');
    } catch (err) {
      if (err.response?.status === 422) {
        setError('Invalid email or password.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">HOD Login</h2>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="example@college.edu"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default HodLogin;
