import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Cpu,
  Brain,
  FileText,
  Upload,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Search,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Alert,
  Snackbar
} from '@mui/material';

export default function AIAnalyzer() {
  const { addTicket } = useApp();

  const [inputText, setInputText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [ticketCreated, setTicketCreated] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [toastOpen, setToastOpen] = useState(false);

  const sampleTranscripts = [
    {
      label: "JioFiber Red Light (Broadband Outage)",
      text: "I am calling to report that my broadband router shows a red blinking light since 8:00 AM. I have restarted it three times but internet is completely dead. This is in Lokhandwala Complex, Andheri West. I use the ₹999 plan. My JioHome Gateway device number is JIO-HW-902."
    },
    {
      label: "Airtel Double Deduction (Billing Dispute)",
      text: "Yesterday I made a UPI recharge of ₹799 on my Airtel postpaid mobile. The transaction failed at first, so I did it again and it succeeded. However, my bank statement shows two deductions of ₹799. I want one payment refunded to my GPAY account immediately."
    }
  ];

  const handleAnalyze = () => {
    if (!inputText.trim()) return;

    setAnalyzing(true);
    setResults(null);
    setTicketCreated(false);

    // Simulate AI model inference delay
    setTimeout(() => {
      const textLower = inputText.toLowerCase();
      let matchedIntent = "General Support Request";
      let category = "General";
      let emotion = "Neutral";
      let product = "Mobile Services";
      let rechargeAmount = "N/A";
      let device = "Standard Smartphone";
      let area = "General Circle";
      let confidence = 89;
      let rootCause = "Undetermined software query.";
      let resolution = "Awaiting agent validation.";

      if (textLower.includes('red') || textLower.includes('router') || textLower.includes('fiber') || textLower.includes('internet')) {
        matchedIntent = "Physical Broadband Outage";
        category = "Network & Hardware";
        emotion = "Frustrated";
        product = "JioFiber 150Mbps";
        rechargeAmount = "₹999";
        device = "JioHome Gateway (JIO-HW-902)";
        area = "Mumbai West (Andheri Splicing Circle)";
        confidence = 96;
        rootCause = "Physical fiber splice damage due to road widening construction.";
        resolution = "Dispatch physical field engineers to splice site. Notify surrounding subscribers and log ₹200 billing outage compensation.";
      } else if (textLower.includes('double') || textLower.includes('deduction') || textLower.includes('refund') || textLower.includes('recharge')) {
        matchedIntent = "Duplicate UPI Mobile Recharge Deduction";
        category = "Billing & Payments";
        emotion = "Anxious";
        product = "Airtel Postpaid Active plan";
        rechargeAmount = "₹799";
        device = "Airtel SIM Card (E-SIM)";
        area = "Delhi NCR";
        confidence = 94;
        rootCause = "Payment gateway double-settlement error on bank API handshake.";
        resolution = "Confirm double credit on system ledger. Initiate direct UPI gateway chargeback. Processing timeline 3 business days.";
      }

      setResults({
        intent: matchedIntent,
        category,
        emotion,
        product,
        rechargeAmount,
        device,
        area,
        confidence,
        rootCause,
        resolution
      });
      setAnalyzing(false);
    }, 1200);
  };

  const handleGenerateTicket = () => {
    if (!results) return;

    const tkt = addTicket({
      issue: `${results.intent} - ${results.device}`,
      customer: "Walk-in Analyzer Query",
      operator: results.product.toLowerCase().includes('jio') ? 'jio' : 'airtel',
      agent: "AI Automatic System",
      priority: results.emotion === 'Frustrated' ? 'High' : 'Medium',
      status: 'Open',
      category: results.category
    });

    setTicketId(tkt.id);
    setTicketCreated(true);
    setToastOpen(true);
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#F8FAFC', minHeight: 'calc(100vh - 70px)' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1E3A5F' }}>
            AI Query Analyzer
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Process custom voice transcripts or logs to auto-extract intent, categories, and generate tickets.
          </Typography>
        </Box>
        <Chip
          icon={<Sparkles size={14} style={{ color: '#0F766E' }} />}
          label="NLU Engine: v2.4-Active"
          sx={{ bgcolor: 'rgba(15, 118, 110, 0.1)', color: '#0F766E', fontWeight: 600, borderRadius: '6px' }}
        />
      </Box>

      <Grid container spacing={4}>
        {/* Left Side: Input console */}
        <Grid item xs={12} lg={6}>
          <Box display="flex" flexDirection="column" gap={3}>
            {/* Quick Templates */}
            <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', mb: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Load Test Scripts
              </Typography>
              <Box display="flex" flexDirection="column" gap={1.5}>
                {sampleTranscripts.map((t, idx) => (
                  <Button
                    key={idx}
                    variant="outlined"
                    onClick={() => setInputText(t.text)}
                    sx={{
                      textTransform: 'none',
                      justifyContent: 'flex-start',
                      fontFamily: 'Inter',
                      fontSize: '0.825rem',
                      borderColor: '#E2E8F0',
                      color: '#1E293B',
                      bgcolor: '#FFFFFF',
                      py: 1,
                      '&:hover': { bgcolor: '#F8FAFC', borderColor: '#CBD5E1' }
                    }}
                  >
                    {t.label}
                  </Button>
                ))}
              </Box>
            </Card>

            {/* Input field */}
            <Card sx={{ p: 3, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', mb: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Enter Conversation Log / Transcript
              </Typography>
              <TextField
                multiline
                rows={8}
                placeholder="Paste customer voice transcript here..."
                fullWidth
                variant="outlined"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                sx={{
                  mb: 2.5,
                  '& .MuiOutlinedInput-root': { borderRadius: '8px', fontFamily: 'Inter', fontSize: '0.9rem' }
                }}
              />
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  onClick={handleAnalyze}
                  disabled={analyzing || !inputText.trim()}
                  startIcon={analyzing ? <CircularProgress size={16} sx={{ color: '#FFFFFF' }} /> : <Brain size={18} />}
                  sx={{
                    bgcolor: '#1E3A5F',
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: '8px',
                    px: 3,
                    py: 1.25,
                    boxShadow: 'none',
                    '&:hover': { bgcolor: '#142842', boxShadow: 'none' }
                  }}
                >
                  {analyzing ? 'Extracting Features...' : 'Analyze Query'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setInputText('')}
                  sx={{ textTransform: 'none', borderRadius: '8px', borderColor: '#E2E8F0', color: '#64748B' }}
                >
                  Clear
                </Button>
              </Box>
            </Card>
          </Box>
        </Grid>

        {/* Right Side: AI Findings */}
        <Grid item xs={12} lg={6}>
          {analyzing && (
            <Card sx={{ p: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 380, border: '1px solid #E2E8F0', boxShadow: 'none' }}>
              <CircularProgress size={48} sx={{ color: '#0F766E', mb: 2 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1E293B' }}>
                Running NLP Entity Extraction models...
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                Categorizing sentiment tone, outage zones, and billing numbers.
              </Typography>
            </Card>
          )}

          {!analyzing && !results && (
            <Card sx={{ p: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 380, border: '1px dashed #E2E8F0', boxShadow: 'none', bgcolor: 'transparent' }}>
              <Cpu size={48} style={{ color: '#94A3B8', marginBottom: 16 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#64748B' }}>
                Console Ready
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, textAlign: 'center', maxWidth: 320 }}>
                Input a customer transcript or load a test script, then click Analyze to review AI findings.
              </Typography>
            </Card>
          )}

          {!analyzing && results && (
            <Card sx={{ p: 3.5, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Sparkles size={20} style={{ color: '#0F766E' }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    AI Analysis Results
                  </Typography>
                </Box>
                <Chip
                  label={`${results.confidence}% Confidence`}
                  size="small"
                  sx={{ bgcolor: 'rgba(34, 197, 94, 0.1)', color: '#22C55E', fontWeight: 600 }}
                />
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">Extracted Intent</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>{results.intent}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">Issue Category</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>{results.category}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">Customer Emotion Tone</Typography>
                  <Box display="flex" alignItems="center" gap={1} sx={{ mb: 2 }}>
                    <Chip
                      label={results.emotion}
                      size="small"
                      sx={{
                        bgcolor: results.emotion === 'Frustrated' ? '#EF444415' : '#22C55E15',
                        color: results.emotion === 'Frustrated' ? '#EF4444' : '#22C55E',
                        fontWeight: 600
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">Product Subscription</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>{results.product}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">Recharge Amount Detected</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>{results.rechargeAmount}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">Hardware Device Model</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>{results.device}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary">Impacted Network Area</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>{results.area}</Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Root Cause */}
              <Box sx={{ mb: 2.5 }}>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>AI Root Cause Prediction</Typography>
                <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.5 }}>
                  {results.rootCause}
                </Typography>
              </Box>

              {/* Recommended Action */}
              <Box sx={{ bgcolor: 'rgba(15, 118, 110, 0.05)', p: 2, borderRadius: '8px', mb: 3, border: '1px solid rgba(15, 118, 110, 0.1)' }}>
                <Typography variant="subtitle2" sx={{ color: '#0F766E', fontWeight: 700, mb: 0.5 }}>
                  Suggested Resolution Action
                </Typography>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.5 }}>
                  {results.resolution}
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                disabled={ticketCreated}
                onClick={handleGenerateTicket}
                sx={{
                  bgcolor: '#0F766E',
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.25,
                  borderRadius: '8px',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#0D645D', boxShadow: 'none' }
                }}
              >
                {ticketCreated ? `Ticket Created: ${ticketId}` : 'Apply Resolution & Generate Ticket'}
              </Button>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Toast Alert */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: '100%' }}>
          Ticket {ticketId} successfully pushed to corporate database queue!
        </Alert>
      </Snackbar>
    </Box>
  );
}
