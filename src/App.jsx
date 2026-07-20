import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LiveCalls from './pages/LiveCalls';
import CallDetails from './pages/CallDetails';
import AIAnalyzer from './pages/AIAnalyzer';
import Tickets from './pages/Tickets';
import Customers from './pages/Customers';
import CustomerProfile from './pages/CustomerProfile';
import KnowledgeBase from './pages/KnowledgeBase';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import AdminPanel from './pages/AdminPanel';
import Settings from './pages/Settings';
import { Box } from '@mui/material';

export default function App() {
  return (
    <Routes>
      {/* Public Login Route */}
      <Route path="/login" element={<Login />} />
      
      {/* Protected Console App Routes */}
      <Route
        path="/*"
        element={
          <RoleProtectedRoute>
            <LayoutShell />
          </RoleProtectedRoute>
        }
      />
    </Routes>
  );
}

function LayoutShell() {
  const { darkMode } = useApp();

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        width: '100vw',
        overflow: 'hidden',
        bgcolor: darkMode ? '#111827' : '#F8FAFC',
        color: darkMode ? '#F9FAFB' : '#1F2937',
        // Invert some styling if darkMode is active
        transition: 'background-color 0.2s, color 0.2s',
        '& .MuiPaper-root': darkMode ? {
          bgcolor: '#1F2937',
          borderColor: '#374151',
          color: '#F9FAFB'
        } : {},
        '& .MuiTableCell-root': darkMode ? {
          color: '#E5E7EB',
          borderColor: '#374151'
        } : {},
        '& .MuiTableCell-head': darkMode ? {
          bgcolor: '#111827',
          color: '#F3F4F6'
        } : {},
        '& .MuiInputBase-root': darkMode ? {
          color: '#F9FAFB',
          bgcolor: '#374151',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#4B5563' }
        } : {}
      }}
    >
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Container */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
        {/* Top Navbar */}
        <Navbar />

        {/* Console Content Window */}
        <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/live-calls" element={<LiveCalls />} />
            <Route path="/live-calls/:callId" element={<CallDetails />} />
            <Route path="/ai-analyzer" element={<AIAnalyzer />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:customerId" element={<CustomerProfile />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Global Admin Restricted Panel */}
            <Route
              path="/admin"
              element={
                <RoleProtectedRoute allowedRoles={['Admin']}>
                  <AdminPanel />
                </RoleProtectedRoute>
              }
            />

            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}
