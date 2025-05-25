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
    // Animazione grafico: altezza proporzionale alla percentuale
    // -----------------------------
    const bars = [
        { id: "bar1", percentId: "p1", percentValue: 52.5 }, // 2021
        { id: "bar2", percentId: "p2", percentValue: 54.0 }, // 2022
        { id: "bar3", percentId: "p3", percentValue: 55.7 }  // 2023
    ];

    const graphObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animazione delle barre del grafico
                bars.forEach((bar, index) => {
                    const maxHeight = 300; // Altezza massima per il grafico (in px)
                    const height = (bar.percentValue / 100) * maxHeight;

                    // Imposta l'altezza della barra
                    setTimeout(() => {
                        document.getElementById(bar.id).style.height = height + "px";
                    }, index * 300);

                    // Animazione percentuale
                    let current = 0;
                    const step = () => {
                        if (current < bar.percentValue) {
                            current += 0.1; // Incremento più piccolo per una transizione più fluida
                            if (current > bar.percentValue) current = bar.percentValue;
                            document.getElementById(bar.percentId).textContent = current.toFixed(1) + "%";
                            setTimeout(step, 10); // Incremento ad ogni 10ms
                        } else {
                            document.getElementById(bar.percentId).textContent = bar.percentValue.toFixed(1) + "%";
                        }
                    };
                    setTimeout(step, index * 300); // Avvia l'animazione dopo un delay
                });

                observer.unobserve(entry.target); // Stop l'osservazione
            }
        });
    }, {
        threshold: 0.3
    });

    // Aggiungi l'observer ai grafici
    const graphElements = document.querySelectorAll('.grid-item > canvas, .bar-container');
    graphElements.forEach(el => graphObserver.observe(el));

    // -----------------------------
    // Contatore animato: Tempo medio giornaliero trascorso sui social
    // -----------------------------
    const counterElement = document.getElementById("counter");
    const targetValue = 95; // minuti
    let current = 0;

    const animateCounter = () => {
        if (current < targetValue) {
            current += 1;
            counterElement.textContent = current;
            setTimeout(animateCounter, 20); // velocità dell'animazione
        } else {
            counterElement.textContent = targetValue;
        }
    };

    animateCounter();
});
