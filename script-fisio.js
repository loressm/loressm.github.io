// ==============================
// Hamburger menu + animazione puntini
// ==============================
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav-menu');
  const vertebre = document.querySelectorAll('.nav-menu li .vertebra');

  function animateVertebre() {
    vertebre.forEach((v, index) => {
      v.style.animation = 'none';
      v.style.visibility = 'hidden';
      void v.offsetWidth; // forzo reset animazione
      v.style.animation = `vertebraAppear 0s linear ${0.27 * (index + 1)}s forwards`;
    });
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    if (nav.classList.contains('active')) animateVertebre();
    else {
      vertebre.forEach(v => { v.style.visibility='hidden'; v.style.animation='none'; });
    }
  });
}

initHamburger();

// ==============================
// Fade-in elementi al scroll
// ==============================
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity=1;
      entry.target.style.transform="translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// ==============================
// Animazione card servizi
// ==============================
const serviziCards = document.querySelectorAll('.servizio');
const serviziObserver = new IntersectionObserver((entries, observer)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:0.2});
serviziCards.forEach(card => serviziObserver.observe(card));

// ==============================
// Animazione chi siamo
// ==============================
const chiSiamoElements = document.querySelectorAll('.chi-siamo-video, .chi-siamo-testo');
const chiSiamoObserver = new IntersectionObserver((entries, observer)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:0.2});
chiSiamoElements.forEach(el => chiSiamoObserver.observe(el));