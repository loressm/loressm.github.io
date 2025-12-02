// Carica header dinamicamente
fetch("header.html")
  .then(res => res.text())
  .then(data => document.getElementById("header").innerHTML = data)
  .then(() => {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  });
