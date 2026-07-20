import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_COMPANIES, MOCK_USERS } from '../MockData';
import {  Shield, Building2, Users2, Cpu, History, AlertTriangle } from 'lucide-react';
import {
  Box,
  Card,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Switch,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';

export default function AdminPanel() {
  const { auditLogs, aiSettings, updateAiSettings, departments } = useApp();

  const [activeTab, setActiveTab] = useState(0);
  const [successToast, setSuccessToast] = useState(false);

  // Local state for AI configuration inputs
  const [localTranscribe, setLocalTranscribe] = useState(aiSettings.autoTranscription);
  const [localSentiment, setLocalSentiment] = useState(aiSettings.sentimentSensitivity);
  const [localTicket, setLocalTicket] = useState(aiSettings.autoTicketGeneration);
  const [localThreshold, setLocalThreshold] = useState(aiSettings.confidenceThreshold);
  const [localModel, setLocalModel] = useState(aiSettings.modelSelected);

  const handleSaveAiSettings = () => {
    updateAiSettings({
      autoTranscription: localTranscribe,
      sentimentSensitivity: localSentiment,
      autoTicketGeneration: localTicket,
      confidenceThreshold: localThreshold,
      modelSelected: localModel
    });
    setSuccessToast(true);
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#F8FAFC', minHeight: 'calc(100vh - 70px)' }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Shield size={26} style={{ color: '#1E3A5F' }} />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1E3A5F' }}>
            Global Administration Console
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage multi-tenant company configurations, agents, AI core models, and system compliance logs.
          </Typography>
        </Box>
      </Box>

      {/* Tabs Menu */}
      <Card sx={{ mb: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
        <Tabs
          value={activeTab}
          onChange={(e, val) => setActiveTab(val)}
          sx={{
            px: 2,
            '.MuiTabs-indicator': { bgcolor: '#0F766E' },
            '.MuiTab-root': { textTransform: 'none', fontWeight: 600, py: 2 }
          }}
        >
          <Tab label="Telecom Organizations" icon={<Building2 size={16} />} iconPosition="start" />
          <Tab label="Agent Directory" icon={<Users2 size={16} />} iconPosition="start" />
          <Tab label="AI Model Settings" icon={<Cpu size={16} />} iconPosition="start" />
          <Tab label="Security Audit Trace" icon={<History size={16} />} iconPosition="start" />
        </Tabs>
      </Card>

      {/* Tab Panels */}
      {activeTab === 0 && (
        <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', mb: 2.5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Registered Tenant Carriers
          </Typography>
          <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #F1F5F9' }}>
            <Table>
              <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, py: 1.5 }}>Carrier Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Routing Code</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Platform Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Data Sovereignty</TableCell>
                  <TableCell sx={{ fontWeight: 700, align: 'right' }}>Management</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_COMPANIES.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell sx={{ py: 1.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: c.logoColor }} />
                      {c.name}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace' }}>{c.code}</TableCell>
                    <TableCell>
                      <Chip label="Active / Online" size="small" sx={{ bgcolor: '#22C55E15', color: '#22C55E', fontWeight: 600 }} />
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.85rem' }}>Isolated Schema</TableCell>
                    <TableCell>
                      <Button size="small" variant="text" sx={{ textTransform: 'none', color: '#64748B', fontWeight: 600 }}>
                        Configure Domains
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {activeTab === 1 && (
        <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', mb: 2.5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Agent & Supervisor Roster
          </Typography>
          <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #F1F5F9' }}>
            <Table>
              <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, py: 1.5 }}>Agent Profile</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Corporate Email</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Security Role</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Assigned Tenant</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Security Clearances</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_USERS.map((usr) => (
                  <TableRow key={usr.id}>
                    <TableCell sx={{ py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <img src={usr.avatar} alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{usr.name}</Typography>
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.85rem' }}>{usr.email}</TableCell>
                    <TableCell>
                      <Chip label={usr.role} size="small" sx={{ bgcolor: '#1E3A5F10', color: '#1E3A5F', fontWeight: 600 }} />
                    </TableCell>
                    <TableCell sx={{ textTransform: 'uppercase', fontWeight: 500, fontSize: '0.85rem' }}>{usr.company}</TableCell>
                    <TableCell>
                      <Chip label="MFA Verified" size="small" sx={{ height: 20, bgcolor: '#22C55E15', color: '#22C55E', fontWeight: 600 }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {activeTab === 2 && (
        <Card sx={{ p: 4, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', mb: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            AI LLM Orchestration
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column" gap={3.5}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Transcription Core Model</Typography>
                  <FormControl fullWidth size="medium">
                    <Select value={localModel} onChange={(e) => setLocalModel(e.target.value)} sx={{ borderRadius: '8px' }}>
                      <MenuItem value="Gemini 1.5 Pro">Gemini 1.5 Pro (High Accuracy Speech Parsing)</MenuItem>
                      <MenuItem value="Gemini 1.5 Flash">Gemini 1.5 Flash (Ultra Low-latency Inference)</MenuItem>
                      <MenuItem value="Llama 3 70B">Llama 3 70B (Custom Telecom Finetuned)</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box>
                  <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>NLU Confidence Threshold</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#0F766E' }}>{localThreshold}%</Typography>
                  </Box>
                  <Slider value={localThreshold} onChange={(e, val) => setLocalThreshold(val)} step={5} min={50} max={95} sx={{ color: '#0F766E' }} />
                  <Typography variant="caption" color="text.secondary">Queries below this confidence score are flagged for manual review.</Typography>
                </Box>

                <Box>
                  <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Voice Sentiment Sensitivity</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#0F766E' }}>{localSentiment}%</Typography>
                  </Box>
                  <Slider value={localSentiment} onChange={(e, val) => setLocalSentiment(val)} step={5} min={30} max={90} sx={{ color: '#0F766E' }} />
                  <Typography variant="caption" color="text.secondary">Trigger warning badges for callers exceeding frustration index thresholds.</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column" gap={3}>
                <Card sx={{ p: 2.5, border: '1px solid #E2E8F0', bgcolor: '#F8FAFC', boxShadow: 'none' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>Automatic Call Transcription</Typography>
                      <Typography variant="caption" color="text.secondary">Transcribe all incoming calls using Gemini Audio API.</Typography>
                    </Box>
                    <Switch checked={localTranscribe} onChange={(e) => setLocalTranscribe(e.target.checked)} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0F766E' } }} />
                  </Box>
                </Card>

                <Card sx={{ p: 2.5, border: '1px solid #E2E8F0', bgcolor: '#F8FAFC', boxShadow: 'none' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>Auto Ticket Generation</Typography>
                      <Typography variant="caption" color="text.secondary">Instantly create CRM tickets for outages without agent approval.</Typography>
                    </Box>
                    <Switch checked={localTicket} onChange={(e) => setLocalTicket(e.target.checked)} />
                  </Box>
                </Card>

                <Button
                  variant="contained"
                  onClick={handleSaveAiSettings}
                  sx={{ bgcolor: '#1E3A5F', py: 1.25, fontWeight: 600, borderRadius: '8px', mt: 1 }}
                >
                  Save Model Parameters
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}

      {activeTab === 3 && (
        <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', mb: 2.5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Platform Action Trail
          </Typography>
          <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #F1F5F9' }}>
            <Table>
              <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, py: 1.5 }}>Access Timestamp</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Actor</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Action Description</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Company Boundary</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Network IP</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {auditLogs.map((log, idx) => (
                  <TableRow key={idx}>
                    <TableCell sx={{ py: 1.5, fontSize: '0.85rem', fontFamily: 'monospace' }}>{log.time}</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>{log.user}</TableCell>
                    <TableCell sx={{ fontSize: '0.85rem' }}>{log.action}</TableCell>
                    <TableCell>
                      <Chip label={log.company.toUpperCase()} size="small" sx={{ fontWeight: 600, fontSize: '0.7rem', height: 18 }} />
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.85rem', fontFamily: 'monospace', color: '#94A3B8' }}>{log.ip}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      <Snackbar
        open={successToast}
        autoHideDuration={3000}
        onClose={() => setSuccessToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSuccessToast(false)} severity="success" sx={{ width: '100%' }}>
          Global NLP model parameter profiles updated and logged to audit trace!
        </Alert>
      </Snackbar>
    </Box>
  );
}
