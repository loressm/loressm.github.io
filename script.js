document.addEventListener("DOMContentLoaded", function () {
    const counterContainer = document.querySelector('.counter-container');
    const barsContainer = document.querySelector('.chart-container');

    // Animazione contatore (blocco 4)
    function animateCounter() {
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

        step();
    }

    // Animazione barre (blocco 6)
    function animateBars() {
        const maxHeight = 300;
        const bars = [
            { id: "bar1", percentId: "p1", percentValue: 52.5 }, // 2021
            { id: "bar2", percentId: "p2", percentValue: 54.0 }, // 2022
            { id: "bar3", percentId: "p3", percentValue: 55.7 }  // 2023
        ];

        bars.forEach((bar, index) => {
            const height = (bar.percentValue / 100) * maxHeight;

            setTimeout(() => {
                document.getElementById(bar.id).style.height = height + "px";
            }, index * 300);

            let current = 0;
            const step = () => {
                if (current < bar.percentValue) {
                    current += 0.1;
                    if (current > bar.percentValue) current = bar.percentValue;
                    document.getElementById(bar.percentId).textContent = current.toFixed(1) + "%";
                    setTimeout(step, 10);
                } else {
                    document.getElementById(bar.percentId).textContent = bar.percentValue.toFixed(1) + "%";
                }
            };

            setTimeout(step, index * 300);
        });
    }

    // Intersection Observer per animazioni su scroll
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === counterContainer) {
                    animateCounter();
                }
                if (entry.target === barsContainer) {
                    animateBars();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (counterContainer) observer.observe(counterContainer);
    if (barsContainer) observer.observe(barsContainer);
});
