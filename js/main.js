function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

async function submitForm(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const name = document.getElementById('cName').value.trim();
  const phone = document.getElementById('cPhone').value.trim();
  const success = document.getElementById('formSuccess');
  const error = document.getElementById('formError');
  const submit = document.getElementById('contactSubmit');

  success.style.display = 'none';
  error.style.display = 'none';

  if (!name || !phone) {
    alert("Будь ласка, введіть ім'я та номер телефону.");
    return;
  }

  submit.disabled = true;
  submit.textContent = 'Надсилаємо...';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error('Request failed');

    success.style.display = 'block';
    form.reset();
  } catch (err) {
    error.style.display = 'block';
  } finally {
    submit.disabled = false;
    submit.textContent = 'Надіслати заявку →';
  }
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', submitForm);
}

function initScrollButtons() {
  const controls = document.querySelector('.scroll-controls');
  const up = document.querySelector('.scroll-up');
  const down = document.querySelector('.scroll-down');
  const hero = document.querySelector('.hero');
  if (!controls || !up || !down || !hero) return;

  up.addEventListener('click', () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }));
  down.addEventListener('click', () => window.scrollTo({ top: document.documentElement.scrollHeight, left: 0, behavior: 'smooth' }));

  const toggleControls = () => {
    const showAfter = hero.offsetTop + hero.offsetHeight - 24;
    controls.classList.toggle('is-visible', window.scrollY >= showAfter);
  };

  toggleControls();
  window.addEventListener('scroll', toggleControls, { passive: true });
  window.addEventListener('resize', toggleControls);
}

function blurSocialLinksOnClick() {
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(() => link.blur(), 0);
    });
  });
}

function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  const closeMenu = () => {
    navLinks.classList.remove('open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Відкрити меню');
    document.body.classList.remove('nav-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Закрити меню' : 'Відкрити меню');
    document.body.classList.toggle('nav-open', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) closeMenu();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initNavToggle();
  initScrollButtons();
  blurSocialLinksOnClick();
});
