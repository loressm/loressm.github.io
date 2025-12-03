const ctx = document.getElementById("chartBlock2").getContext("2d");

const data = {
  labels: ["Instagram", "Facebook", "TikTok"],
  datasets: [{
    data: [55.9, 53.2, 14.5],
    backgroundColor: ["#FCD34D", "#111827", "#3B82F6"],
    borderWidth: 0,
    hoverOffset: 12
  }]
};

const options = {
  responsive: true,
  animations: {
    tension: {
      duration: 1500,
      easing: 'easeOutCubic'
    },
    radius: {
      from: 0,   // effetto "cresci dal centro"
      duration: 1500,
      easing: 'easeOutCubic'
    }
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
        label: function(context) {
          const value = context.raw || 0;
          return `${value}% di impatto negli acquisti sui social`;
        }
      }
    }
  }
};

// Creazione grafico con animazione all'ingresso
window.addEventListener('load', () => {
  new Chart(ctx, {
    type: 'pie',
    data: data,
    options: options
  });
});
