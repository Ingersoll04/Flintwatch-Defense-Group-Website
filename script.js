
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
  const subject = encodeURIComponent(`FlintWatch Service Request — ${data.get('service')}`);
  const body = encodeURIComponent(
`FLINTWATCH SERVICE REQUEST

Name: ${data.get('name')}
Organization / Household: ${data.get('organization') || 'N/A'}
Email: ${data.get('email')}
Phone: ${data.get('phone') || 'N/A'}
Service: ${data.get('service')}

Request / Goals:
${data.get('message')}

I understand this is an initial service request and have not included passwords, recovery codes, API keys, private keys, SSNs, payment-card numbers, or other authentication secrets.`
  );

  if (status) status.textContent = 'Opening your email application...';
  window.location.href = `mailto:flintwatch.command@gmail.com?subject=${subject}&body=${body}`;
});
