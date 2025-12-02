// === Grafico a torta (Blocco 2) ===
document.addEventListener("DOMContentLoaded", function () {
    let pieChartInitialized = false;
    const canvas = document.getElementById('socialPieChart');

    if (!canvas) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !pieChartInitialized) {
                const ctx = canvas.getContext('2d');

                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Instagram', 'Facebook', 'TikTok'],
                        datasets: [{
                            data: [55.9, 53.2, 14.5],
                            backgroundColor: ['#E1306C', '#1877F2', '#FFD700'],
                            hoverOffset: 30
                        }]
                    },
                    options: {
                        cutout: '65%',
                        animation: { duration: 2500 },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: (tooltipItem) =>
                                        `${tooltipItem.label}: ${tooltipItem.raw}%`
                                }
                            }
                        }
                    }
                });

                pieChartInitialized = true;
                observer.unobserve(canvas);
            }
        });
    }, { threshold: 0.4 });

    observer.observe(canvas);
});
