const header = document.querySelector('.site-header');
const menu = document.querySelector('.site-nav');
const toggle = document.querySelector('.menu-toggle');

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 72);
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.site-nav a').forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const filterButtons = document.querySelectorAll('.filter');
const bibliographyItems = document.querySelectorAll('.bibliography article');
filterButtons.forEach((button) => button.addEventListener('click', () => {
  filterButtons.forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  bibliographyItems.forEach((item) => {
    item.classList.toggle('hidden', button.dataset.filter !== 'all' && item.dataset.category !== button.dataset.filter);
  });
}));
