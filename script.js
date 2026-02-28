document.addEventListener("DOMContentLoaded", function () {
  // --- SOTTOMENU MOBILE ---
  document.querySelectorAll('.submenu-toggle').forEach(toggle => {
    toggle.addEventListener('click', e => {
      e.preventDefault();
      const submenu = toggle.nextElementSibling;
      submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    });
  });

  // --- CONTATORE ---
  const counterElement = document.getElementById("counter");
  const targetValue = 135;
  let current = 0;

  const step = () => {
    if (current < targetValue) {
      current += 1;
      counterElement.textContent = current;
      setTimeout(step, 20);
    } else {
      counterElement.textContent = targetValue;
    }
  };

  if (counterElement) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          step();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(counterElement);
  }

  // --- HAMBURGER MOBILE ---
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // --- REVEAL ELEMENTS (se già lo vuoi qui dentro) ---
  const revealElements = document.querySelectorAll(".reveal");
  const options = { threshold: 0.15 };
  const observerReveal = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, options);
  revealElements.forEach(el => observerReveal.observe(el));
});