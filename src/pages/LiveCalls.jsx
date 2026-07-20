import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MOCK_COMPANIES } from '../MockData';
import {
  Cpu,
  Phone,
  PhoneCall,
  Volume2,
  FileText,
  ExternalLink,
  Play,
  Pause,
  AlertCircle
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
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  LinearProgress
} from '@mui/material';

export default function LiveCalls() {
  const { currentTenant, calls } = useApp();
  const navigate = useNavigate();

  // Tenant Boundary Filtering
  const tenantCalls = currentTenant === 'global' ? calls : calls.filter((c) => c.operator === currentTenant);

  // Transcript modal state
  const [selectedCall, setSelectedCall] = useState(null);
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  // Audio Player state simulation
  const [audioCall, setAudioCall] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0);
  const [playerInterval, setPlayerInterval] = useState(null);

  const handleOpenTranscript = (call) => {
    setSelectedCall(call);
    setTranscriptOpen(true);
  };

  const handleToggleAudio = (call) => {
    if (audioCall && audioCall.id === call.id) {
      if (isPlaying) {
        clearInterval(playerInterval);
        setIsPlaying(false);
      } else {
        startAudioSimulation();
      }
    } else {
      // Switch call
      clearInterval(playerInterval);
      setAudioCall(call);
      setIsPlaying(true);
      setPlayProgress(0);
      startAudioSimulation();
    }
  };

  const startAudioSimulation = () => {
    const interval = setInterval(() => {
      setPlayProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          return 100;
        }
        return prev + 5;
      });
    }, 1000);
    setPlayerInterval(interval);
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#F8FAFC', minHeight: 'calc(100vh - 70px)' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1E3A5F' }}>
            Live Calls Center
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Monitor real-time agent calls, AI sentiment alarms, and audio streams.
          </Typography>
        </Box>
        
        {isPlaying && audioCall && (
          <Card sx={{ px: 2, py: 1, border: '1px solid #E2E8F0', bgcolor: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box display="flex" alignItems="center" gap={1}>
              <Volume2 size={16} className="text-gradient" />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                Listening: {audioCall.id} ({audioCall.customer})
              </Typography>
            </Box>
            <Box width={80}>
              <LinearProgress variant="determinate" value={playProgress} color="primary" sx={{ height: 4, borderRadius: 2 }} />
            </Box>
            <IconButton size="small" onClick={() => { clearInterval(playerInterval); setIsPlaying(false); }}>
              <Pause size={14} />
            </IconButton>
          </Card>
        )}
      </Box>

      {/* Main Table */}
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: '8px' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#F8FAFC' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, py: 2 }}>Call ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Operator</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Agent</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Duration</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Sentiment</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Priority</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700, align: 'right' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tenantCalls.map((call) => {
              const company = MOCK_COMPANIES.find((c) => c.id === call.operator);
              return (
                <TableRow key={call.id} hover>
                  <TableCell sx={{ py: 2, fontWeight: 600, color: '#1E3A5F' }}>{call.id}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{call.customer}</Typography>
                    <Typography variant="caption" color="text.secondary">{call.phone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={company ? company.name : call.operator.toUpperCase()}
                      size="small"
                      sx={{
                        bgcolor: company ? `${company.logoColor}10` : '#F1F5F9',
                        color: company ? company.logoColor : '#64748B',
                        fontWeight: 600
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.85rem' }}>{call.agent}</TableCell>
                  <TableCell sx={{ fontSize: '0.85rem', fontFamily: 'monospace' }}>{call.duration}</TableCell>
                  <TableCell>
                    <Chip
                      label={call.sentiment}
                      size="small"
                      sx={{
                        bgcolor: call.sentiment === 'Frustrated' ? '#EF444415' : call.sentiment === 'Negative' ? '#F59E0B15' : '#22C55E15',
                        color: call.sentiment === 'Frustrated' ? '#EF4444' : call.sentiment === 'Negative' ? '#D97706' : '#22C55E',
                        fontWeight: 600
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={call.priority}
                      size="small"
                      sx={{
                        bgcolor: call.priority === 'Critical' ? '#EF444415' : call.priority === 'High' ? '#F59E0B15' : '#E2E8F0',
                        color: call.priority === 'Critical' ? '#EF4444' : call.priority === 'High' ? '#D97706' : '#64748B',
                        fontWeight: 600
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={call.status === 'Active' ? <PhoneCall size={12} style={{ color: '#0F766E' }} /> : <Phone size={12} />}
                      label={call.status}
                      size="small"
                      sx={{
                        bgcolor: call.status === 'Active' ? 'rgba(15, 118, 110, 0.1)' : '#F1F5F9',
                        color: call.status === 'Active' ? '#0F766E' : '#64748B',
                        fontWeight: 600
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Button
                        variant="text"
                        size="small"
                        startIcon={<Volume2 size={14} />}
                        onClick={() => handleToggleAudio(call)}
                        sx={{ textTransform: 'none', color: '#0F766E', fontWeight: 600 }}
                      >
                        {audioCall && audioCall.id === call.id && isPlaying ? 'Pause' : 'Listen'}
                      </Button>
                      
                      <Button
                        variant="text"
                        size="small"
                        startIcon={<FileText size={14} />}
                        onClick={() => handleOpenTranscript(call)}
                        sx={{ textTransform: 'none', color: '#64748B', fontWeight: 600 }}
                      >
                        Transcript
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<ExternalLink size={14} />}
                        onClick={() => navigate(`/live-calls/${call.id}`)}
                        sx={{
                          textTransform: 'none',
                          bgcolor: '#1E3A5F',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          borderRadius: '6px',
                          boxShadow: 'none',
                          '&:hover': { bgcolor: '#142842', boxShadow: 'none' }
                        }}
                      >
                        Open
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Transcript Modal Dialog */}
      <Dialog
        open={transcriptOpen}
        onClose={() => setTranscriptOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '8px' } }}
      >
        {selectedCall && (
          <>
            <DialogTitle sx={{ borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1E3A5F' }}>
                  Call Transcript: {selectedCall.id}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Customer: {selectedCall.customer} | Agent: {selectedCall.agent}
                </Typography>
              </Box>
              <Chip
                label={selectedCall.sentiment}
                size="small"
                sx={{
                  bgcolor: selectedCall.sentiment === 'Frustrated' ? '#EF444415' : '#22C55E15',
                  color: selectedCall.sentiment === 'Frustrated' ? '#EF4444' : '#22C55E',
                  fontWeight: 600
                }}
              />
            </DialogTitle>
            <DialogContent sx={{ p: 3, maxHeight: '400px', overflowY: 'auto' }}>
              <Box display="flex" flexDirection="column" gap={2}>
                {selectedCall.transcript.map((line, idx) => (
                  <Box
                    key={idx}
                    alignSelf={line.speaker === 'Customer' ? 'flex-start' : 'flex-end'}
                    sx={{
                      maxWidth: '80%',
                      bgcolor: line.speaker === 'Customer' ? '#F1F5F9' : 'rgba(15, 118, 110, 0.08)',
                      p: 2,
                      borderRadius: line.speaker === 'Customer' ? '8px 8px 8px 0px' : '8px 8px 0px 8px',
                      border: line.speaker === 'Customer' ? '1px solid #E2E8F0' : '1px solid rgba(15, 118, 110, 0.1)'
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 700, color: line.speaker === 'Customer' ? '#64748B' : '#0F766E', display: 'block', mb: 0.5 }}>
                      {line.speaker}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {line.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2, borderTop: '1px solid #F1F5F9' }}>
              <Button onClick={() => setTranscriptOpen(false)} sx={{ textTransform: 'none', color: '#64748B' }}>
                Close Preview
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setTranscriptOpen(false);
                  navigate(`/live-calls/${selectedCall.id}`);
                }}
                sx={{ textTransform: 'none', bgcolor: '#1E3A5F' }}
              >
                Open Details Page
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
