// Carica header
fetch("header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;

    // Attiva hamburger dopo il caricamento
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("nav-menu");

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      menu.classList.toggle("active");
    });
  });
