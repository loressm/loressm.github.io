<script>
  document.addEventListener("DOMContentLoaded", () => {

    const options = {
      threshold: 0.15
    };

    const revealElements = document.querySelectorAll(".reveal, .circular");

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animazione una volta sola
        }
      });
    }, options);

    revealElements.forEach(el => observer.observe(el));

  });
</script>
