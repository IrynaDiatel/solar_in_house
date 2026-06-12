function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

function submitForm() {
  const name = document.getElementById('cName').value.trim();
  const phone = document.getElementById('cPhone').value.trim();
  if (!name || !phone) {
    alert("Будь ласка, введіть ім'я та номер телефону.");
    return;
  }
  document.getElementById('formSuccess').style.display = 'block';
  document.getElementById('cName').value = '';
  document.getElementById('cPhone').value = '';
  document.getElementById('cEmail').value = '';
  document.getElementById('cComment').value = '';
}

function initScrollButtons() {
  const up = document.querySelector('.scroll-up');
  const down = document.querySelector('.scroll-down');
  if (!up || !down) return;

  up.addEventListener('click', () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }));
  down.addEventListener('click', () => window.scrollTo({ top: document.documentElement.scrollHeight, left: 0, behavior: 'smooth' }));
}

function blurSocialLinksOnClick() {
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(() => link.blur(), 0);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollButtons();
  blurSocialLinksOnClick();
});
