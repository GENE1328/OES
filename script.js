const navToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const form = document.querySelector('#enquiry-form');
const feedback = document.querySelector('.form-feedback');
const year = document.querySelector('#year');

if (year) year.textContent = new Date().getFullYear();

const currentPage = document.body?.dataset.page || (window.location.pathname.split('/').pop() || 'index').replace('.html', '');
document.querySelectorAll('.site-nav a:not(.nav-cta)').forEach((link) => {
  const page = (link.getAttribute('href') || '').split('/').pop().replace('.html', '') || 'index';
  link.classList.toggle('is-active', page === currentPage);
});

navToggle?.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('is-open', !open);
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('is-open');
  });
});

document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    const select = form?.querySelector('[name="service"]');
    if (select) select.value = link.dataset.service;
  });
});

const serviceFromQuery = new URLSearchParams(window.location.search).get('service');
if (serviceFromQuery && form?.querySelector('[name="service"]')) form.querySelector('[name="service"]').value = serviceFromQuery;

function showError(name, message) {
  const input = form?.querySelector(`[name="${name}"]`);
  const error = form?.querySelector(`[data-error-for="${name}"]`);
  if (input) input.setAttribute('aria-invalid', 'true');
  if (error) error.textContent = message;
}

function clearErrors() {
  form?.querySelectorAll('[aria-invalid="true"]').forEach((input) => input.removeAttribute('aria-invalid'));
  form?.querySelectorAll('.field-error').forEach((error) => { error.textContent = ''; });
  feedback?.classList.remove('error', 'success');
  if (feedback) feedback.textContent = '';
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  clearErrors();
  const data = new FormData(form);
  const values = Object.fromEntries(data.entries());
  const required = [
    ['name', 'Please enter your name.'],
    ['phone', 'Please enter a phone number.'],
    ['email', 'Please enter a valid email address.'],
    ['service', 'Please select a service.'],
    ['description', 'Please add a short description of the work.']
  ];
  if (form.querySelector('[name="location"]')) required.splice(4, 0, ['location', 'Please enter the job location.']);
  let valid = true;
  required.forEach(([name, message]) => {
    const value = String(values[name] || '').trim();
    if (!value || (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) {
      showError(name, message);
      valid = false;
    }
  });
  if (!valid) {
    feedback?.classList.add('error');
    if (feedback) feedback.textContent = 'Please check the highlighted fields and try again.';
    form.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }
  const subject = encodeURIComponent(`Enquiry: ${values.service} — ${values.name}`);
  const bodyLines = [
    `Customer name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email}`,
    `Service required: ${values.service}`,
  ];
  if (values.location) bodyLines.push(`Job location: ${values.location}`);
  bodyLines.push(
    '',
    'Description of work:',
    values.description
  );
  const body = encodeURIComponent(bodyLines.join('\n'));
  window.location.href = `mailto:octoberelectricalservicers@gmail.com?subject=${subject}&body=${body}`;
  feedback?.classList.add('success');
  if (feedback) feedback.textContent = 'Your email app should open with the enquiry details ready for review. No message has been sent automatically.';
});
