import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MOCK_COMPANIES } from '../MockData';
import { Cpu, Search, User, Phone, MapPin, ExternalLink } from 'lucide-react';
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
  Button,
  Chip
} from '@mui/material';

export default function Customers() {
  const { currentTenant, customers } = useApp();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  // Tenant Boundary Filtering
  const tenantCustomers = currentTenant === 'global' ? customers : customers.filter((c) => c.operator === currentTenant);

  const filteredCustomers = tenantCustomers.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Box sx={{ p: 4, bgcolor: '#F8FAFC', minHeight: 'calc(100vh - 70px)' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1E3A5F' }}>
          Customer Accounts Directory
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Browse customer subscriber records, active data plans, billing history, and CSAT scores.
        </Typography>
      </Box>

      {/* Filter Toolbar */}
      <Card sx={{ p: 2.5, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none', mb: 3 }}>
        <Box display="flex" gap={2} alignItems="center" maxWidth={400}>
          <TextField
            size="small"
            placeholder="Search by name, phone, customer ID..."
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search size={16} style={{ color: '#94A3B8', marginRight: 8 }} />
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Box>
      </Card>

      {/* Customer Table */}
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '8px' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#F8FAFC' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, py: 2 }}>Customer ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Subscriber Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Mobile Number</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Operator</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Active Plan</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>CSAT Rating</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 700, align: 'right' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((cust) => {
              const company = MOCK_COMPANIES.find((c) => c.id === cust.operator);
              return (
                <TableRow key={cust.id} hover>
                  <TableCell sx={{ py: 2, fontWeight: 600, color: '#1E3A5F' }}>{cust.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{cust.name}</TableCell>
                  <TableCell sx={{ fontSize: '0.85rem', fontFamily: 'monospace' }}>{cust.phone}</TableCell>
                  <TableCell>
                    <Chip
                      label={company ? company.name : cust.operator.toUpperCase()}
                      size="small"
                      sx={{
                        bgcolor: company ? `${company.logoColor}10` : '#F1F5F9',
                        color: company ? company.logoColor : '#64748B',
                        fontWeight: 600
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.85rem' }}>{cust.plan}</TableCell>
                  <TableCell>
                    <Chip
                      label={`${cust.csatScore}%`}
                      size="small"
                      sx={{
                        bgcolor: cust.csatScore >= 85 ? '#22C55E15' : cust.csatScore >= 60 ? '#F59E0B15' : '#EF444415',
                        color: cust.csatScore >= 85 ? '#22C55E' : cust.csatScore >= 60 ? '#D97706' : '#EF4444',
                        fontWeight: 600
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.85rem' }}>{cust.location}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ExternalLink size={14} />}
                      onClick={() => navigate(`/customers/${cust.id}`)}
                      sx={{
                        textTransform: 'none',
                        borderColor: '#E2E8F0',
                        color: '#1E3A5F',
                        borderRadius: '6px',
                        fontWeight: 600,
                        '&:hover': { bgcolor: '#F8FAFC', borderColor: '#CBD5E1' }
                      }}
                    >
                      Profile
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {filteredCustomers.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    No customer accounts matching current search filters.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
