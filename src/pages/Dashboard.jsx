import React from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_COMPANIES } from '../MockData';
import {
  Cpu,
  Phone,
  PhoneCall,
  CheckCircle,
  Clock,
  AlertTriangle,
  Smile,
  Hourglass,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp
} from 'lucide-react';
import {
  Box,
  Grid,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

export default function Dashboard() {
  const { currentTenant, calls, tickets, customers, auditLogs } = useApp();

  // 1. Data boundaries based on current tenant
  const tenantCalls = currentTenant === 'global' ? calls : calls.filter((c) => c.operator === currentTenant);
  const tenantTickets = currentTenant === 'global' ? tickets : tickets.filter((t) => t.operator === currentTenant);
  const tenantCustomers = currentTenant === 'global' ? customers : customers.filter((cust) => cust.operator === currentTenant);
  const tenantLogs = currentTenant === 'global' ? auditLogs : auditLogs.filter((log) => log.company === currentTenant);

  // 2. Metric Calculations
  const totalCallsCount = tenantCalls.length * 14 + 18; // scale metrics realistically
  const activeCallsCount = tenantCalls.filter(c => c.status === 'Active').length;
  
  const resolvedTicketsCount = tenantTickets.filter(t => t.status === 'Resolved').length;
  const pendingTicketsCount = tenantTickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length;
  const escalatedTicketsCount = tenantTickets.filter(t => t.status === 'Escalated').length;
  
  // Calculate average CSAT
  const avgCsat = tenantCustomers.length > 0
    ? Math.round(tenantCustomers.reduce((acc, c) => acc + c.csatScore, 0) / tenantCustomers.length)
    : 82;

  // 3. Simulated KPI cards structure
  const kpis = [
    { title: "Today's Calls", value: totalCallsCount, icon: Phone, color: '#1E3A5F', trend: '+12.4%', isPositive: true },
    { title: "Active Calls", value: activeCallsCount, icon: PhoneCall, color: '#0F766E', trend: 'Live Monitoring', isPositive: true },
    { title: "Resolved Tickets", value: resolvedTicketsCount, icon: CheckCircle, color: '#22C55E', trend: '+8.2%', isPositive: true },
    { title: "Pending Tickets", value: pendingTicketsCount, icon: Clock, color: '#F59E0B', trend: '-2.1%', isPositive: true },
    { title: "Escalated", value: escalatedTicketsCount, icon: AlertTriangle, color: '#EF4444', trend: '+1 this hour', isPositive: false },
    { title: "CSAT Score", value: `${avgCsat}%`, icon: Smile, color: '#0F766E', trend: '+1.5% YoY', isPositive: true },
    { title: "Avg Resolution Time", value: "2.4 hrs", icon: Hourglass, color: '#64748B', trend: '-15 mins', isPositive: true },
  ];

  // 4. Chart Data
  const callsByHourData = [
    { hour: '09:00', Airtel: 12, Jio: 25, Vi: 8 },
    { hour: '10:00', Airtel: 24, Jio: 48, Vi: 18 },
    { hour: '11:00', Airtel: 35, Jio: 54, Vi: 22 },
    { hour: '12:00', Airtel: 42, Jio: 62, Vi: 20 },
    { hour: '13:00', Airtel: 30, Jio: 40, Vi: 15 },
    { hour: '14:00', Airtel: 38, Jio: 52, Vi: 17 },
    { hour: '15:00', Airtel: 45, Jio: 58, Vi: 19 },
    { hour: '16:00', Airtel: 50, Jio: 65, Vi: 24 }
  ];

  const issueCategoriesData = [
    { name: 'Billing', value: tenantTickets.filter(t => t.category === 'Billing').length + 5 },
    { name: 'Network Outage', value: tenantTickets.filter(t => t.category === 'Network').length + 3 },
    { name: 'Hardware/Router', value: tenantTickets.filter(t => t.category === 'Hardware').length + 2 },
    { name: 'SIM Activation', value: tenantTickets.filter(t => t.category === 'SIM Activation').length + 4 },
    { name: 'VAS Issue', value: tenantTickets.filter(t => t.category === 'Value Added Service').length + 1 }
  ];

  const sentimentData = [
    { name: 'Positive', value: 35, color: '#22C55E' },
    { name: 'Neutral', value: 45, color: '#64748B' },
    { name: 'Frustrated / Angry', value: 20, color: '#EF4444' }
  ];

  const agentPerformanceData = [
    { name: 'Rahul Sharma', resolved: 24, handlingTime: 4.8 },
    { name: 'Priya Patel', resolved: 18, handlingTime: 5.2 },
    { name: 'Samantha Lee', resolved: 29, handlingTime: 3.5 },
    { name: 'Bala Subbu', resolved: 15, handlingTime: 6.1 }
  ];

  return (
    <Box sx={{ p: 4, bgcolor: '#F8FAFC', minHeight: 'calc(100vh - 70px)' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1E3A5F' }}>
            Enterprise Care Cockpit
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Real-time operations, customer sentiment tracking, and AI triage summaries.
          </Typography>
        </Box>
        <Chip
          icon={<TrendingUp size={14} style={{ color: '#0F766E' }} />}
          label="AI Insights Active"
          sx={{
            bgcolor: 'rgba(15, 118, 110, 0.1)',
            color: '#0F766E',
            fontWeight: 600,
            borderRadius: '6px'
          }}
        />
      </Box>

      {/* KPI Cards Grid */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Grid item xs={12} sm={6} md={3} lg={1.71} key={idx} sx={{ flexGrow: 1 }}>
              <Card
                className="card-hover"
                sx={{
                  p: 2,
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  bgcolor: '#FFFFFF',
                  boxShadow: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'space-between'
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: '6px',
                      bgcolor: `${kpi.color}15`,
                      color: kpi.color,
                      display: 'flex'
                    }}
                  >
                    <Icon size={18} />
                  </Box>
                  <Box display="flex" alignItems="center" gap={0.25}>
                    {kpi.isPositive ? (
                      <ArrowUpRight size={14} style={{ color: '#22C55E' }} />
                    ) : (
                      <ArrowDownRight size={14} style={{ color: '#EF4444' }} />
                    )}
                    <Typography
                      variant="caption"
                      sx={{
                        color: kpi.isPositive ? '#22C55E' : '#EF4444',
                        fontWeight: 600
                      }}
                    >
                      {kpi.trend}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1E293B', mb: 0.5 }}>
                    {kpi.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                    {kpi.title}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Charts Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Calls by Hour Line Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>
              Call Distribution by Hour
            </Typography>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={callsByHourData}>
                  <XAxis dataKey="hour" stroke="#64748B" fontSize={11} strokeWidth={0.5} />
                  <YAxis stroke="#64748B" fontSize={11} strokeWidth={0.5} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: '8px', border: '1px solid #E2E8F0' }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="Jio" stroke="#0F3CC9" strokeWidth={2} activeDot={{ r: 6 }} dot={false} />
                  <Line type="monotone" dataKey="Airtel" stroke="#E31837" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Vi" stroke="#FFB000" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        {/* Sentiment Analysis Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none', height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>
              Live Customer Sentiment
            </Typography>
            <Box height={240} display="flex" justifyContent="center" alignItems="center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 11 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Typography variant="caption" display="block" textAlign="center" color="text.secondary" sx={{ mt: 1 }}>
              Real-time classification based on voice tone & keyword analysis.
            </Typography>
          </Card>
        </Grid>

        {/* Issue Categories Bar Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>
              Common Inbound Complaints
            </Typography>
            <Box height={280}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={issueCategoriesData}>
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} strokeWidth={0.5} />
                  <YAxis stroke="#64748B" fontSize={11} strokeWidth={0.5} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Bar dataKey="value" fill="#1E3A5F" radius={[4, 4, 0, 0]}>
                    {issueCategoriesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 1 ? '#0F766E' : '#1E3A5F'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        {/* Agent Performance / AHT Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>
              Agent Resolutions & Average Handling Time (AHT)
            </Typography>
            <Box height={280}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agentPerformanceData} layout="vertical">
                  <XAxis type="number" stroke="#64748B" fontSize={11} strokeWidth={0.5} />
                  <YAxis dataKey="name" type="category" stroke="#64748B" fontSize={11} strokeWidth={0.5} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="resolved" name="Resolved Tickets" fill="#0F766E" radius={[0, 4, 4, 0]} barSize={14} />
                  <Bar dataKey="handlingTime" name="AHT (Mins)" fill="#64748B" radius={[0, 4, 4, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Bottom Row: Recent Tickets & Audit Logs */}
      <Grid container spacing={3}>
        {/* Recent Tickets Table */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none', height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1E293B', mb: 2.5 }}>
              Recent Support Tickets
            </Typography>
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #F1F5F9' }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem', py: 1.5 }}>Ticket ID</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem' }}>Customer</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem' }}>Operator</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem' }}>Issue</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem' }}>Priority</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tenantTickets.slice(0, 5).map((row) => {
                    const company = MOCK_COMPANIES.find(c => c.id === row.operator);
                    return (
                      <TableRow key={row.id} hover>
                        <TableCell sx={{ py: 1.5, fontSize: '0.825rem', fontWeight: 600 }}>{row.id}</TableCell>
                        <TableCell sx={{ fontSize: '0.825rem' }}>{row.customer}</TableCell>
                        <TableCell sx={{ fontSize: '0.825rem' }}>
                          <Chip
                            label={company ? company.name : row.operator.toUpperCase()}
                            size="small"
                            sx={{
                              bgcolor: company ? `${company.logoColor}10` : '#F1F5F9',
                              color: company ? company.logoColor : '#64748B',
                              fontWeight: 600,
                              height: 22,
                              fontSize: '0.75rem'
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.825rem', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {row.issue}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.825rem' }}>
                          <Chip
                            label={row.priority}
                            size="small"
                            sx={{
                              bgcolor: row.priority === 'Critical' ? '#EF444415' : row.priority === 'High' ? '#F59E0B15' : '#E2E8F0',
                              color: row.priority === 'Critical' ? '#EF4444' : row.priority === 'High' ? '#D97706' : '#64748B',
                              fontWeight: 600,
                              height: 20,
                              fontSize: '0.7rem'
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.825rem' }}>
                          <Chip
                            label={row.status}
                            size="small"
                            sx={{
                              bgcolor: row.status === 'Resolved' ? '#22C55E15' : row.status === 'In Progress' ? '#0F766E15' : '#F59E0B15',
                              color: row.status === 'Resolved' ? '#22C55E' : row.status === '0F766E' ? '#0F766E' : '#D97706',
                              fontWeight: 600,
                              height: 20,
                              fontSize: '0.7rem'
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Recent Audit Activities Panel */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none', height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1E293B', mb: 2.5 }}>
              Security Audit Stream
            </Typography>
            <Box display="flex" flexDirection="column" gap={2} sx={{ maxHeight: 280, overflowY: 'auto' }}>
              {tenantLogs.slice(0, 5).map((log, idx) => (
                <Box key={idx} display="flex" flexDirection="column" sx={{ pb: 1.5, borderBottom: idx !== 4 ? '1px solid #F1F5F9' : 'none' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
                      {log.user}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {log.time.split(' ')[1]}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', mb: 0.5 }}>
                    {log.action}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Chip
                      label={log.company.toUpperCase()}
                      size="small"
                      sx={{ height: 18, fontSize: '0.65rem', fontWeight: 600, bgcolor: '#F1F5F9' }}
                    />
                    <Typography variant="caption" sx={{ color: '#94A3B8', fontFamily: 'monospace' }}>
                      {log.ip}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
