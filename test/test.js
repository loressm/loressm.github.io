document.getElementById("quiz-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const punteggi = [
    parseInt(form.q1.value),
    parseInt(form.q2.value),
    parseInt(form.q3.value),
    parseInt(form.q4.value),
    parseInt(form.q5.value)
  ];

  const somma = punteggi.reduce((a, b) => a + b, 0);
  let focusPrimario = "";

  if (somma <= 8) {
    focusPrimario = "awareness";
  } else if (somma <= 12) {
    focusPrimario = "interest";
  } else if (somma <= 16) {
    focusPrimario = "consideration";
  } else if (somma <= 20) {
    focusPrimario = "conversion";
  } else {
    focusPrimario = "loyalty";
  }

  const risultatoCompleto = {
    focusPrimario,
    sommaTotale: somma
  };

  localStorage.setItem("quizRisultatoCompleto", JSON.stringify(risultatoCompleto));
  window.location.href = "risultato.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const funnelLevels = document.querySelectorAll(".funnel-level");

  // Rimuove tutte le classi "visible" inizialmente
  funnelLevels.forEach(level => level.classList.remove("visible"));

  const firstLevel = funnelLevels[0];
  if (!firstLevel) return; // sicurezza

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Quando il primo livello entra in vista, parte animazione sequenziale
        funnelLevels.forEach((level, index) => {
          setTimeout(() => {
            level.classList.add("visible");
          }, index * 150); // 150ms tra un livello e il successivo
        });

        observer.unobserve(entry.target); // Solo una volta
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(firstLevel);
});
