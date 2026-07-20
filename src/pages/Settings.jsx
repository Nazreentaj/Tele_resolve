import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Cpu, User, Lock, Shield, Mail } from 'lucide-react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';

export default function Settings() {
  const { currentUser } = useApp();

  const [toastOpen, setToastOpen] = useState(false);

  if (!currentUser) return null;

  return (
    <Box sx={{ p: 4, bgcolor: '#F8FAFC', minHeight: 'calc(100vh - 70px)' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1E3A5F' }}>
          Personal Console Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Configure security credentials, profile avatars, and notification endpoints.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Profile Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', mb: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Security Profile Details
            </Typography>

            <Box display="flex" flexDirection="column" gap={3}>
              <Box display="flex" alignItems="center" gap={2} sx={{ mb: 1 }}>
                <img
                  src={currentUser.avatar}
                  alt="avatar"
                  style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '3px solid #E2E8F0' }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{currentUser.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{currentUser.role} Boundary</Typography>
                </Box>
              </Box>

              <TextField
                label="Full Profile Name"
                value={currentUser.name}
                disabled
                size="medium"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />

              <TextField
                label="Corporate Email ID"
                value={currentUser.email}
                disabled
                size="medium"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />

              <TextField
                label="Domain Clearance Scope"
                value={currentUser.company.toUpperCase()}
                disabled
                size="medium"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
            </Box>
          </Card>
        </Grid>

        {/* Password Reset */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', mb: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Reset Credentials
            </Typography>

            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                label="Current Password"
                type="password"
                placeholder="••••••••"
                size="medium"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />

              <TextField
                label="New Secure Password"
                type="password"
                placeholder="••••••••"
                size="medium"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />

              <TextField
                label="Confirm Secure Password"
                type="password"
                placeholder="••••••••"
                size="medium"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />

              <Button
                variant="contained"
                onClick={() => setToastOpen(true)}
                sx={{ bgcolor: '#1E3A5F', py: 1.25, fontWeight: 600, borderRadius: '8px' }}
              >
                Update Credentials
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: '100%' }}>
          Credentials updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
