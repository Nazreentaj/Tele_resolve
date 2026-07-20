import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Box, Typography, Button } from '@mui/material';

export default function RoleProtectedRoute({ children, allowedRoles }) {
  const { currentUser, jwtToken } = useApp();
  const token = localStorage.getItem('teleresolve_token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If session is still resolving on mount, wait.
  if (token && !currentUser) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="body1" color="text.secondary">
          Restoring secure corporate session...
        </Typography>
      </Box>
    );
  }

  if (currentUser && allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
        p={4}
        textAlign="center"
      >
        <Typography variant="h4" color="error" gutterBottom sx={{ fontWeight: 600 }}>
          Security Violation
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
          Your security role ({currentUser.role}) does not grant permission to view this panel. 
          This access attempt has been logged in the audit trace.
        </Typography>
        <Button variant="contained" href="/" sx={{ bgcolor: '#1E3A5F' }}>
          Return to Dashboard
        </Button>
      </Box>
    );
  }

  return children;
}
