// TeleResolve AI - Enterprise Telecom Mock Database Layer

export const MOCK_COMPANIES = [
  { id: 'airtel', name: 'Airtel', logoColor: '#E31837', code: 'ARTL' },
  { id: 'jio', name: 'Jio', logoColor: '#0F3CC9', code: 'RJIO' },
  { id: 'vi', name: 'Vi', logoColor: '#FF0000', code: 'VILN' },
  { id: 'bsnl', name: 'BSNL', logoColor: '#0054A6', code: 'BSNL' },
  { id: 'act', name: 'ACT', logoColor: '#ED1C24', code: 'ACTF' },
  { id: 'hathway', name: 'Hathway', logoColor: '#0085C7', code: 'HTWY' }
];

export const MOCK_USERS = [
  {
    id: 'usr-admin',
    email: 'admin@teleresolve.ai',
    name: 'Sarah Jenkins',
    role: 'Admin',
    company: 'global',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 'usr-airtel-sup',
    email: 'supervisor@airtel.com',
    name: 'Rajesh Kumar',
    role: 'Supervisor',
    company: 'airtel',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 'usr-jio-agt',
    email: 'agent.rahul@jio.com',
    name: 'Rahul Sharma',
    role: 'Agent',
    company: 'jio',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 'usr-vi-agt',
    email: 'agent.priya@vi.com',
    name: 'Priya Patel',
    role: 'Agent',
    company: 'vi',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120'
  }
];

export const MOCK_CUSTOMERS = [
  {
    id: 'CUST-9021',
    name: 'Amit Sharma',
    phone: '+91 98765 43210',
    operator: 'jio',
    email: 'amit.sharma@example.com',
    location: 'Mumbai, Maharashtra',
    plan: 'JioFiber 150Mbps Unlimited',
    rechargeHistory: [
      { date: '2026-07-01', amount: '₹999', plan: 'Fiber Premium', status: 'Success' },
      { date: '2026-06-01', amount: '₹999', plan: 'Fiber Premium', status: 'Success' },
      { date: '2026-05-01', amount: '₹999', plan: 'Fiber Premium', status: 'Success' }
    ],
    complaintHistory: [
      { id: 'TR-TKT-101', issue: 'Fiber router red light flashing', status: 'Resolved', date: '2026-05-12' }
    ],
    csatScore: 88,
    joinedDate: '2025-01-10'
  },
  {
    id: 'CUST-9022',
    name: 'Anjali Rao',
    phone: '+91 98123 45678',
    operator: 'airtel',
    email: 'anjali.rao@example.com',
    location: 'Bengaluru, Karnataka',
    plan: 'Airtel Black ₹1099 Plan',
    rechargeHistory: [
      { date: '2026-07-05', amount: '₹1099', plan: 'Airtel Black', status: 'Success' },
      { date: '2026-06-05', amount: '₹1099', plan: 'Airtel Black', status: 'Success' }
    ],
    complaintHistory: [],
    csatScore: 94,
    joinedDate: '2025-03-15'
  },
  {
    id: 'CUST-9023',
    name: 'Vikram Singh',
    phone: '+91 99112 23344',
    operator: 'vi',
    email: 'vikram.singh@example.com',
    location: 'Delhi NCR',
    plan: 'Vi Hero Unlimited 499',
    rechargeHistory: [
      { date: '2026-07-10', amount: '₹499', plan: 'Hero Unlimited', status: 'Success' },
      { date: '2026-06-12', amount: '₹499', plan: 'Hero Unlimited', status: 'Success' }
    ],
    complaintHistory: [
      { id: 'TR-TKT-104', issue: 'Zero network signal in office basement', status: 'Open', date: '2026-07-19' }
    ],
    csatScore: 42,
    joinedDate: '2025-06-01'
  },
  {
    id: 'CUST-9024',
    name: 'Karthik Raja',
    phone: '+91 94440 12345',
    operator: 'bsnl',
    email: 'karthik.raja@example.com',
    location: 'Chennai, Tamil Nadu',
    plan: 'BSNL Bharat Fiber 100Mbps',
    rechargeHistory: [
      { date: '2026-07-02', amount: '₹799', plan: 'Bharat Fiber Value', status: 'Success' },
      { date: '2026-06-02', amount: '₹799', plan: 'Bharat Fiber Value', status: 'Failed' },
      { date: '2026-06-03', amount: '₹799', plan: 'Bharat Fiber Value', status: 'Success' }
    ],
    complaintHistory: [
      { id: 'TR-TKT-102', issue: 'Bill paid but account suspended', status: 'Resolved', date: '2026-06-04' }
    ],
    csatScore: 65,
    joinedDate: '2024-11-20'
  },
  {
    id: 'CUST-9025',
    name: 'Manoj Kumar',
    phone: '+91 80234 56789',
    operator: 'act',
    email: 'manoj.k@example.com',
    location: 'Hyderabad, Telangana',
    plan: 'ACT Incredible 150Mbps',
    rechargeHistory: [
      { date: '2026-07-08', amount: '₹1150', plan: 'Incredible Retail', status: 'Success' }
    ],
    complaintHistory: [],
    csatScore: 78,
    joinedDate: '2025-05-18'
  }
];

export const MOCK_CALLS = [
  {
    id: 'TR-CALL-101',
    customer: 'Amit Sharma',
    customerId: 'CUST-9021',
    operator: 'jio',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    agent: 'Rahul Sharma',
    duration: '05:42',
    status: 'Active',
    language: 'English & Hindi',
    priority: 'Critical',
    sentiment: 'Frustrated',
    intent: 'Network Outage / Slow Internet',
    score: 0.85,
    entities: {
      plan: 'JioFiber 150Mbps',
      rechargeAmount: '₹999',
      device: 'Jio Home Gateway (JCO110)',
      area: 'Mumbai Western Suburbs'
    },
    summary: 'Customer reports that since yesterday evening, the fiber router shows a red light blinking. Internet is completely down. Has tried restarting the router multiple times but the issue persists. Customer is highly frustrated due to working from home.',
    transcript: [
      { speaker: 'Agent', text: 'Thank you for calling customer care. My name is Rahul. How can I help you today?' },
      { speaker: 'Customer', text: 'Yes, hi Rahul. My JioFiber is completely down since yesterday evening. The router is just flashing a red light and nothing is working!' },
      { speaker: 'Agent', text: 'I understand your frustration, sir. I see that your router is offline. Let me check if there is an outage in your area. Can you confirm your registered number?' },
      { speaker: 'Customer', text: 'It is the same number, 9876543210. Please fix it quickly, I am working from home and losing valuable billing hours!' },
      { speaker: 'Agent', text: 'Thank you. I have checked the system. There is indeed a localized fiber cut in your area due to road construction. Our field team is already working on it. It should be resolved within 3 hours.' },
      { speaker: 'Customer', text: '3 hours? This is unacceptable. It has already been down for 12 hours! Can I get some refund or data credit for this outage?' },
      { speaker: 'Agent', text: 'I completely agree, sir. I will raise a billing waiver ticket so that you will be credited for the days the service was disrupted once it is back online.' }
    ],
    suggestedResolution: 'Create technical support dispatch ticket and apply ₹150 outage billing compensation credit.',
    timeline: [
      { time: '10:00 AM', event: 'Call Landed on IVR' },
      { time: '10:01 AM', event: 'Selected Broadband Support' },
      { time: '10:02 AM', event: 'Assigned to Agent Rahul Sharma' },
      { time: '10:04 AM', event: 'AI Outage Detection Triggered' }
    ]
  },
  {
    id: 'TR-CALL-102',
    customer: 'Anjali Rao',
    customerId: 'CUST-9022',
    operator: 'airtel',
    phone: '+91 98123 45678',
    location: 'Bengaluru, Karnataka',
    agent: 'Samantha Lee',
    duration: '03:15',
    status: 'Active',
    language: 'English',
    priority: 'Medium',
    sentiment: 'Neutral',
    intent: 'International Roaming Activation',
    score: 0.92,
    entities: {
      plan: 'Airtel Black postpaid',
      destination: 'London, UK',
      durationNeeded: '10 days'
    },
    summary: 'Customer wants to activate the international roaming pack for their upcoming travel to London, UK next week. Confirmed the pricing of the ₹3999 pack which includes 5GB data and 500 minutes outgoing/incoming.',
    transcript: [
      { speaker: 'Agent', text: 'Hello, welcome to Airtel Elite Care. I am Samantha. How may I assist you?' },
      { speaker: 'Customer', text: 'Hi, I am traveling to the United Kingdom next Tuesday for 10 days. I want to activate an international roaming plan on my postpaid number.' },
      { speaker: 'Agent', text: 'Sure, Anjali. Let me fetch your postpaid profile. Yes, I see you are on our Airtel Black plan. We have a special UK pack for ₹3999 which covers 10 days of unlimited incoming and 5GB high-speed data.' },
      { speaker: 'Customer', text: 'Is that active immediately, or can I schedule it for next Tuesday?' },
      { speaker: 'Agent', text: 'We can schedule it to auto-activate on the date of your travel so you do not lose any validity. Shall I go ahead and queue it?' },
      { speaker: 'Customer', text: 'Yes, please queue it starting Tuesday morning 6:00 AM.' }
    ],
    suggestedResolution: 'Schedule Postpaid International Roaming Pack (ID: IR-3999) activation for 2026-07-25 06:00 IST.',
    timeline: [
      { time: '10:10 AM', event: 'Call Landed' },
      { time: '10:11 AM', event: 'Assigned to Samantha Lee' },
      { time: '10:13 AM', event: 'Pack Scheduled successfully' }
    ]
  },
  {
    id: 'TR-CALL-103',
    customer: 'Vikram Singh',
    customerId: 'CUST-9023',
    operator: 'vi',
    phone: '+91 99112 23344',
    location: 'Delhi NCR',
    agent: 'Priya Patel',
    duration: '06:10',
    status: 'Completed',
    language: 'Hindi',
    priority: 'High',
    sentiment: 'Negative',
    intent: 'Double Recharge Deduction',
    score: 0.89,
    entities: {
      plan: 'Vi Hero Unlimited 499',
      rechargeAmount: '₹499',
      transactionId: 'TXN-902183201',
      paymentMethod: 'UPI (GPay)'
    },
    summary: 'Customer recharged twice with ₹499 plan using UPI. Money was deducted twice from bank account, but only one recharge validity was applied. Customer wants instant refund of the duplicate transaction.',
    transcript: [
      { speaker: 'Customer', text: 'Mene kal shaam ko ₹499 ka recharge kiya tha GPay se. Bank se do baar paise cut gaye par recharge ek hi dikha raha hai!' },
      { speaker: 'Agent', text: 'Aap nishchint rahiye sir, mai check karti hu. Kya mai aapka registered number jaan sakti hu?' },
      { speaker: 'Customer', text: 'Haan, yahi number hai 9911223344. Bank ka message bhi aaya hai ki do baar ₹499 debit hua hai.' },
      { speaker: 'Agent', text: 'Check karne par dikh raha hai ki ek payment pending state me thaa aur baad me credit ho gaya. Aapke account me do recharge queued hai. Ek active hai aur doosra agle mahine auto-active ho jayega. Agar aapko refund chahiye, toh hum yaha se request initiate kar sakte hai.' },
      { speaker: 'Customer', text: 'Haan mujhe refund chahiye. Mujhe queued recharge nahi rakhna hai.' },
      { speaker: 'Agent', text: 'Theek hai, mene ek refund request ticket raise kar di hai. 3-5 working days me aapke bank me refund aa jayega.' }
    ],
    suggestedResolution: 'Initiate UPI refund for duplicate TXN-902183201. Refund approved, processing time 3-5 banking days.',
    timeline: [
      { time: '09:12 AM', event: 'Call Landed' },
      { time: '09:14 AM', event: 'UPI Gateway Log Verified' },
      { time: '09:16 AM', event: 'Refund Ticket TR-TKT-106 Raised' },
      { time: '09:18 AM', event: 'Call Completed' }
    ]
  }
];

export const MOCK_TICKETS = [
  {
    id: 'TR-TKT-101',
    issue: 'Fiber router red light flashing',
    customer: 'Amit Sharma',
    operator: 'jio',
    agent: 'Rahul Sharma',
    priority: 'High',
    status: 'In Progress',
    category: 'Hardware',
    createdDate: '2026-07-20',
    resolutionTime: '--'
  },
  {
    id: 'TR-TKT-102',
    issue: 'Bill paid but account suspended',
    customer: 'Karthik Raja',
    operator: 'bsnl',
    agent: 'Bala Subbu',
    priority: 'Critical',
    status: 'Resolved',
    category: 'Billing',
    createdDate: '2026-07-18',
    resolutionTime: '1.2 Hours'
  },
  {
    id: 'TR-TKT-103',
    issue: 'SIM Activation delay exceeding 24 hours',
    customer: 'Rajesh Shah',
    operator: 'airtel',
    agent: 'Samantha Lee',
    priority: 'Medium',
    status: 'Open',
    category: 'SIM Activation',
    createdDate: '2026-07-20',
    resolutionTime: '--'
  },
  {
    id: 'TR-TKT-104',
    issue: 'Zero network signal in office basement',
    customer: 'Vikram Singh',
    operator: 'vi',
    agent: 'Priya Patel',
    priority: 'High',
    status: 'Escalated',
    category: 'Network',
    createdDate: '2026-07-19',
    resolutionTime: '--'
  },
  {
    id: 'TR-TKT-105',
    issue: 'DND activation request not processing',
    customer: 'Sneha Rao',
    operator: 'jio',
    agent: 'Rahul Sharma',
    priority: 'Low',
    status: 'Resolved',
    category: 'Value Added Service',
    createdDate: '2026-07-15',
    resolutionTime: '45 Mins'
  }
];

export const MOCK_KB = [
  {
    id: 'KB-SOP-001',
    title: 'Router Red Light Troubleshooting SOP',
    category: 'Hardware',
    content: 'Standard operating procedure for handling red light alerts on Fiber Home Gateways.',
    steps: [
      'Check physical fiber patch cable connections at the wall outlet and back of the router.',
      'Check RX optical power in terminal (Ideal range: -15dBm to -25dBm).',
      'If optical power is below -27dBm, schedule field technician dispatch for fiber splicing.',
      'If optical power is normal, perform gateway reboot and configuration push.'
    ],
    recommendedAnswers: 'I understand you see a red light on your router. Let us check if the thin fiber cable is plugged in firmly. If it is, this usually indicates a drop in optical signal, and I will check the network parameters or schedule a technician visit.'
  },
  {
    id: 'KB-SOP-002',
    title: 'Duplicate Recharge & UPI Refund Policy',
    category: 'Billing',
    content: 'Guidelines for resolving double deductions during mobile recharge transactions.',
    steps: [
      'Verify the transaction history in the customer portal.',
      'Check if the second recharge is in the queue. Explain queueing logic to the customer.',
      'If the customer requests a refund instead of queueing, initiate standard refund via billing gateway.',
      'Inform customer that refunds take 3 to 5 working days for UPI and card transactions.'
    ],
    recommendedAnswers: 'Since you made a double recharge, the second amount is safe and queued to start automatically. However, if you prefer a refund, I can initiate a cancellation. The funds will return to your bank account within 3 to 5 business days.'
  },
  {
    id: 'KB-SOP-003',
    title: 'Postpaid International Roaming Scheduling',
    category: 'Network',
    content: 'How to pre-book and schedule postpaid roaming services for foreign travel.',
    steps: [
      'Confirm customer destination and travel duration.',
      'Verify eligibility of postpaid account (No outstanding bills).',
      'Select the appropriate IR Pack from the catalog.',
      'Enter the target date/time in GMT+5:30 to schedule the cron activation.'
    ],
    recommendedAnswers: 'I can schedule your international roaming pack to activate automatically on your date of departure. This ensures you do not waste any pack validity while you are still in India.'
  }
];

export const MOCK_AUDIT_LOGS = [
  { time: '2026-07-20 10:02:14', user: 'Rahul Sharma', action: 'Call Answered (TR-CALL-101)', company: 'jio', ip: '192.168.12.54' },
  { time: '2026-07-20 09:48:32', user: 'Sarah Jenkins', action: 'Global AI Settings Updated', company: 'global', ip: '10.0.1.12' },
  { time: '2026-07-20 09:18:02', user: 'Priya Patel', action: 'Created Ticket (TR-TKT-106)', company: 'vi', ip: '192.168.14.22' },
  { time: '2026-07-20 08:30:00', user: 'System', action: 'Daily Analytics Generated', company: 'global', ip: 'localhost' }
];

export const MOCK_DEPARTMENTS = [
  { id: 'dept-tech', name: 'Technical Support', head: 'Vikram Phadnis', agents: 18 },
  { id: 'dept-bill', name: 'Billing & Payments', head: 'Neha Aggarwal', agents: 12 },
  { id: 'dept-sales', name: 'Retention & Sales', head: 'Kunal Sen', agents: 8 }
];
