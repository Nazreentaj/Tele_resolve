import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MOCK_COMPANIES } from '../MockData';
import {
  Cpu,
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  Layers,
  MapPin,
  TrendingUp,
  History,
  CheckCircle2,
  FileQuestion,
  HelpCircle
} from 'lucide-react';
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

export default function CustomerProfile() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { customers, tickets, calls } = useApp();

  const customer = customers.find((c) => c.id === customerId);

  if (!customer) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">Customer account record not found.</Typography>
        <Button onClick={() => navigate('/customers')} sx={{ mt: 2 }} startIcon={<ArrowLeft size={16} />}>
          Back to Directory
        </Button>
      </Box>
    );
  }

  const company = MOCK_COMPANIES.find((c) => c.id === customer.operator);
  
  // Filter calls and tickets by this customer
  const customerTickets = tickets.filter((t) => t.customer === customer.name);
  const customerCalls = calls.filter((c) => c.customer === customer.name);

  return (
    <Box sx={{ p: 4, bgcolor: '#F8FAFC', minHeight: 'calc(100vh - 70px)' }}>
      {/* Back button */}
      <Button
        onClick={() => navigate('/customers')}
        startIcon={<ArrowLeft size={16} />}
        sx={{ mb: 3, textTransform: 'none', color: '#64748B', fontWeight: 600 }}
      >
        Back to Customer Accounts
      </Button>

      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1E3A5F' }}>
              Customer Profile: {customer.name}
            </Typography>
            <Chip
              label={customer.id}
              size="small"
              sx={{ bgcolor: '#1E3A5F10', color: '#1E3A5F', fontWeight: 600 }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Subscriber Carrier: {company ? company.name : customer.operator.toUpperCase()} | Joined: {customer.joinedDate}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Left Side: Subscriber Profile Details & Recharge History */}
        <Grid item xs={12} lg={5}>
          <Box display="flex" flexDirection="column" gap={3}>
            {/* Demographic Info */}
            <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', mb: 2.5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Account Dossier
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Mail size={16} style={{ color: '#64748B' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">Email Address</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{customer.email}</Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Phone size={16} style={{ color: '#64748B' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">Registered Phone</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{customer.phone}</Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" gap={1.5}>
                  <MapPin size={16} style={{ color: '#64748B' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">Address/Circle</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{customer.location}</Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Layers size={16} style={{ color: '#64748B' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">Active Data Plan</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{customer.plan}</Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" gap={1.5}>
                  <TrendingUp size={16} style={{ color: '#64748B' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">AI satisfaction Sentiment</Typography>
                    <Box display="flex" alignItems="center" gap={1} sx={{ mt: 0.5 }}>
                      <Chip
                        label={`${customer.csatScore}% CSAT`}
                        size="small"
                        sx={{
                          bgcolor: customer.csatScore >= 80 ? '#22C55E15' : customer.csatScore >= 60 ? '#F59E0B15' : '#EF444415',
                          color: customer.csatScore >= 80 ? '#22C55E' : customer.csatScore >= 60 ? '#D97706' : '#EF4444',
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>

            {/* Recharge/Payment History */}
            <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', mb: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Payment & Recharge Ledger
              </Typography>
              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #F1F5F9' }}>
                <Table size="small">
                  <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>Amount</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>Plan Description</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem' }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customer.rechargeHistory.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell sx={{ fontSize: '0.75rem' }}>{row.date}</TableCell>
                        <TableCell sx={{ fontSize: '0.75rem', fontWeight: 600 }}>{row.amount}</TableCell>
                        <TableCell sx={{ fontSize: '0.75rem' }}>{row.plan}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: '0.65rem',
                              fontWeight: 600,
                              bgcolor: row.status === 'Success' ? '#22C55E15' : '#EF444415',
                              color: row.status === 'Success' ? '#22C55E' : '#EF4444'
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Box>
        </Grid>

        {/* Right Side: Account Activity Timeline & Tickets history */}
        <Grid item xs={12} lg={7}>
          <Box display="flex" flexDirection="column" gap={3}>
            {/* Account Activity Timeline */}
            <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', mb: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Audit timeline & Call history
              </Typography>
              <List>
                {customerCalls.map((call, idx) => (
                  <React.Fragment key={idx}>
                    <ListItem sx={{ py: 1.5, alignItems: 'flex-start' }}>
                      <Box sx={{ mr: 2, display: 'flex', mt: 0.5, p: 0.75, borderRadius: '50%', bgcolor: '#1E3A5F10', color: '#1E3A5F' }}>
                        <History size={16} />
                      </Box>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Voice call registered ({call.id})
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary" display="block">
                            Duration: {call.duration} | Intent: {call.intent} | Sentiment: {call.sentiment} <br />
                            AI Summary: {call.summary}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {idx !== customerCalls.length - 1 && <Divider variant="inset" />}
                  </React.Fragment>
                ))}
                {customerCalls.length === 0 && (
                  <Typography variant="body2" color="text.secondary">No historical call records on file.</Typography>
                )}
              </List>
            </Card>

            {/* Support Complaint Ledger */}
            <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', mb: 2.5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Support Ticket History
              </Typography>
              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #F1F5F9' }}>
                <Table size="small">
                  <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem' }}>Ticket ID</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem' }}>Complaint Issue</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem' }}>Agent</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem' }}>Created</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem' }}>Priority</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem' }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customerTickets.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell sx={{ fontSize: '0.8rem', fontWeight: 600 }}>{row.id}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>{row.issue}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>{row.agent}</TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>{row.createdDate}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.priority}
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: '0.65rem',
                              fontWeight: 600,
                              bgcolor: row.priority === 'Critical' ? '#EF444415' : row.priority === 'High' ? '#F59E0B15' : '#E2E8F0',
                              color: row.priority === 'Critical' ? '#EF4444' : row.priority === 'High' ? '#D97706' : '#64748B'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: '0.65rem',
                              fontWeight: 600,
                              bgcolor: row.status === 'Resolved' ? '#22C55E15' : '#0F766E15',
                              color: row.status === 'Resolved' ? '#22C55E' : '#0F766E'
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    {customerTickets.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                          <Typography variant="caption" color="text.secondary">No historical support tickets filed.</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
