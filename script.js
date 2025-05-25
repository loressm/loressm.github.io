document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('nav ul');

    if (hamburger && menu) {
        hamburger.addEventListener('click', function () {
            menu.classList.toggle('active');
            hamburger.classList.toggle('active');

            if (menu.classList.contains('active')) {
                hamburger.style.position = 'fixed';
                hamburger.style.top = '10px';
                hamburger.style.right = '10px';
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                hamburger.style.position = 'absolute';
                hamburger.style.top = '';
                hamburger.style.right = '';
            }
        });
    }

    // -----------------------------
    // Sottomenu con effetto slide up/down
    // -----------------------------
    const dropdownLinks = document.querySelectorAll('.navbar .dropdown > a');

    dropdownLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const submenu = this.nextElementSibling;

            if (submenu && submenu.classList.contains('submenu')) {
                e.preventDefault();

                const isOpen = submenu.classList.contains('open');

                document.querySelectorAll('.submenu').forEach(menu => {
                    menu.classList.remove('open');
                    menu.style.maxHeight = null;
                    menu.style.paddingTop = '';
                    menu.style.paddingBottom = '';
                });

                if (!isOpen) {
                    submenu.classList.add('open');
                    submenu.style.maxHeight = submenu.scrollHeight + "px";
                    submenu.style.paddingTop = "10px";
                    submenu.style.paddingBottom = "10px";
                }
            }
        });
    });

    // -----------------------------
    // Chiudi hamburger solo se clic su link senza submenu
    // -----------------------------
    const navLinks = document.querySelectorAll('nav ul li > a');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            const submenu = this.nextElementSibling;

            if (!submenu || !submenu.classList.contains('submenu')) {
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.style.position = 'absolute';
                    hamburger.style.top = '';
                    hamburger.style.right = '';
                }
            }
        });
    });

    // -----------------------------
    // Animazione "Chi siamo?" da sinistra al primo scroll
    // -----------------------------
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // -----------------------------
    // Animazione immagini "da basso verso l'alto" al primo scroll
    // -----------------------------
    const bottomToTopObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    const animateFromBottomElements = document.querySelectorAll('.animate-from-bottom');
    animateFromBottomElements.forEach(el => bottomToTopObserver.observe(el));

    // -----------------------------
    // Animazioni da destra e da sopra
    // -----------------------------
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom > 0 &&
            rect.left < window.innerWidth &&
            rect.right > 0
        );
    }

    const animatedFromRightElements = document.querySelectorAll('.animate-from-right');
    const animatedFromTopElements = document.querySelectorAll('.animate-from-top');

    function checkAnimations() {
        animatedFromRightElements.forEach(el => {
            if (isInViewport(el)) {
                el.classList.add('visible');
            }
        });

        animatedFromTopElements.forEach(el => {
            if (isInViewport(el)) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkAnimations);
    window.addEventListener('resize', checkAnimations);
    window.addEventListener('load', checkAnimations);

    checkAnimations(); // Chiamata iniziale

    // -----------------------------
    // Animazione grafico: altezza proporzionale alla percentuale (parte SOLO quando visibile)
    // -----------------------------
    const maxHeight = 300; // Altezza massima per il grafico (in px)

    const bars = [
        { id: "bar1", percentId: "p1", percentValue: 52.5 }, // 2021
        { id: "bar2", percentId: "p2", percentValue: 54.0 }, // 2022
        { id: "bar3", percentId: "p3", percentValue: 55.7 }  // 2023
    ];

    const barContainer = document.getElementById('block-bar-chart');

    if (barContainer) {
        const barObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
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

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        barObserver.observe(barContainer);
    }

    // -----------------------------
    // Contatore animato: Tempo medio giornaliero trascorso sui social (parte SOLO quando visibile)
    // -----------------------------
    const counterElement = document.getElementById("counter");
    const targetValue = 95; // minuti
    let current = 0;
    let counterStarted = false;

    if (counterElement) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counterStarted) {
                    counterStarted = true;

                    const animateCounter = () => {
                        if (current < targetValue) {
                            current += 1;
                            counterElement.textContent = current;
                            setTimeout(animateCounter, 20);
                        } else {
                            counterElement.textContent = targetValue;
                        }
                    };

                    animateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(counterElement);
    }

    // -----------------------------
    // Grafico Social: Inizializzazione solo quando visibile
    // -----------------------------
    const chartContainer = document.getElementById('block-social-chart');
    const ctx = document.getElementById('socialChart').getContext('2d');

    const chartObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Inizializza il grafico solo quando è visibile
                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Facebook', 'Instagram', 'TikTok'],
                        datasets: [{
                            label: 'Numero di utenti (in milioni)',
                            data: [36.7, 32.7, 22.4],
                            backgroundColor: ['#00B0FF', '#FF80AB', '#00FF90'],
                            borderColor: '#fff',
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                            tooltip: {
                                callbacks: {
                                    label: function (tooltipItem) {
                                        return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(1) + ' milioni';
                                    }
                                }
                            }
                        },
                        animation: {
                            animateRotate: true,
                            animateScale: true
                        }
                    }
                });

                observer.unobserve(entry.target); // Fermiamo l'observer una volta che il grafico è stato creato
            }
        });
    }, { threshold: 1.0 }); // Modificato da 0.3 a 1.0

    chartObserver.observe(chartContainer);
});
