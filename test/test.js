document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("quiz-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Raccogli le risposte
        const data = new FormData(form);
        const answers = Object.fromEntries(data.entries());

        // Logica semplificata per determinare il risultato
        // Puoi raffinarla più avanti con punteggi o condizioni
        let risultato = "";

        if (answers.presenza === "inesistente") {
            risultato = "awareness";
        } else if (answers.presenza === "poco_attiva" && answers.obiettivo === "interazione") {
            risultato = "interest";
        } else if (answers.presenza.includes("attiva") && answers.obiettivo === "lead") {
            risultato = "consideration";
        } else if (answers.obiettivo === "vendite") {
            risultato = "conversion";
        } else if (answers.obiettivo === "fidelizzazione") {
            risultato = "loyalty";
        } else {
            risultato = "awareness"; // fallback
        }

        // Salva il risultato nel localStorage
        localStorage.setItem("quizRisultato", risultato);

        // Redirect con piccola animazione (in risultato.html)
        window.location.href = "risultato.html";
    });
});
