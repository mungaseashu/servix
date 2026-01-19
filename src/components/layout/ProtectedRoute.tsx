import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '@/services/api';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const authStatus = isAuthenticated();
    const role = getUserRole();
    setIsAuthenticatedUser(authStatus);
    setUserRole(role);
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!isAuthenticatedUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect based on role
    if (userRole === 'user') {
      return <Navigate to="/" replace />;
    } else if (userRole === 'provider') {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
