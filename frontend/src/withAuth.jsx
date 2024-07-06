import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const withAuth = (Component) => {
  const AuthHOC = (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login'); // Redirect to login page if not authenticated
      }
    }, [isAuthenticated, navigate]);

    return <Component {...props} />;
  };

  return AuthHOC;
};

export default withAuth;