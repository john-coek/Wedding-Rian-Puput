// Sections reference
const sections = document.querySelectorAll('[data-section]');
const dots = document.querySelectorAll('.dot');
const weddingDate = new Date('2025-05-17T08:00:00');

// Open invitation
function openInvitation() {
  document.getElementById('cover').style.transition =
    'opacity 0.8s ease, transform 0.8s ease';
  document.getElementById('cover').style.opacity = '0';
  document.getElementById('cover').style.transform = 'translateY(-20px)';
  setTimeout(() => {
    document.getElementById('cover').style.display = 'none';
    document.getElementById('main').style.display = 'block';
    startCountdown();
    initScrollReveal();
    revealFirst();
  }, 800);
}

// Scroll reveal
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 },
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // Nav dots observer
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = e.target.dataset.section;
          dots.forEach((d, i) => d.classList.toggle('active', i == idx));
        }
      });
    },
    { threshold: 0.4 },
  );
  sections.forEach((s) => sectionObserver.observe(s));
}

function revealFirst() {
  setTimeout(() => {
    document
      .querySelectorAll('.section-bismillah .reveal')
      .forEach((el) => el.classList.add('visible'));
  }, 100);
}

// Scroll to section
function scrollToSection(idx) {
  sections[idx]?.scrollIntoView({ behavior: 'smooth' });
}

// Countdown
function startCountdown() {
  function update() {
    const now = new Date();
    const diff = weddingDate - now;
    if (diff <= 0) {
      document.getElementById('countdown').style.display = 'none';
      document.getElementById('cd-done').style.display = 'block';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-d').textContent = String(d).padStart(2, '0');
    document.getElementById('cd-h').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-m').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-s').textContent = String(s).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}

// RSVP
function submitRSVP(e) {
  e.preventDefault();
  const name = document.getElementById('rsvp-name').value;
  const count = document.getElementById('rsvp-count').value;
  const attend = document.getElementById('rsvp-attend').value;
  if (!name || !count || !attend) return;
  document.querySelector('.rsvp-form').style.display = 'none';
  const s = document.getElementById('rsvp-success');
  s.style.display = 'block';
  s.textContent =
    attend === 'hadir'
      ? `Terima kasih, ${name}! Kami sangat menantikan kehadiran Anda bersama ${count} tamu.`
      : `Terima kasih, ${name}. Kami memahami dan mendoakan yang terbaik untuk Anda.`;
}

// Wishes
function sendWish() {
  const name = document.getElementById('wish-name').value.trim();
  const text = document.getElementById('wish-text').value.trim();
  if (!name || !text) return;
  const list = document.getElementById('wishes-list');
  const item = document.createElement('div');
  item.className = 'wish-item';
  item.style.animation = 'fadeUp 0.5s ease forwards';
  item.innerHTML = `<p class="wish-item-name">${name}</p><p class="wish-item-text">${text}</p>`;
  list.insertBefore(item, list.firstChild);
  document.getElementById('wish-name').value = '';
  document.getElementById('wish-text').value = '';
}

// Music
let playing = false;
function toggleMusic() {
  playing = !playing;
  const icon = document.getElementById('musicIcon');
  if (playing) {
    icon.innerHTML =
      '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="#c8a84b"/>';
  } else {
    icon.innerHTML =
      '<path d="M9 18V5l12-2v13M9 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm12-2c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" stroke="#c8a84b" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown')
    scrollToSection(Math.min(sections.length - 1, getCurrentSection() + 1));
  if (e.key === 'ArrowUp')
    scrollToSection(Math.max(0, getCurrentSection() - 1));
});
function getCurrentSection() {
  for (let i = 0; i < dots.length; i++) {
    if (dots[i].classList.contains('active')) return i;
  }
  return 0;
}
