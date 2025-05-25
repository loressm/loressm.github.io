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
    // Animazione grafico all'ingresso nel viewport
    // -----------------------------
    const graphObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Quando il grafico entra nel viewport, inizia l'animazione
                startGraphAnimation(entry.target);
                observer.unobserve(entry.target); // Interrompe l'osservazione dopo l'animazione
            }
        });
    }, {
        threshold: 0.3 // Il grafico deve essere visibile per il 30% prima di attivare l'animazione
    });

    // Selezioniamo i grafici da animare
    const graphElements = document.querySelectorAll('.animate-on-scroll-graph');
    graphElements.forEach(el => graphObserver.observe(el));

    // Funzione per avviare l'animazione del grafico
    function startGraphAnimation(graphElement) {
        // Il codice che anima il grafico: altezza in base alla percentuale
        const maxHeight = 300; // Altezza massima per il grafico (in px)

        // Supponiamo che ogni grafico abbia un attributo 'data-percent' con la percentuale da animare
        const percentValue = parseFloat(graphElement.getAttribute('data-percent')); 

        // Calcola l'altezza in base alla percentuale
        const height = (percentValue / 100) * maxHeight;

        // Animazione della barra
        graphElement.style.height = height + "px";

        // Animazione percentuale (se presente un elemento di percentuale accanto al grafico)
        const percentElement = graphElement.querySelector('.percent');
        if (percentElement) {
            let current = 0;
            const step = () => {
                if (current < percentValue) {
                    current += 0.1; // Incremento per una transizione fluida
                    if (current > percentValue) current = percentValue;
                    percentElement.textContent = current.toFixed(1) + "%";
                    setTimeout(step, 10); // Incremento ogni 10ms
                } else {
                    percentElement.textContent = percentValue.toFixed(1) + "%";
                }
            };
            setTimeout(step, 100); // Avvia l'animazione dopo un piccolo delay
        }
    }

    // -----------------------------
    // Animazione contatore: Tempo medio giornaliero trascorso sui social
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
