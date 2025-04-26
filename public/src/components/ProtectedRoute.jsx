import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const hodToken = localStorage.getItem('hod_token');

  if (!hodToken) {
    return <Navigate to="/hod/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
