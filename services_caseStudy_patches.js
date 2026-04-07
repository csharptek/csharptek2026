// ── PATCH: Update these caseStudy blocks in data/services.js ──
// Find each service key and replace ONLY the caseStudy object

// ── 'ai-integration' service ──
// REPLACE existing caseStudy with:
caseStudy:{
  industry:'Healthcare',
  title:'AI Medical Scribe — 70% Less Documentation Time',
  desc:'We built a real-time voice-to-SOAP note generation system for a hospital group, integrated with EHR systems via secure APIs. Physicians speak naturally — structured clinical notes are generated instantly. HIPAA & GDPR compliant.',
  stack:['Azure OpenAI','React','Node.js','.NET Core','Azure Cognitive Services'],
  metrics:[
    {value:'70%',label:'Reduction in documentation time'},
    {value:'Real-time',label:'Speech-to-SOAP note generation'},
    {value:'0',label:'HIPAA incidents since deployment'},
    {value:'Multi-channel',label:'In-person, video & phone encounters'},
  ],
},

// ── 'web-mobile' service ──
// REPLACE existing caseStudy with:
caseStudy:{
  industry:'Veterinary',
  title:'Cloud-Native Pet Health Platform — Dual App on Azure',
  desc:'We built two interconnected Azure-native applications for a pet vaccination camp operator — a pet owner app with scheduling and virtual consultations, and a workforce app with real-time inventory, team messaging and task coordination.',
  stack:['Blazor','.NET Core','Azure SQL','SignalR','Azure Functions','Azure AD'],
  metrics:[
    {value:'Real-time',label:'Inventory tracking via SignalR'},
    {value:'2 apps',label:'Pet owner + workforce platforms'},
    {value:'WebRTC',label:'Virtual vet consultations built in'},
    {value:'Azure',label:'Fully cloud-native, multi-location'},
  ],
},

// ── 'cloud-devops' service ──
// REPLACE existing caseStudy with:
caseStudy:{
  industry:'Healthcare Automation',
  title:'Fax-to-AI Platform — Dispatch in Under 3 Minutes',
  desc:'We migrated a fax-driven wound care operation onto a fully automated, HIPAA-compliant AI platform on AWS. OCR extracts patient referral data, AI matches and dispatches nurses, and real-time dashboards give full operational visibility.',
  stack:['AWS','Docker','GitHub Actions','Django','PostgreSQL','Redis','OCR'],
  metrics:[
    {value:'90%',label:'Faster dispatch (25 min → under 3 min)'},
    {value:'0',label:'HIPAA violations since go-live'},
    {value:'100%',label:'Inventory visibility — zero losses'},
    {value:'70%',label:'Faster staff onboarding'},
  ],
},

// ── 'ai-voice' service ──
// REPLACE existing caseStudy with:
caseStudy:{
  industry:'Healthcare',
  title:'AI Receptionist — 60–90% Cost Reduction in Front-Desk Ops',
  desc:'We built a full-stack AI receptionist for healthcare clinics that handles unlimited concurrent inbound and outbound calls, books appointments, sends automated reminders and integrates with EHR & CRM systems — HIPAA compliant.',
  stack:['Twilio','LLMs','STT / TTS','Node.js','Python','AWS / Azure'],
  metrics:[
    {value:'60–90%',label:'Cost reduction in front-desk operations'},
    {value:'Unlimited',label:'Concurrent calls — no extra hiring'},
    {value:'HIPAA',label:'Certified compliant architecture'},
    {value:'24/7',label:'Coverage across all time zones'},
  ],
},
