// Carica dinamicamente il footer
document.addEventListener("DOMContentLoaded", () => {
  const footerElement = document.getElementById("footer");
  if (footerElement) {
    fetch("footer.html")
      .then(res => res.text())
      .then(data => footerElement.innerHTML = data)
      .catch(err => console.error("Errore nel caricamento del footer:", err));
  }
});
