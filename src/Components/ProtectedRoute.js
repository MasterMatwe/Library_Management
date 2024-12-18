import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.includes(user.role)) {
    return children;
  } else {
    return <Navigate to="/unauthorized" replace />;
  }
}

export default ProtectedRoute;