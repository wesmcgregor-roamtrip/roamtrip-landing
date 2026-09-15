const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -55px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 3, 2) * 70}ms`;
  observer.observe(el);
});

const walker = document.querySelector('.walker');
let lastY = window.scrollY;
let ticking = false;

function updateWalker() {
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
  const left = 3 + progress * 90;
  walker.style.left = `${left}vw`;

  // Face the direction of travel without flipping the backpack onto the wrong side too aggressively.
  const direction = window.scrollY >= lastY ? 1 : -1;
  walker.style.setProperty('--dir', direction);
  lastY = window.scrollY;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateWalker);
    ticking = true;
  }
}, { passive: true });

updateWalker();
