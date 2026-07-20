import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MOCK_COMPANIES } from '../MockData';
import { Cpu, Eye, EyeOff, Lock, Mail, Building2, Shield, User } from 'lucide-react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  Tabs,
  Tab
} from '@mui/material';

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();

  // Role Selection (0 = Admin, 1 = User)
  const [roleTab, setRoleTab] = useState(1);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('jio');
  const [rememberMe, setRememberMe] = useState(false);

  // Form State
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Validation
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Corporate email or ID is required';
    } else if (roleTab === 1 && !email.includes('@') && email.length < 5) {
      errors.email = 'Please enter a valid Employee ID or email';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!validateForm()) return;

    setLoading(true);
    const isAdmin = roleTab === 0;

    try {
      const user = await login(email, password, isAdmin, company);
      setSuccessMsg(`Welcome back, ${user.name}! Redirecting...`);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      setErrorMsg(err.message);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: '#F8FAFC',
        flexDirection: { xs: 'column', md: 'row' }
      }}
    >
      {/* Left Side: Professional corporate illustration and marketing copy */}
      <Box
        sx={{
          flex: 1.1,
          bgcolor: '#1E3A5F',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 6,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Background Art Elements */}
        <Box
          sx={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            border: '2px dashed rgba(15, 118, 110, 0.15)',
            top: '-10%',
            right: '-10%',
            pointerEvents: 'none'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            border: '1px dashed rgba(255, 255, 255, 0.05)',
            bottom: '-5%',
            left: '-5%',
            pointerEvents: 'none'
          }}
        />

        {/* Corporate Support Graphic Representation */}
        <Box sx={{ position: 'relative', zIndex: 2, mb: 4, maxWidth: 420 }}>
          <Box
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 3,
              p: 4,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
            }}
          >
            {/* Top Telecom Towers & Cloud Graphic in SVGs */}
            <svg width="240" height="130" viewBox="0 0 240 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto' }}>
              <path d="M120 10 L120 120" stroke="#0F766E" strokeWidth="3" strokeDasharray="4 4" />
              <circle cx="120" cy="10" r="6" fill="#0F766E" />
              <path d="M100 20 C110 15 130 15 140 20" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M90 35 C105 25 135 25 150 35" stroke="#94A3B8" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* Server base */}
              <rect x="70" y="85" width="100" height="30" rx="4" fill="#1E293B" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              <circle cx="85" cy="100" r="3" fill="#22C55E" />
              <circle cx="95" cy="100" r="3" fill="#22C55E" />
              <rect x="115" y="97" width="40" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
              {/* Operators left & right */}
              <circle cx="40" cy="90" r="16" fill="#0F766E" />
              <path d="M30 106 C30 96 50 96 50 106" fill="#0F766E" />
              <circle cx="200" cy="90" r="16" fill="#0F766E" />
              <path d="M190 106 C190 96 210 96 210 106" fill="#0F766E" />
            </svg>
            <Typography variant="body2" sx={{ mt: 3, fontWeight: 500, color: '#E2E8F0' }}>
              TeleResolve Core AI Engine Active
            </Typography>
            <Box display="flex" justifyContent="center" gap={1.5} sx={{ mt: 1.5 }}>
              <Box sx={{ px: 1.5, py: 0.5, bgcolor: '#22C55E', borderRadius: 1, fontSize: '10px', fontWeight: 600 }}>JIO: UP</Box>
              <Box sx={{ px: 1.5, py: 0.5, bgcolor: '#22C55E', borderRadius: 1, fontSize: '10px', fontWeight: 600 }}>AIRTEL: UP</Box>
              <Box sx={{ px: 1.5, py: 0.5, bgcolor: '#F59E0B', borderRadius: 1, fontSize: '10px', fontWeight: 600 }}>VI: DEGRADED</Box>
            </Box>
          </Box>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, letterSpacing: -0.5 }}>
          TeleResolve AI
        </Typography>
        <Typography variant="body1" sx={{ color: '#E2E8F0', maxWidth: 440, mx: 'auto', lineHeight: 1.6, fontWeight: 500 }}>
          "Empowering Telecom Customer Support with AI-Driven Intelligence"
        </Typography>
      </Box>

      {/* Right Side: Authentication Card */}
      <Box
        sx={{
          flex: 0.9,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 450,
            p: 4.5,
            borderRadius: '8px',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
            border: '1px solid #E2E8F0',
            bgcolor: '#FFFFFF'
          }}
        >
          {/* Logo & Intro */}
          <Box display="flex" alignItems="center" gap={1} sx={{ mb: 1 }}>
            <Cpu size={28} style={{ color: '#0F766E' }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1E3A5F' }}>
              TeleResolve AI
            </Typography>
          </Box>
          <Typography variant="caption" display="block" sx={{ color: '#64748B', fontWeight: 600, mb: 4, textTransform: 'uppercase', letterSpacing: 0.8 }}>
            Enterprise Telecom Customer Care Intelligence Platform
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B', mb: 1 }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Sign in to continue to your dashboard.
          </Typography>

          {/* Role Segmented Controller */}
          <Tabs
            value={roleTab}
            onChange={(e, val) => {
              setRoleTab(val);
              setErrorMsg(null);
              setValidationErrors({});
            }}
            variant="fullWidth"
            sx={{
              mb: 3.5,
              bgcolor: '#F1F5F9',
              borderRadius: '8px',
              p: 0.5,
              minHeight: 40,
              '.MuiTabs-indicator': {
                bgcolor: '#FFFFFF',
                borderRadius: '6px',
                height: '100%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                zIndex: 1
              }
            }}
          >
            <Tab
              label={
                <Box display="flex" alignItems="center" gap={1} sx={{ zIndex: 2, textTransform: 'none', fontWeight: 600 }}>
                  <Shield size={16} />
                  <span>Admin Login</span>
                </Box>
              }
              sx={{ minHeight: 34, py: 1 }}
            />
            <Tab
              label={
                <Box display="flex" alignItems="center" gap={1} sx={{ zIndex: 2, textTransform: 'none', fontWeight: 600 }}>
                  <User size={16} />
                  <span>User Login</span>
                </Box>
              }
              sx={{ minHeight: 34, py: 1 }}
            />
          </Tabs>

          {/* Notifications / Error alerts */}
          {errorMsg && (
            <Alert severity="error" sx={{ mb: 3, fontSize: '0.85rem' }}>
              {errorMsg}
            </Alert>
          )}
          {successMsg && (
            <Alert severity="success" sx={{ mb: 3, fontSize: '0.85rem' }}>
              {successMsg}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <Box display="flex" flexDirection="column" gap={2.5}>
              {/* Username Field */}
              <TextField
                label={roleTab === 0 ? 'Admin ID or Corporate Email' : 'Employee ID or Corporate Email'}
                placeholder={roleTab === 0 ? 'admin@teleresolve.ai' : 'agent.rahul@jio.com'}
                variant="outlined"
                fullWidth
                size="medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(validationErrors.email)}
                helperText={validationErrors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={18} style={{ color: '#94A3B8' }} />
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                  '& label': { fontFamily: 'Inter' }
                }}
              />

              {/* Password Field */}
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                variant="outlined"
                fullWidth
                size="medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(validationErrors.password)}
                helperText={validationErrors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={18} style={{ color: '#94A3B8' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: '8px' }
                }}
              />

              {/* User Mode: Company Selector */}
              {roleTab === 1 && (
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="company-label" sx={{ fontFamily: 'Inter' }}>Telecom Company</InputLabel>
                  <Select
                    labelId="company-label"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    label="Telecom Company"
                    startAdornment={
                      <InputAdornment position="start" sx={{ mr: 1 }}>
                        <Building2 size={18} style={{ color: '#94A3B8' }} />
                      </InputAdornment>
                    }
                    sx={{ borderRadius: '8px', fontFamily: 'Inter' }}
                  >
                    {MOCK_COMPANIES.map((c) => (
                      <MenuItem key={c.id} value={c.id} style={{ fontFamily: 'Inter' }}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {/* Options */}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      size="small"
                      sx={{ color: '#64748B', '&.Mui-checked': { color: '#0F766E' } }}
                    />
                  }
                  label={<Typography variant="body2" color="text.secondary">Remember Me</Typography>}
                />
                <Button
                  variant="text"
                  sx={{
                    textTransform: 'none',
                    color: '#0F766E',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
                  }}
                >
                  Forgot Password?
                </Button>
              </Box>

              {/* Primary Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  bgcolor: '#1E3A5F',
                  color: '#FFFFFF',
                  py: 1.5,
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#142842',
                    boxShadow: 'none'
                  }
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: '#FFFFFF' }} />
                ) : roleTab === 0 ? (
                  'Login as Admin'
                ) : (
                  'Login as User'
                )}
              </Button>
            </Box>
          </form>
        </Card>

        {/* Footer */}
        <Typography variant="caption" sx={{ color: '#94A3B8', mt: 4 }}>
          © 2026 TeleResolve AI • Enterprise Platform
        </Typography>
      </Box>
    </Box>
  );
}
