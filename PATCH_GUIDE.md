# PATCH GUIDE
# Two files need manual search-and-replace.
# The new portfolio page is a full drop-in replacement.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE 1: pages/index.js
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIND this line (start of PROJECTS array):
  const PROJECTS = [
  {e:'🩺',t:'Medical Scribe AI',...

REPLACE the ENTIRE PROJECTS array (from const PROJECTS = [ to the closing ];)
with the contents of: PROJECTS_replacement.js

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE 2: data/services.js
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4 caseStudy blocks to replace. For each service key, find:
  caseStudy:{ industry:'...' title:'...' ...}
and replace with the matching block from: services_caseStudy_patches.js

Services to update:
  - 'ai-integration'   → AI Medical Scribe case study
  - 'web-mobile'       → Pet Health Platform case study
  - 'cloud-devops'     → Fax-to-AI Platform case study
  - 'ai-voice'         → AI Receptionist case study

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE 3: pages/portfolio/index.js  ← NEW FILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Drop in the new file at: pages/portfolio/index.js
(replaces or creates — full standalone page)
