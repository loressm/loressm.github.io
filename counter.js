document.addEventListener("DOMContentLoaded", function () {
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

    // Avvia l'animazione quando il contatore entra in viewport
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                step();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (counterElement) observer.observe(counterElement);
});