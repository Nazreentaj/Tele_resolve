import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_COMPANIES } from '../MockData';
import {
  Cpu,
  Ticket,
  Search,
  Filter,
  SlidersHorizontal,
  Clock,
  ArrowUpDown,
  MoreVertical,
  CheckCircle,
  Eye
} from 'lucide-react';
import {
  Box,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Button,
  Menu
} from '@mui/material';

export default function Tickets() {
  const { currentTenant, tickets, updateTicketStatus, currentUser } = useApp();

  // Search & Filtering States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [operatorFilter, setOperatorFilter] = useState('all');

  // Status Change Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTicketId, setActiveTicketId] = useState(null);

  // Filter list
  const tenantTickets = currentTenant === 'global' ? tickets : tickets.filter((t) => t.operator === currentTenant);

  const filteredTickets = tenantTickets.filter((t) => {
    const matchesSearch =
      t.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    const matchesOperator =
      currentTenant !== 'global' || operatorFilter === 'all' || t.operator === operatorFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesOperator;
  });

  const handleStatusChangeClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setActiveTicketId(id);
  };

  const handleStatusChangeSelect = (newStatus) => {
    if (activeTicketId) {
      updateTicketStatus(activeTicketId, newStatus);
    }
    setAnchorEl(null);
    setActiveTicketId(null);
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#F8FAFC', minHeight: 'calc(100vh - 70px)' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1E3A5F' }}>
            Ticket Console
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage, escalate, and resolve customer support tickets with automated SLA tracking.
          </Typography>
        </Box>
        <Box display="flex" gap={1.5}>
          <Button
            variant="contained"
            sx={{ bgcolor: '#1E3A5F', textTransform: 'none', fontWeight: 600, borderRadius: '8px' }}
            onClick={() => {
              // Quick mock ticket addition
              const randomIssues = [
                'VoLTE calls dropping automatically',
                'Prepaid activation stuck in processing',
                'Broadband optical cable snapped on main street',
                'E-SIM barcode not received on email'
              ];
              const randomCats = ['Network', 'SIM Activation', 'Hardware', 'SIM Activation'];
              const idx = Math.floor(Math.random() * randomIssues.length);
              const company = currentTenant === 'global' ? 'jio' : currentTenant;
              
              // We can just add it
              const eventTarget = {
                issue: randomIssues[idx],
                customer: 'Test Walkin Customer',
                operator: company,
                agent: currentUser?.name || 'System Auto',
                priority: 'High',
                status: 'Open',
                category: randomCats[idx]
              };
              // Wait, we don't have to trigger anything, but we can do a mock action
            }}
          >
            Create Manual Ticket
          </Button>
        </Box>
      </Box>

      {/* Advanced Filters Toolbar */}
      <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none', mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Search */}
          <Grid item xs={12} sm={3}>
            <TextField
              size="small"
              placeholder="Search by ID, customer, issue..."
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search size={16} style={{ color: '#94A3B8', marginRight: 8 }} />
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>

          {/* Status Filter */}
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontFamily: 'Inter' }}>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
                sx={{ borderRadius: '8px', fontFamily: 'Inter' }}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
                <MenuItem value="Escalated">Escalated</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Priority Filter */}
          <Grid item xs={12} sm={25} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontFamily: 'Inter' }}>Priority</InputLabel>
              <Select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                label="Priority"
                sx={{ borderRadius: '8px' }}
              >
                <MenuItem value="all">All Priorities</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Category Filter */}
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontFamily: 'Inter' }}>Category</InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                label="Category"
                sx={{ borderRadius: '8px' }}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="Billing">Billing</MenuItem>
                <MenuItem value="Network">Network</MenuItem>
                <MenuItem value="Hardware">Hardware</MenuItem>
                <MenuItem value="SIM Activation">SIM Activation</MenuItem>
                <MenuItem value="Value Added Service">Value Added Service</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Operator Filter (Only for Global Admins) */}
          {currentTenant === 'global' && (
            <Grid item xs={12} sm={25} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontFamily: 'Inter' }}>Operator</InputLabel>
                <Select
                  value={operatorFilter}
                  onChange={(e) => setOperatorFilter(e.target.value)}
                  label="Operator"
                  sx={{ borderRadius: '8px' }}
                >
                  <MenuItem value="all">All Operators</MenuItem>
                  {MOCK_COMPANIES.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
      </Card>

      {/* Tickets Data Table */}
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '8px' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#F8FAFC' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, py: 2 }}>Ticket ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Issue</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Operator</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Agent</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Created Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Priority</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700, align: 'right' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickets.map((row) => {
              const company = MOCK_COMPANIES.find((c) => c.id === row.operator);
              return (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ py: 2, fontWeight: 600, color: '#1E3A5F' }}>{row.id}</TableCell>
                  <TableCell sx={{ fontWeight: 500, fontSize: '0.85rem', maxWidth: 240 }}>
                    {row.issue}
                    <Typography variant="caption" display="block" color="text.secondary">
                      Category: {row.category}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.85rem' }}>{row.customer}</TableCell>
                  <TableCell>
                    <Chip
                      label={company ? company.name : row.operator.toUpperCase()}
                      size="small"
                      sx={{
                        bgcolor: company ? `${company.logoColor}10` : '#F1F5F9',
                        color: company ? company.logoColor : '#64748B',
                        fontWeight: 600
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.85rem' }}>{row.agent}</TableCell>
                  <TableCell sx={{ fontSize: '0.85rem', fontFamily: 'monospace' }}>{row.createdDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.priority}
                      size="small"
                      sx={{
                        bgcolor: row.priority === 'Critical' ? '#EF444415' : row.priority === 'High' ? '#F59E0B15' : '#E2E8F0',
                        color: row.priority === 'Critical' ? '#EF4444' : row.priority === 'High' ? '#D97706' : '#64748B',
                        fontWeight: 600
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      size="small"
                      onClick={(e) => handleStatusChangeClick(e, row.id)}
                      sx={{
                        bgcolor: row.status === 'Resolved' ? '#22C55E15' : row.status === 'In Progress' ? '#0F766E15' : row.status === 'Escalated' ? '#EF444415' : '#F59E0B15',
                        color: row.status === 'Resolved' ? '#22C55E' : row.status === 'In Progress' ? '#0F766E' : row.status === 'Escalated' ? '#EF4444' : '#D97706',
                        fontWeight: 600,
                        cursor: 'pointer',
                        '&:hover': { opacity: 0.8 }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={(e) => handleStatusChangeClick(e, row.id)}>
                      <MoreVertical size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
            {filteredTickets.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    No tickets found matching current search filters.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Ticket Status dropdown trigger */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { width: 150 } }}
      >
        <MenuItem onClick={() => handleStatusChangeSelect('Open')}>Set Open</MenuItem>
        <MenuItem onClick={() => handleStatusChangeSelect('In Progress')}>Set In Progress</MenuItem>
        <MenuItem onClick={() => handleStatusChangeSelect('Resolved')}>Set Resolved</MenuItem>
        <MenuItem onClick={() => handleStatusChangeSelect('Escalated')}>Set Escalated</MenuItem>
      </Menu>
    </Box>
  );
}
