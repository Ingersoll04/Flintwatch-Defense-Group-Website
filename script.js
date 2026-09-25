
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  navigation?.classList.toggle('is-open', !open);
  document.body.classList.toggle('nav-open', !open);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}

document.querySelectorAll('[data-year], #year').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const form = document.getElementById('service-request');
const status = document.getElementById('form-status');

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    if (status) status.textContent = 'Please complete the required fields.';
    return;
  }

  const data = new FormData(form);
  const selectedAreas = data.getAll('areas');
  const areas = selectedAreas.length ? selectedAreas.join(', ') : 'Not specified';

  const subject = encodeURIComponent(`FlintWatch Client Intake — ${data.get('service')}`);
  const body = encodeURIComponent(
`FLINTWATCH CLIENT INTAKE

CONTACT
Name: ${data.get('name')}
Organization / Household: ${data.get('organization') || 'N/A'}
Email: ${data.get('email')}
Phone: ${data.get('phone') || 'N/A'}
City / Area: ${data.get('location') || 'N/A'}
Preferred Contact: ${data.get('contact_preference') || 'Email'}
Best Time: ${data.get('contact_time') || 'Any reasonable time'}

SERVICE
Primary Service: ${data.get('service')}
Urgency: ${data.get('urgency')}
Areas Involved: ${areas}

REQUEST / CONTEXT
${data.get('message')}

DESIRED OUTCOME
${data.get('desired_outcome') || 'Not specified'}

CLIENT ACKNOWLEDGMENT
This is an initial service request. I have not included passwords, one-time codes, recovery codes, API keys, private keys, Social Security numbers, payment-card numbers, full bank account numbers, or authentication secrets. I understand this request does not create an emergency-response, law-enforcement, legal/compliance, financial-recovery guarantee, security guarantee, or regulated protective-services relationship.`
  );

  if (status) status.textContent = 'Opening your email application with the completed FlintWatch request...';
  window.location.href = `mailto:flintwatch.command@gmail.com?subject=${subject}&body=${body}`;
});

// ===== FlintWatch Client Intake =====
const intakeForm = document.getElementById('client-intake-form');
const intakeStatus = document.getElementById('intake-status');
const serviceDetailsBlock = document.getElementById('service-details-block');
const requestTypeSelect = document.getElementById('request-type');
const intakeReview = document.getElementById('intake-review');
const intakeSummary = document.getElementById('intake-summary');
const saveIntakeButton = document.getElementById('save-intake');
const clearIntakeButton = document.getElementById('clear-intake');
const copyIntakeButton = document.getElementById('copy-intake');
const emailIntakeButton = document.getElementById('email-intake');
const emailHandoffStatus = document.getElementById('email-handoff-status');

const intakeRequestTypes = {
  'Cyber Defense & Digital Security': [
    'Household Cybersecurity Assessment',
    'Small-Business Cyber Readiness Assessment',
    'Fraud / Scam Recovery Guidance',
    'Account Compromise / Account Takeover Guidance',
    'Home Wi-Fi / Network Security Review',
    'Device / Email Security Review',
    'Digital Privacy / Identity Protection Planning',
    'Other Cybersecurity Request'
  ],
  'Home Security & Emergency Preparedness': [
    'Home Security Assessment',
    'Camera / Monitoring Planning',
    'Access Control / Entry Security Planning',
    '72-Hour Go Bag Planning',
    'Family Emergency Readiness Assessment',
    'Emergency Communications Planning',
    'Family Safety / Continuity Plan',
    'Other Home Security / Preparedness Request'
  ],
  'Training & Readiness': [
    'Preparedness / Readiness Training',
    'Situational Awareness Training',
    'Private Instruction Inquiry',
    'Group / Organization Training Inquiry',
    'Emergency Communications Training',
    'Firearms Training Interest — availability subject to qualifications, insurance, range rules, and applicable law',
    'Other Training Request'
  ],
  'Risk & Intelligence Advisory': [
    'Risk Assessment / Vulnerability Review',
    'Threat Awareness / Intelligence Briefing',
    'Business Continuity / Readiness Planning',
    'Security Policy / Procedure Development',
    'Open-Source Research / Intelligence Support',
    'Other Risk / Intelligence Request'
  ],
  'Protective Services Inquiry': [
    'Security Planning / Advisory',
    'Event Security Planning Inquiry',
    'Property / Site Security Planning',
    'Future Protective Services Interest — regulated services subject to licensing and availability',
    'Other Protective Services Inquiry'
  ]
};

function getSelectedServiceArea() {
  return intakeForm?.querySelector('input[name="serviceArea"]:checked')?.value || '';
}

function populateRequestTypes(area) {
  if (!requestTypeSelect) return;
  requestTypeSelect.innerHTML = '<option value="">Select your request</option>';
  (intakeRequestTypes[area] || []).forEach((item) => {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    requestTypeSelect.appendChild(option);
  });
  if (serviceDetailsBlock) serviceDetailsBlock.hidden = !area;
}

intakeForm?.querySelectorAll('input[name="serviceArea"]').forEach((radio) => {
  radio.addEventListener('change', () => populateRequestTypes(radio.value));
});

function intakeDataObject() {
  if (!intakeForm) return {};
  const data = new FormData(intakeForm);
  return {
    serviceArea: getSelectedServiceArea(),
    requestType: data.get('requestType') || '',
    summary: data.get('summary') || '',
    urgency: data.get('urgency') || '',
    stage: data.get('stage') || '',
    name: data.get('name') || '',
    organization: data.get('organization') || '',
    email: data.get('email') || '',
    phone: data.get('phone') || '',
    location: data.get('location') || '',
    contactMethod: data.get('contactMethod') || '',
    contactTime: data.get('contactTime') || ''
  };
}

function buildIntakeSummary(d) {
  return `FLINTWATCH CLIENT SERVICE REQUEST\n\n` +
`PRIMARY SERVICE AREA\n${d.serviceArea || 'Not selected'}\n\n` +
`REQUEST TYPE\n${d.requestType || 'Not selected'}\n\n` +
`SITUATION / GOAL\n${d.summary || 'Not provided'}\n\n` +
`URGENCY\n${d.urgency || 'Not provided'}\n\n` +
`CURRENT STAGE\n${d.stage || 'Not provided'}\n\n` +
`CLIENT INFORMATION\nName: ${d.name || 'Not provided'}\nHousehold / Organization: ${d.organization || 'N/A'}\nEmail: ${d.email || 'Not provided'}\nPhone: ${d.phone || 'N/A'}\nCity / Area: ${d.location || 'N/A'}\nPreferred Contact: ${d.contactMethod || 'Not provided'}\nBest Contact Time: ${d.contactTime || 'N/A'}\n\n` +
`CLIENT ACKNOWLEDGMENT\nThis is an initial service request. No passwords, one-time codes, SSNs, payment-card numbers, account credentials, API/private keys, recovery codes, or other authentication secrets are included.`;
}

function saveIntakeDraft() {
  try {
    const d = intakeDataObject();
    localStorage.setItem('flintwatchClientIntakeDraft', JSON.stringify(d));
    if (intakeStatus) intakeStatus.textContent = 'Draft saved on this device.';
  } catch {
    if (intakeStatus) intakeStatus.textContent = 'This browser could not save the draft locally.';
  }
}

function restoreIntakeDraft() {
  if (!intakeForm) return;
  try {
    const raw = localStorage.getItem('flintwatchClientIntakeDraft');
    if (!raw) return;
    const d = JSON.parse(raw);
    const serviceRadio = intakeForm.querySelector(`input[name="serviceArea"][value="${CSS.escape(d.serviceArea || '')}"]`);
    if (serviceRadio) {
      serviceRadio.checked = true;
      populateRequestTypes(d.serviceArea);
    }
    Object.entries(d).forEach(([key, value]) => {
      if (key === 'serviceArea') return;
      const field = intakeForm.elements.namedItem(key);
      if (field && typeof value === 'string') field.value = value;
    });
    if (intakeStatus) intakeStatus.textContent = 'A saved draft was restored from this device.';
  } catch {
    // Ignore malformed/blocked local storage.
  }
}

saveIntakeButton?.addEventListener('click', saveIntakeDraft);
clearIntakeButton?.addEventListener('click', () => {
  intakeForm?.reset();
  if (serviceDetailsBlock) serviceDetailsBlock.hidden = true;
  if (requestTypeSelect) requestTypeSelect.innerHTML = '<option value="">Select your request</option>';
  if (intakeReview) intakeReview.hidden = true;
  try { localStorage.removeItem('flintwatchClientIntakeDraft'); } catch {}
  if (intakeStatus) intakeStatus.textContent = 'Form cleared.';
});

intakeForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!intakeForm.checkValidity()) {
    intakeForm.reportValidity();
    if (intakeStatus) intakeStatus.textContent = 'Please complete the required fields before building your request.';
    return;
  }
  const d = intakeDataObject();
  const summaryText = buildIntakeSummary(d);
  if (intakeSummary) intakeSummary.textContent = summaryText;
  if (intakeReview) {
    intakeReview.hidden = false;
    intakeReview.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (intakeStatus) intakeStatus.textContent = 'Request prepared. Review it below before sending.';
});

copyIntakeButton?.addEventListener('click', async () => {
  const text = intakeSummary?.textContent || '';
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    copyIntakeButton.textContent = 'Copied';
    if (emailHandoffStatus) emailHandoffStatus.textContent = 'Request copied. Open your email provider, paste it into a message to flintwatch.command@gmail.com, then press Send.';
    setTimeout(() => { copyIntakeButton.textContent = 'Copy Request'; }, 1600);
  } catch {
    window.prompt('Copy your FlintWatch request:', text);
    if (emailHandoffStatus) emailHandoffStatus.textContent = 'Copy the selected request, then paste it into a message to flintwatch.command@gmail.com and press Send.';
  }
});

emailIntakeButton?.addEventListener('click', () => {
  const d = intakeDataObject();
  const text = intakeSummary?.textContent || buildIntakeSummary(d);
  const subject = encodeURIComponent(`FlintWatch Service Request — ${d.requestType || d.serviceArea || 'Client Intake'}`);
  const body = encodeURIComponent(text);
  if (emailHandoffStatus) emailHandoffStatus.textContent = 'Opening your device email app. If nothing happens, copy the request and use Gmail, Outlook, or your usual email provider. Your request has not been sent yet.';
  window.location.href = `mailto:flintwatch.command@gmail.com?subject=${subject}&body=${body}`;
});

restoreIntakeDraft();
