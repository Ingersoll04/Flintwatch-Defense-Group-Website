
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
