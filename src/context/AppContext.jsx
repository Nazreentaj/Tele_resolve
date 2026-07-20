import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MOCK_USERS,
  MOCK_COMPANIES,
  MOCK_CALLS,
  MOCK_TICKETS,
  MOCK_CUSTOMERS,
  MOCK_KB,
  MOCK_AUDIT_LOGS,
  MOCK_DEPARTMENTS
} from '../MockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Authentication & Tenancy
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTenant, setCurrentTenant] = useState('global'); // 'global' or companyId (e.g. 'airtel')
  const [jwtToken, setJwtToken] = useState(null);

  // Stateful databases
  const [calls, setCalls] = useState(MOCK_CALLS);
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [kbArticles, setKbArticles] = useState(MOCK_KB);
  const [auditLogs, setAuditLogs] = useState(MOCK_AUDIT_LOGS);
  const [departments, setDepartments] = useState(MOCK_DEPARTMENTS);

  // App UI state
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Critical Outage alert detected in Mumbai West (Jio)', type: 'error', read: false },
    { id: 2, message: 'New escalated ticket assigned to Priya Patel (Vi)', type: 'warning', read: false }
  ]);

  // AI Configuration Settings
  const [aiSettings, setAiSettings] = useState({
    autoTranscription: true,
    sentimentSensitivity: 75,
    autoTicketGeneration: false,
    confidenceThreshold: 80,
    modelSelected: 'Gemini 1.5 Pro'
  });

  // Load session on startup
  useEffect(() => {
    const savedToken = localStorage.getItem('teleresolve_token');
    const savedUser = localStorage.getItem('teleresolve_user');
    const savedTenant = localStorage.getItem('teleresolve_tenant');
    if (savedToken && savedUser) {
      setJwtToken(savedToken);
      const parsedUser = JSON.parse(savedUser);
      setCurrentUser(parsedUser);
      setCurrentTenant(savedTenant || (parsedUser.role === 'Admin' ? 'global' : parsedUser.company));
    }
  }, []);

  // Action methods
  const login = (email, password, isAdmin, selectedCompany) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() &&
                 (isAdmin ? u.role === 'Admin' : u.role !== 'Admin')
        );

        if (!foundUser) {
          reject(new Error('Invalid email credentials or role selection.'));
          return;
        }

        // Validate corporate password simulation
        if (password !== 'password' && password !== foundUser.role.toLowerCase()) {
          reject(new Error('Incorrect password. Please use role name in lowercase (e.g. "admin", "agent", "password").'));
          return;
        }

        // Simulate JWT Generation
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(
          JSON.stringify({
            sub: foundUser.id,
            name: foundUser.name,
            role: foundUser.role,
            company: isAdmin ? 'global' : selectedCompany,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8 // 8 hours expiry
          })
        );
        const signature = 'mock_signature_teleresolve_secret';
        const generatedToken = `${header}.${payload}.${signature}`;

        // Save session
        localStorage.setItem('teleresolve_token', generatedToken);
        localStorage.setItem('teleresolve_user', JSON.stringify(foundUser));
        
        const tenant = isAdmin ? 'global' : selectedCompany;
        localStorage.setItem('teleresolve_tenant', tenant);

        setJwtToken(generatedToken);
        setCurrentUser(foundUser);
        setCurrentTenant(tenant);

        // Add audit log
        addAuditLog(`User logged in (${foundUser.role})`, tenant, foundUser.name);
        resolve(foundUser);
      }, 800); // simulated network delay
    });
  };

  const logout = () => {
    if (currentUser) {
      addAuditLog('User logged out', currentTenant, currentUser.name);
    }
    localStorage.removeItem('teleresolve_token');
    localStorage.removeItem('teleresolve_user');
    localStorage.removeItem('teleresolve_tenant');
    setJwtToken(null);
    setCurrentUser(null);
    setCurrentTenant('global');
  };

  const switchTenant = (tenantId) => {
    if (currentUser && currentUser.role === 'Admin') {
      setCurrentTenant(tenantId);
      localStorage.setItem('teleresolve_tenant', tenantId);
      addAuditLog(`Admin switched active tenant view to: ${tenantId.toUpperCase()}`, 'global', currentUser.name);
    }
  };

  const addTicket = (ticketData) => {
    const newTicket = {
      id: `TR-TKT-${100 + tickets.length + 1}`,
      createdDate: new Date().toISOString().split('T')[0],
      resolutionTime: '--',
      ...ticketData
    };
    setTickets((prev) => [newTicket, ...prev]);
    addAuditLog(`Created Ticket ${newTicket.id}: ${newTicket.issue}`, newTicket.operator, currentUser?.name || 'System');
    return newTicket;
  };

  const updateTicketStatus = (ticketId, status) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status } : t))
    );
    const updated = tickets.find((t) => t.id === ticketId);
    if (updated) {
      addAuditLog(`Updated Ticket ${ticketId} status to: ${status}`, updated.operator, currentUser?.name || 'System');
    }
  };

  const addAuditLog = (action, company, userName) => {
    const log = {
      time: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: userName || currentUser?.name || 'System',
      action,
      company: company || 'global',
      ip: '192.168.10.87'
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const updateAiSettings = (newSettings) => {
    setAiSettings(prev => ({ ...prev, ...newSettings }));
    addAuditLog('Modified global AI configuration', 'global', currentUser?.name);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentTenant,
        jwtToken,
        calls,
        tickets,
        customers,
        kbArticles,
        auditLogs,
        departments,
        darkMode,
        notifications,
        aiSettings,
        login,
        logout,
        switchTenant,
        addTicket,
        updateTicketStatus,
        addAuditLog,
        toggleDarkMode,
        updateAiSettings,
        markNotificationRead,
        setCalls,
        setTickets,
        setCustomers
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
