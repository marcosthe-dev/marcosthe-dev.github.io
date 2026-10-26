const button = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu() {
  nav.classList.remove('is-open');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-label', 'Abrir menu');
}
button.addEventListener('click', () => {
  const open = button.getAttribute('aria-expanded') !== 'true';
  nav.classList.toggle('is-open', open);
  button.setAttribute('aria-expanded', String(open));
  button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
    closeMenu(); button.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.navigation')) closeMenu();
});
window.matchMedia('(min-width: 651px)').addEventListener('change', closeMenu);
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...nav.querySelectorAll('a')];
let pending = false;
function updateNavigation() {
  const current = sections.filter(section => section.getBoundingClientRect().top <= 150).at(-1);
  links.forEach(link => {
    if (current && link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  pending = false;
}
window.addEventListener('scroll', () => {
  if (!pending) { pending = true; requestAnimationFrame(updateNavigation); }
}, { passive: true });
updateNavigation();
document.querySelector('#year').textContent = new Date().getFullYear();
