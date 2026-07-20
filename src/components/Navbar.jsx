import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_COMPANIES } from '../MockData';
import {
  Cpu,
  Bell,
  Search,
  Moon,
  Sun,
  ChevronDown,
  Globe
} from 'lucide-react';
import {
  Box,
  IconButton,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Select,
  FormControl,
  Avatar,
  Divider
} from '@mui/material';

export default function Navbar() {
  const {
    currentUser,
    currentTenant,
    switchTenant,
    darkMode,
    toggleDarkMode,
    notifications,
    markNotificationRead
  } = useApp();

  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [profileAnchor, setProfileAnchor] = useState(null);

  if (!currentUser) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleCompanyChange = (event) => {
    switchTenant(event.target.value);
  };

  const getCompanyDetails = () => {
    if (currentTenant === 'global') {
      return { name: 'Global Administrator', logoColor: '#0F766E' };
    }
    return MOCK_COMPANIES.find((c) => c.id === currentTenant) || { name: 'Unknown Tenant', logoColor: '#64748B' };
  };

  const tenantDetails = getCompanyDetails();

  return (
    <Box
      sx={{
        height: 70,
        bgcolor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      {/* Left: Search bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: '#F1F5F9',
          borderRadius: '8px',
          px: 1.5,
          py: 0.75,
          width: 320
        }}
      >
        <Search size={18} style={{ color: '#64748B', marginRight: 8 }} />
        <InputBase
          placeholder="Search calls, tickets, customers..."
          sx={{ fontSize: '0.875rem', width: '100%', fontFamily: 'Inter' }}
        />
      </Box>

      {/* Right: Tenant Switcher, Notifications, Dark Mode, Avatar */}
      <Box display="flex" alignItems="center" gap={2}>
        {/* Tenant Organization Selector */}
        <Box display="flex" alignItems="center" gap={1} sx={{ mr: 2 }}>
          {currentTenant === 'global' ? (
            <Globe size={18} style={{ color: '#1E3A5F' }} />
          ) : (
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: tenantDetails.logoColor
              }}
            />
          )}
          
          <FormControl size="small" variant="outlined">
            <Select
              value={currentTenant}
              onChange={handleCompanyChange}
              disabled={currentUser.role !== 'Admin'}
              sx={{
                fontFamily: 'Inter',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#1E293B',
                '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                bgcolor: '#F8FAFC',
                borderRadius: '8px',
                px: 0.5,
                height: 38,
                '&.Mui-disabled': {
                  opacity: 1,
                  WebkitTextFillColor: '#1E293B'
                }
              }}
            >
              {currentUser.role === 'Admin' ? (
                <>
                  <MenuItem value="global">
                    <span style={{ fontWeight: 600 }}>Global Admin Console</span>
                  </MenuItem>
                  {MOCK_COMPANIES.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </>
              ) : (
                <MenuItem value={currentUser.company}>
                  {tenantDetails.name}
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>

        {/* Dark Mode Toggle */}
        <IconButton onClick={toggleDarkMode} size="medium" sx={{ color: '#64748B' }}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </IconButton>

        {/* Notifications Icon & Popover */}
        <IconButton
          onClick={(e) => setNotificationAnchor(e.currentTarget)}
          size="medium"
          sx={{ color: '#64748B' }}
        >
          <Badge badgeContent={unreadCount} color="error">
            <Bell size={20} />
          </Badge>
        </IconButton>

        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={() => setNotificationAnchor(null)}
          PaperProps={{
            sx: {
              width: 320,
              maxHeight: 400,
              mt: 1.5,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              borderRadius: '8px'
            }
          }}
        >
          <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Live Alerts
            </Typography>
            {unreadCount > 0 && (
              <Typography variant="caption" sx={{ color: '#0F766E', fontWeight: 600 }}>
                {unreadCount} Unread
              </Typography>
            )}
          </Box>
          <Divider />
          {notifications.length === 0 ? (
            <Box p={3} textAlign="center">
              <Typography variant="body2" color="text.secondary">
                No active notifications
              </Typography>
            </Box>
          ) : (
            notifications.map((n) => (
              <MenuItem
                key={n.id}
                onClick={() => {
                  markNotificationRead(n.id);
                  setNotificationAnchor(null);
                }}
                sx={{
                  whiteSpace: 'normal',
                  py: 1.5,
                  bgcolor: n.read ? 'transparent' : 'rgba(15, 118, 110, 0.05)',
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.02)' }
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: n.read ? 400 : 600 }}>
                    {n.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                    Real-time AI Alert
                  </Typography>
                </Box>
              </MenuItem>
            ))
          )}
        </Menu>

        {/* User Profile Info & Menu */}
        <Box
          onClick={(e) => setProfileAnchor(e.currentTarget)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            p: 0.5,
            borderRadius: '8px',
            '&:hover': { bgcolor: '#F8FAFC' }
          }}
        >
          <Avatar
            src={currentUser.avatar}
            sx={{ width: 34, height: 34, border: '2px solid #E2E8F0' }}
          />
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
              {currentUser.name}
            </Typography>
          </Box>
          <ChevronDown size={14} style={{ color: '#64748B' }} />
        </Box>

        <Menu
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={() => setProfileAnchor(null)}
          PaperProps={{ sx: { width: 180, mt: 1.5 } }}
        >
          <MenuItem onClick={() => setProfileAnchor(null)}>My Profile</MenuItem>
          <MenuItem onClick={() => setProfileAnchor(null)}>Security settings</MenuItem>
          <Divider />
          <MenuItem onClick={() => setProfileAnchor(null)}>Help & Documentation</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
