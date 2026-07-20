import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Cpu,
  LayoutDashboard,
  PhoneCall,
  Users,
  Ticket,
  Cpu,
  BookOpen,
  BarChart3,
  FileText,
  Settings,
  Shield,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { Box, Typography, Button, IconButton, Divider } from '@mui/material';

export default function Sidebar() {
  const { currentUser, logout } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  if (!currentUser) return null;

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Live Calls', icon: PhoneCall, path: '/live-calls' },
    { name: 'Customers', icon: Users, path: '/customers' },
    { name: 'Tickets', icon: Ticket, path: '/tickets' },
    { name: 'AI Assistant', icon: Cpu, path: '/ai-analyzer' },
    { name: 'Knowledge Base', icon: BookOpen, path: '/knowledge-base' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
    { name: 'Reports', icon: FileText, path: '/reports' },
    { name: 'Settings', icon: Settings, path: '/settings' }
  ];

  // Admin-only menu items
  if (currentUser.role === 'Admin') {
    menuItems.push({ name: 'Admin Panel', icon: ShieldAlert, path: '/admin' });
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box
      sx={{
        width: collapsed ? 70 : 250,
        minHeight: '100vh',
        bgcolor: '#1E3A5F',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s ease-in-out',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        flexShrink: 0
      }}
    >
      {/* Sidebar Header / Logo */}
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between' }}>
        {!collapsed && (
          <Box display="flex" alignItems="center" gap={1}>
            <Cpu size={24} style={{ color: '#0F766E' }} />
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
              TeleResolve <span style={{ color: '#0F766E' }}>AI</span>
            </Typography>
          </Box>
        )}
        {collapsed && <Cpu size={24} style={{ color: '#0F766E' }} />}
        
        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          size="small"
          sx={{
            color: '#FFFFFF',
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' }
          }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 1 }} />

      {/* Menu Items */}
      <Box sx={{ flexGrow: 1, px: 1.5, py: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              style={({ isActive }) => ({
                textDecoration: 'none',
                color: isActive ? '#FFFFFF' : '#94A3B8',
                backgroundColor: isActive ? '#0F766E' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                borderRadius: '8px',
                transition: 'all 0.2s',
                justifyContent: collapsed ? 'center' : 'flex-start'
              })}
            >
              <Icon size={18} />
              {!collapsed && (
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {item.name}
                </Typography>
              )}
            </NavLink>
          );
        })}
      </Box>

      {/* Sidebar Footer User Info & Logout */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        {!collapsed && (
          <Box display="flex" alignItems="center" gap={1.5} sx={{ mb: 2 }}>
            <img
              src={currentUser.avatar}
              alt="avatar"
              style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
            />
            <Box overflow="hidden">
              <Typography variant="body2" noWrap sx={{ fontWeight: 600 }}>
                {currentUser.name}
              </Typography>
              <Typography variant="caption" noWrap display="block" sx={{ color: '#94A3B8' }}>
                {currentUser.role}
              </Typography>
            </Box>
          </Box>
        )}
        
        <Button
          fullWidth
          variant="text"
          onClick={handleLogout}
          sx={{
            color: '#EF4444',
            justifyContent: collapsed ? 'center' : 'flex-start',
            px: collapsed ? 0 : 1.5,
            gap: 1.5,
            textTransform: 'none',
            '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' }
          }}
        >
          <LogOut size={18} />
          {!collapsed && <Typography variant="body2">Logout</Typography>}
        </Button>
      </Box>
    </Box>
  );
}
