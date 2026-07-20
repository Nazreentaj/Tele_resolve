import React from 'react';
import { useApp } from '../context/AppContext';
import { Cpu, ShieldAlert, BarChart3, Clock, CheckCircle } from 'lucide-react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

export default function Analytics() {
  const { currentTenant } = useApp();

  // Mock analytics dataset
  const cityPerformanceData = [
    { city: 'Mumbai', Airtel: 92, Jio: 95, Vi: 85 },
    { city: 'Bengaluru', Airtel: 94, Jio: 96, Vi: 88 },
    { city: 'Delhi NCR', Airtel: 90, Jio: 92, Vi: 81 },
    { city: 'Chennai', Airtel: 89, Jio: 94, Vi: 86 },
    { city: 'Hyderabad', Airtel: 95, Jio: 93, Vi: 90 }
  ];

  const slaPerformanceData = [
    { month: 'Jan', SLA: 98.2 },
    { month: 'Feb', SLA: 97.8 },
    { month: 'Mar', SLA: 98.5 },
    { month: 'Apr', SLA: 99.1 },
    { month: 'May', SLA: 96.4 }, // Outage hit
    { month: 'Jun', SLA: 98.0 },
    { month: 'Jul', SLA: 98.8 }
  ];

  const monthlyHandlingTime = [
    { name: 'Jan', AHT: 5.2 },
    { name: 'Feb', AHT: 5.0 },
    { name: 'Mar', AHT: 4.8 },
    { name: 'Apr', AHT: 4.5 },
    { name: 'May', AHT: 4.9 },
    { name: 'Jun', AHT: 4.3 },
    { name: 'Jul', AHT: 4.1 } // AI Copilot introduced
  ];

  const heatmapOutages = [
    { zone: 'Mumbai Western Suburbs', carrier: 'Jio', severity: 'Critical', status: 'Active Outage', eta: '1.5 Hours', fault: 'Physical fiber cut at SV Road' },
    { zone: 'Bengaluru Indiranagar Hub', carrier: 'Airtel', severity: 'Medium', status: 'Scheduled Maintenance', eta: '30 Mins', fault: 'Core gateway router firmware flash' },
    { zone: 'Delhi NCR Sector 62', carrier: 'Vi', severity: 'High', status: 'Degraded Service', eta: '2 Hours', fault: 'High cell tower congestion' },
    { zone: 'Chennai OMR', carrier: 'BSNL', severity: 'Low', status: 'Resolved', eta: 'None', fault: 'Optical patch cable spliced successfully' }
  ];

  return (
    <Box sx={{ p: 4, bgcolor: '#F8FAFC', minHeight: 'calc(100vh - 70px)' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1E3A5F' }}>
          Executive Operations Analytics
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Aggregate performance reporting, network outages tracking, and service SLA logs.
        </Typography>
      </Box>

      {/* Grid of SLA and AHT charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* SLA Monthly Trend */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1E293B' }}>
                Service Level Agreement (SLA) Compliance
              </Typography>
              <Chip label="Target: 98.5%" size="small" sx={{ fontWeight: 600, bgcolor: '#22C55E15', color: '#22C55E' }} />
            </Box>
            <Box height={280}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={slaPerformanceData}>
                  <defs>
                    <linearGradient id="colorSla" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0F766E" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#0F766E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={11} strokeWidth={0.5} />
                  <YAxis domain={[94, 100]} stroke="#64748B" fontSize={11} strokeWidth={0.5} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="SLA" stroke="#0F766E" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSla)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        {/* Handling Time monthly trend */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1E293B' }}>
                Average Handling Time (AHT) Trend
              </Typography>
              <Chip label="Down 21% YoY" size="small" sx={{ fontWeight: 600, bgcolor: 'rgba(15, 118, 110, 0.1)', color: '#0F766E' }} />
            </Box>
            <Box height={280}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyHandlingTime}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} strokeWidth={0.5} />
                  <YAxis unit="m" stroke="#64748B" fontSize={11} strokeWidth={0.5} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="AHT" stroke="#1E3A5F" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Row 2: Outages and City breakdown */}
      <Grid container spacing={3}>
        {/* Network Outage Heatmap List */}
        <Grid item xs={12} lg={7}>
          <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none', height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1E293B', mb: 2.5 }}>
              Active Network Alarm Heatmap
            </Typography>
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #F1F5F9' }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem', py: 1.5 }}>Outage Splicing Zone</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem' }}>Carrier</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem' }}>Severity</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem' }}>ETA ETA</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {heatmapOutages.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell sx={{ py: 1.5, fontSize: '0.825rem', fontWeight: 600 }}>
                        {row.zone}
                        <Typography variant="caption" display="block" color="text.secondary">
                          {row.fault}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.825rem', fontWeight: 600 }}>{row.carrier}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.severity}
                          size="small"
                          sx={{
                            height: 18,
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            bgcolor: row.severity === 'Critical' ? '#EF444415' : row.severity === 'High' ? '#F59E0B15' : '#E2E8F0',
                            color: row.severity === 'Critical' ? '#EF4444' : row.severity === 'High' ? '#D97706' : '#64748B'
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
                            bgcolor: row.status === 'Resolved' ? '#22C55E15' : '#F59E0B15',
                            color: row.status === 'Resolved' ? '#22C55E' : '#D97706'
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.825rem', fontFamily: 'monospace' }}>{row.eta}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* City Performance comparison chart */}
        <Grid item xs={12} lg={5}>
          <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none', height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1E293B', mb: 2.5 }}>
              CSAT Performance Index by Circle City
            </Typography>
            <Box height={260}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cityPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="city" stroke="#64748B" fontSize={11} strokeWidth={0.5} />
                  <YAxis domain={[75, 100]} stroke="#64748B" fontSize={11} strokeWidth={0.5} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="Jio" fill="#0F3CC9" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="Airtel" fill="#E31837" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="Vi" fill="#FFB000" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
