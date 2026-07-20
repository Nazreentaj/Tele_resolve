import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Cpu, Search, BookOpen, ChevronRight, Copy, FileText } from 'lucide-react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Grid,
  Tabs,
  Tab,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Alert
} from '@mui/material';

export default function KnowledgeBase() {
  const { kbArticles, tickets } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0); // 0 = All, 1 = Hardware, 2 = Billing, 3 = Network
  const [selectedArticle, setSelectedArticle] = useState(kbArticles[0]);
  const [copied, setCopied] = useState(false);

  const categories = ['All', 'Hardware', 'Billing', 'Network'];

  const filteredArticles = kbArticles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.recommendedAnswers.toLowerCase().includes(searchTerm.toLowerCase());

    const catName = categories[activeTab];
    const matchesCategory = catName === 'All' || art.category === catName;

    return matchesSearch && matchesCategory;
  });

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#F8FAFC', minHeight: 'calc(100vh - 70px)' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1E3A5F' }}>
          Enterprise Knowledge Repository
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Access verified SOP playbooks, technical diagnostics, and AI recommended script answers.
        </Typography>
      </Box>

      {/* Search Console */}
      <Card sx={{ p: 2.5, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none', mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5}>
            <TextField
              size="small"
              placeholder="Search SOP title, steps, error codes..."
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search size={16} style={{ color: '#94A3B8', marginRight: 8 }} />
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Tabs
              value={activeTab}
              onChange={(e, val) => {
                setActiveTab(val);
                // Auto-select first matching article on tab switch
                const catName = categories[val];
                const matching = kbArticles.filter(a => catName === 'All' || a.category === catName);
                if (matching.length > 0) {
                  setSelectedArticle(matching[0]);
                }
              }}
              sx={{
                minHeight: 40,
                '.MuiTabs-indicator': { bgcolor: '#0F766E' },
                '.MuiTab-root': { textTransform: 'none', fontWeight: 600, minHeight: 40, py: 0.5 }
              }}
            >
              {categories.map((cat, idx) => (
                <Tab key={idx} label={cat} />
              ))}
            </Tabs>
          </Grid>
        </Grid>
      </Card>

      <Grid container spacing={4}>
        {/* Left Side: Article List */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none', height: '100%', minHeight: 400 }}>
            <Box p={2.5} sx={{ borderBottom: '1px solid #F1F5F9', bgcolor: '#F8FAFC' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F' }}>
                Playbook Articles ({filteredArticles.length})
              </Typography>
            </Box>
            <List disablePadding>
              {filteredArticles.map((art) => (
                <React.Fragment key={art.id}>
                  <ListItem
                    button
                    onClick={() => setSelectedArticle(art)}
                    selected={selectedArticle && selectedArticle.id === art.id}
                    sx={{
                      py: 2,
                      px: 2.5,
                      '&.Mui-selected': {
                        bgcolor: 'rgba(15, 118, 110, 0.05)',
                        borderLeft: '4px solid #0F766E',
                        '&:hover': { bgcolor: 'rgba(15, 118, 110, 0.08)' }
                      }
                    }}
                  >
                    <ListItemText
                      primary={<Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>{art.title}</Typography>}
                      secondary={
                        <Box display="flex" alignItems="center" gap={1} sx={{ mt: 0.5 }}>
                          <Chip label={art.category} size="small" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 600, bgcolor: '#F1F5F9' }} />
                          <Typography variant="caption" color="text.secondary">{art.id}</Typography>
                        </Box>
                      }
                    />
                    <ChevronRight size={16} style={{ color: '#94A3B8' }} />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
              {filteredArticles.length === 0 && (
                <Box p={4} textAlign="center">
                  <Typography variant="body2" color="text.secondary">No articles found matching filters.</Typography>
                </Box>
              )}
            </List>
          </Card>
        </Grid>

        {/* Right Side: Article Details */}
        <Grid item xs={12} lg={8}>
          {selectedArticle ? (
            <Card sx={{ p: 4, borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
              <Box display="flex" justifyContent="space-between" alignItems="start" sx={{ mb: 2.5 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1E3A5F' }}>
                    {selectedArticle.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                    Article Reference: {selectedArticle.id} | Department: {selectedArticle.category} Support
                  </Typography>
                </Box>
                <Chip label={selectedArticle.category} size="small" sx={{ bgcolor: '#0F766E10', color: '#0F766E', fontWeight: 600 }} />
              </Box>

              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6, mb: 3 }}>
                {selectedArticle.content}
              </Typography>

              {/* SOP Steps */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A5F', mb: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Standard Operating Procedures
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  {selectedArticle.steps.map((step, idx) => (
                    <Box key={idx} display="flex" gap={2}>
                      <Box
                        sx={{
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          bgcolor: '#1E3A5F10',
                          color: '#1E3A5F',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          fontSize: '11px',
                          fontWeight: 700
                        }}
                      >
                        {idx + 1}
                      </Box>
                      <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.5 }}>
                        {step}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* AI Script Recommendation */}
              <Box sx={{ bgcolor: 'rgba(15, 118, 110, 0.04)', border: '1px solid rgba(15, 118, 110, 0.1)', p: 3, borderRadius: '8px', mb: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Cpu size={18} style={{ color: '#0F766E' }} />
                    <Typography variant="subtitle2" sx={{ color: '#0F766E', fontWeight: 700 }}>
                      AI Recommended Verbal response Script
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => handleCopyText(selectedArticle.recommendedAnswers)}
                    startIcon={<Copy size={12} />}
                    sx={{ textTransform: 'none', color: '#0F766E', fontWeight: 600 }}
                  >
                    {copied ? 'Copied!' : 'Copy Script'}
                  </Button>
                </Box>
                <Typography variant="body2" sx={{ color: '#334155', fontStyle: 'italic', lineHeight: 1.5 }}>
                  "{selectedArticle.recommendedAnswers}"
                </Typography>
              </Box>

              {/* Related Tickets */}
              <Box>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Related Resolved Tickets Using This SOP
                </Typography>
                <List size="small" disablePadding>
                  {tickets.filter(t => t.category === selectedArticle.category && t.status === 'Resolved').slice(0, 2).map((t, idx) => (
                    <ListItem key={idx} sx={{ px: 0, py: 1 }}>
                      <FileText size={16} style={{ color: '#94A3B8', marginRight: 8 }} />
                      <ListItemText
                        primary={<Typography variant="body2" sx={{ fontWeight: 600 }}>{t.id} - {t.issue}</Typography>}
                        secondary={`Resolved by ${t.agent} (AHT: ${t.resolutionTime})`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Card>
          ) : (
            <Card sx={{ p: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Typography variant="body2" color="text.secondary">Select an article from the left pane to view documentation.</Typography>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
