import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MOCK_COMPANIES } from '../MockData';
import {
  Cpu,
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Clock,
  Play,
  Pause,
  AlertTriangle,
  FileText,
  BrainCircuit,
  Cpu,
  BadgeAlert,
  ArrowRight,
  TrendingUp,
  Tag,
  CheckSquare
} from 'lucide-react';
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  Snackbar
} from '@mui/material';

export default function CallDetails() {
  const { callId } = useParams();
  const navigate = useNavigate();
  const { calls, addTicket, tickets } = useApp();

  // Find target call
  const call = calls.find((c) => c.id === callId);

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [durationSecs, setDurationSecs] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);

  // Ticket creation state
  const [ticketCreated, setTicketCreated] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            clearInterval(interval);
            return 100;
          }
          const next = prev + 4;
          // Synchronize transcript display with progress percentage
          if (call) {
            const lineIdx = Math.floor((next / 100) * call.transcript.length);
            setCurrentLineIndex(Math.min(lineIdx, call.transcript.length - 1));
          }
          return next;
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isPlaying, call]);

  if (!call) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">Call ID not found in operations logs.</Typography>
        <Button onClick={() => navigate('/live-calls')} sx={{ mt: 2 }} startIcon={<ArrowLeft size={16} />}>
          Back to Live Calls
        </Button>
      </Box>
    );
  }

  const company = MOCK_COMPANIES.find((c) => c.id === call.operator);

  const handleGenerateTicket = () => {
    // Generate new ticket via context
    const tkt = addTicket({
      issue: call.intent + ' - ' + call.entities.device,
      customer: call.customer,
      operator: call.operator,
      agent: call.agent,
      priority: call.priority,
      status: 'Open',
      category: call.intent.includes('Billing') ? 'Billing' : call.intent.includes('Network') ? 'Network' : 'Hardware'
    });

    setTicketId(tkt.id);
    setTicketCreated(true);
    setToastOpen(true);
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#F8FAFC', minHeight: 'calc(100vh - 70px)' }}>
      {/* Back link */}
      <Button
        onClick={() => navigate('/live-calls')}
        startIcon={<ArrowLeft size={16} />}
        sx={{ mb: 3, textTransform: 'none', color: '#64748B', fontWeight: 600 }}
      >
        Back to Calls List
      </Button>

      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="start" sx={{ mb: 4 }}>
        <Box>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1E3A5F' }}>
              Call Console: {call.id}
            </Typography>
            <Chip
              label={call.status}
              size="small"
              sx={{
                bgcolor: call.status === 'Active' ? 'rgba(15, 118, 110, 0.1)' : '#F1F5F9',
                color: call.status === 'Active' ? '#0F766E' : '#64748B',
                fontWeight: 600
              }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Operator: {company ? company.name : call.operator.toUpperCase()} | Assigned Agent: {call.agent}
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            onClick={handleGenerateTicket}
            disabled={ticketCreated}
            startIcon={<CheckSquare size={16} />}
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              borderColor: '#E2E8F0',
              color: '#1E293B',
              '&:hover': { bgcolor: '#F8FAFC', borderColor: '#CBD5E1' }
            }}
          >
            {ticketCreated ? `Ticket Generated: ${ticketId}` : 'Generate CRM Ticket'}
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column: Customer metrics, Transcript & Player */}
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            {/* Customer Details Panel */}
            <Grid item xs={12}>
              <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', mb: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Customer Demographics
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <User size={18} style={{ color: '#64748B' }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Name</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{call.customer}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Phone size={18} style={{ color: '#64748B' }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Mobile Number</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{call.phone}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <MapPin size={18} style={{ color: '#64748B' }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Location</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{call.location}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1, fontWeight: 600 }}>
                  Associated Active Tickets
                </Typography>
                <List size="small" disablePadding>
                  {tickets.filter(t => t.customer === call.customer).map((t, idx) => (
                    <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {t.id} - {t.issue}
                          </Typography>
                        }
                        secondary={`Status: ${t.status} | Priority: ${t.priority}`}
                      />
                    </ListItem>
                  ))}
                  {tickets.filter(t => t.customer === call.customer).length === 0 && (
                    <Typography variant="caption" color="text.secondary">No historical open complaints.</Typography>
                  )}
                </List>
              </Card>
            </Grid>

            {/* Audio Wave Player Simulation */}
            <Grid item xs={12}>
              <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', mb: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Voice Recording Playback
                </Typography>
                <Box display="flex" alignItems="center" gap={3} sx={{ mb: 2 }}>
                  <IconButton
                    onClick={() => setIsPlaying(!isPlaying)}
                    sx={{
                      bgcolor: '#1E3A5F',
                      color: '#FFFFFF',
                      '&:hover': { bgcolor: '#142842' },
                      width: 44,
                      height: 44
                    }}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </IconButton>
                  <Box flexGrow={1}>
                    <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                        {isPlaying ? `00:${progress < 10 ? '0' : ''}${Math.floor(progress / 10)}` : '00:00'}
                      </Typography>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                        {call.duration}
                      </Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 3, bgcolor: '#E2E8F0' }} />
                  </Box>
                </Box>
                {/* Audio Waves design simulation */}
                <Box display="flex" alignItems="center" justifyContent="space-between" height={36} sx={{ opacity: 0.45 }}>
                  {[...Array(38)].map((_, i) => {
                    const h = Math.abs(Math.sin(i * 0.5)) * 26 + 6;
                    const isActive = progress > (i / 38) * 100;
                    return (
                      <Box
                        key={i}
                        sx={{
                          width: 3,
                          height: h,
                          bgcolor: isActive ? '#0F766E' : '#94A3B8',
                          borderRadius: 1.5,
                          transition: 'background-color 0.2s'
                        }}
                      />
                    );
                  })}
                </Box>
              </Card>
            </Grid>

            {/* Real-time Streaming Transcript */}
            <Grid item xs={12}>
              <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', mb: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Live Dialogue Feed
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, maxHeight: 320, overflowY: 'auto', pr: 1 }}>
                  {call.transcript.map((line, idx) => {
                    const isCustomer = line.speaker === 'Customer';
                    const isStreaming = isPlaying && idx <= currentLineIndex;
                    const showLine = !isPlaying || isStreaming;
                    
                    return (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignSelf: isCustomer ? 'flex-start' : 'flex-end',
                          maxWidth: '75%',
                          opacity: showLine ? 1 : 0.25,
                          transition: 'opacity 0.3s'
                        }}
                      >
                        <Box
                          sx={{
                            px: 2,
                            py: 1.5,
                            borderRadius: isCustomer ? '8px 8px 8px 0px' : '8px 8px 0px 8px',
                            bgcolor: isCustomer ? '#F1F5F9' : 'rgba(15, 118, 110, 0.06)',
                            border: isCustomer ? '1px solid #E2E8F0' : '1px solid rgba(15, 118, 110, 0.1)'
                          }}
                        >
                          <Typography variant="caption" sx={{ fontWeight: 700, color: isCustomer ? '#64748B' : '#0F766E', display: 'block', mb: 0.5 }}>
                            {line.speaker}
                          </Typography>
                          <Typography variant="body2">
                            {line.text}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column: AI Insights Panel */}
        <Grid item xs={12} lg={4}>
          <Box display="flex" flexDirection="column" gap={3}>
            {/* AI Summary Card */}
            <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
              <Box display="flex" alignItems="center" gap={1} sx={{ mb: 2 }}>
                <BrainCircuit size={20} style={{ color: '#0F766E' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  AI Summarization
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ lineHeight: 1.6, color: '#334155' }}>
                {call.summary}
              </Typography>
            </Card>

            {/* Feature Extraction Metadata */}
            <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
              <Box display="flex" alignItems="center" gap={1} sx={{ mb: 2 }}>
                <Cpu size={20} style={{ color: '#0F766E' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  NLP Intelligence
                </Typography>
              </Box>

              <List size="small" disablePadding>
                <ListItem sx={{ px: 0, py: 1.25 }}>
                  <ListItemText
                    primary={<Typography variant="caption" color="text.secondary">Primary Intent</Typography>}
                    secondary={<Typography variant="body2" sx={{ fontWeight: 600 }}>{call.intent}</Typography>}
                  />
                  <Chip
                    label={`${Math.round(call.score * 100)}% Confidence`}
                    size="small"
                    sx={{ bgcolor: 'rgba(34, 197, 94, 0.1)', color: '#22C55E', fontWeight: 600, fontSize: '10px' }}
                  />
                </ListItem>
                <Divider />

                <ListItem sx={{ px: 0, py: 1.25 }}>
                  <ListItemText
                    primary={<Typography variant="caption" color="text.secondary">Sentiment Classifier</Typography>}
                    secondary={
                      <Box display="flex" alignItems="center" gap={1} sx={{ mt: 0.5 }}>
                        <Chip
                          label={call.sentiment}
                          size="small"
                          sx={{
                            bgcolor: call.sentiment === 'Frustrated' ? '#EF444415' : '#22C55E15',
                            color: call.sentiment === 'Frustrated' ? '#EF4444' : '#22C55E',
                            fontWeight: 600
                          }}
                        />
                        <Typography variant="caption" color="text.secondary">Voice Tone Alert</Typography>
                      </Box>
                    }
                  />
                </ListItem>
                <Divider />

                <ListItem sx={{ px: 0, py: 1.25, display: 'block' }}>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>Extracted Entities</Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {Object.entries(call.entities).map(([key, val]) => (
                      <Chip
                        key={key}
                        label={`${key.replace(/^\w/, c => c.toUpperCase())}: ${val}`}
                        size="small"
                        sx={{ bgcolor: '#F8FAFC', border: '1px solid #E2E8F0', fontSize: '11px', fontWeight: 500 }}
                      />
                    ))}
                  </Box>
                </ListItem>
              </List>
            </Card>

            {/* Suggested Resolutions SOP */}
            <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
              <Box display="flex" alignItems="center" gap={1} sx={{ mb: 2 }}>
                <TrendingUp size={20} style={{ color: '#0F766E' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Recommended Resolution Playbook
                </Typography>
              </Box>
              <Box sx={{ bgcolor: 'rgba(15, 118, 110, 0.04)', border: '1px solid rgba(15, 118, 110, 0.1)', p: 2, borderRadius: '8px', mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#0F766E', mb: 1 }}>
                  Auto-Matched SOP Article:
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.825rem', lineHeight: 1.5 }}>
                  {call.suggestedResolution}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" gap={1.25}>
                <Button
                  variant="contained"
                  fullWidth
                  size="small"
                  sx={{ bgcolor: '#0F766E', textTransform: 'none', fontWeight: 600 }}
                  onClick={handleGenerateTicket}
                  disabled={ticketCreated}
                >
                  Apply Resolution & Generate Ticket
                </Button>
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar notification on Ticket creation */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: '100%' }}>
          Ticket {ticketId} generated successfully and logged to Airtel Operations database!
        </Alert>
      </Snackbar>
    </Box>
  );
}
