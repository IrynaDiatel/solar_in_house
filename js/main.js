
function calcSolar() {
  const c = parseFloat(document.getElementById('consumption').value);
  const r = parseFloat(document.getElementById('region').value);
  const t = document.getElementById('objtype').value;
  if (!c || !r || !t) {
    alert('Будь ласка, заповніть всі поля.');
    return;
  }
  const dailyAvg = c / 30;
  const peakSun = 3.8 * r;
  const efficiency = 0.8;
  const power = Math.ceil(dailyAvg / (peakSun * efficiency) * 10) / 10;
  const pricePerKw = t === 'biz' ? 32000 : 28000;
  const cost = Math.round(power * pricePerKw / 1000) * 1000;
  const yearlyKwh = power * peakSun * efficiency * 365;
  const tariff = 4.32;
  const savings = Math.round(yearlyKwh * tariff / 1000) * 1000;
  const payback = Math.round((cost / savings) * 10) / 10;

  document.getElementById('rPower').textContent = power.toFixed(1) + ' кВт';
  document.getElementById('rCost').textContent = '₴ ' + cost.toLocaleString('uk-UA');
  document.getElementById('rSavings').textContent = '₴ ' + savings.toLocaleString('uk-UA');
  document.getElementById('rPayback').textContent = payback.toFixed(1) + ' р.';
  document.getElementById('calcResult').classList.add('visible');
}

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
