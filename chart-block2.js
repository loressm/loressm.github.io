// ======================
// GRAFICO A TORTA BLOCCO 2 - con animazione
// ======================

const ctx = document.getElementById("chartBlock2").getContext("2d");

// Dati del grafico
const data = {
  labels: ["Instagram", "Facebook", "TikTok"],
  datasets: [{
    data: [55.9, 53.2, 14.5],
    backgroundColor: [
      "#FCD34D", // giallo brand - Instagram
      "#111827", // antracite brand - Facebook
      "#3B82F6"  // blu acceso - TikTok
    ],
    borderWidth: 0,
    hoverOffset: 12
  }]
};

// Opzioni del grafico
const options = {
  responsive: true,
  animation: {
    animateRotate: true,  // rotazione
    animateScale: true,   // effetto "grow"
    duration: 1400,       // durata animazione
    easing: 'easeOutCubic'
  },
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        font: { size: 14 },
        color: "#111827"
      }
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const value = context.raw || 0;
          return `${value}% di impatto negli acquisti sui social`;
        }
      }
    }
  }
};

// Creazione grafico
new Chart(ctx, {
  type: "pie",
  data: data,
  options: options
});
