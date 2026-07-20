import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Cpu, FileText, Download, Calendar, Settings as SettingsIcon, CheckSquare } from 'lucide-react';
import {
  Box,
  Card,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Divider,
  Alert
} from '@mui/material';

export default function Reports() {
  const { currentTenant, tickets } = useApp();

  const [reportType, setReportType] = useState('tickets');
  const [dateRange, setDateRange] = useState('7days');
  const [exportFormat, setExportFormat] = useState('csv');
  const [exporting, setExporting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGenerateReport = () => {
    setExporting(true);
    setSuccess(false);

    // Simulate compilation
    setTimeout(() => {
      setExporting(false);
      setSuccess(true);

      // Trigger standard browser download for CSV
      if (exportFormat === 'csv') {
        const tenantTickets = currentTenant === 'global' ? tickets : tickets.filter(t => t.operator === currentTenant);
        
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Ticket ID,Issue,Customer,Operator,Agent,Created Date,Priority,Status,Category\n";
        
        tenantTickets.forEach((t) => {
          const row = `"${t.id}","${t.issue.replace(/"/g, '""')}","${t.customer}","${t.operator.toUpperCase()}","${t.agent}","${t.createdDate}","${t.priority}","${t.status}","${t.category}"`;
          csvContent += row + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `teleresolve_report_${currentTenant}_${dateRange}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Mock PDF/Excel downloads
        const link = document.createElement("a");
        link.setAttribute("href", "#");
        alert(`Exporting as ${exportFormat.toUpperCase()} completed. In production, this compiles a server-side print container.`);
      }
    }, 1200);
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#F8FAFC', minHeight: 'calc(100vh - 70px)' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1E3A5F' }}>
          Operations & KPI Reporting
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Compile historical performance audits, SLA compliance files, and download data logs.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Report configuration */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', mb: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Export Query Configuration
            </Typography>

            <Box display="flex" flexDirection="column" gap={3}>
              {/* Report Scope */}
              <FormControl fullWidth size="medium">
                <InputLabel sx={{ fontFamily: 'Inter' }}>Report Dataset</InputLabel>
                <Select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  label="Report Dataset"
                  sx={{ borderRadius: '8px' }}
                >
                  <MenuItem value="tickets">Support Tickets Ledger</MenuItem>
                  <MenuItem value="calls">Voice Call Logs</MenuItem>
                  <MenuItem value="csat">CSAT Customer Feedback Scores</MenuItem>
                  <MenuItem value="audit">Security Access Audit Logs</MenuItem>
                </Select>
              </FormControl>

              {/* Date Scope */}
              <FormControl fullWidth size="medium">
                <InputLabel sx={{ fontFamily: 'Inter' }}>Reporting Period</InputLabel>
                <Select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  label="Reporting Period"
                  sx={{ borderRadius: '8px' }}
                >
                  <MenuItem value="today">Today (Last 24 Hours)</MenuItem>
                  <MenuItem value="7days">Last 7 Calendar Days</MenuItem>
                  <MenuItem value="30days">Last 30 Calendar Days</MenuItem>
                  <MenuItem value="custom">Current Financial Quarter</MenuItem>
                </Select>
              </FormControl>

              {/* Format selection */}
              <FormControl fullWidth size="medium">
                <InputLabel sx={{ fontFamily: 'Inter' }}>Export Format</InputLabel>
                <Select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  label="Export Format"
                  sx={{ borderRadius: '8px' }}
                >
                  <MenuItem value="csv">CSV (Comma Separated Spreadsheet)</MenuItem>
                  <MenuItem value="pdf">PDF (Print-Optimized Audit Document)</MenuItem>
                  <MenuItem value="excel">Excel Worksheet (.xlsx)</MenuItem>
                </Select>
              </FormControl>

              <Divider sx={{ my: 1 }} />

              <Button
                variant="contained"
                onClick={handleGenerateReport}
                disabled={exporting}
                startIcon={exporting ? <CircularProgress size={16} sx={{ color: '#FFFFFF' }} /> : <Download size={18} />}
                sx={{
                  bgcolor: '#1E3A5F',
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.5,
                  borderRadius: '8px',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#142842', boxShadow: 'none' }
                }}
              >
                {exporting ? 'Compiling Dataset...' : 'Generate & Download Report'}
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Report Overview Panel */}
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" gap={3}>
            {success && (
              <Alert severity="success" sx={{ borderRadius: '8px' }}>
                Report file compiled. Downloader initialized successfully.
              </Alert>
            )}

            <Card sx={{ p: 3.5, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none', bgcolor: '#F8FAFC' }}>
              <Box display="flex" alignItems="center" gap={1.5} sx={{ mb: 2 }}>
                <FileText size={20} style={{ color: '#0F766E' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Report File Manifest
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.6 }}>
                Generating report for active tenant: <strong>{currentTenant.toUpperCase()}</strong>.
                The download file includes SLA metrics, timestamps, customer details, assigned handlers, and categorization scores.
              </Typography>

              <Box display="flex" flexDirection="column" gap={1.5}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Scope Security</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>RBAC Enforced</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Encryption</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>AES-256 (SSL Transmission)</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Estimated Size</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>~24 KB (dynamic CSV payload)</Typography>
                </Box>
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
