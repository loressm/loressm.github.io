document.getElementById("quiz-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const form = e.target;
    const answers = {
        business: form.business.value,
        settore: form.settore.value,
        concorrenza: form.concorrenza.value,
        presenza: form.presenza.value,
        obiettivo: form.obiettivo.value,
        adv: form.adv.value,
        budget: form.budget.value,
        canale: form.canale.value
    };

    // Definiamo un oggetto per tracciare i bisogni
    let bisogni = {
        awareness: 0,
        interest: 0,
        consideration: 0,
        conversion: 0,
        loyalty: 0
    };

    // Logica pesi/esempio
    // 1. Se presenza inesistente o poco attiva => aumenta awareness
    if(answers.presenza === "inesistente" || answers.presenza === "poco_attiva") {
        bisogni.awareness += 3;
    } else if (answers.presenza === "attiva_ma_inefficace") {
        bisogni.consideration += 2;
        bisogni.conversion += 1;
    } else if (answers.presenza === "attiva_e_buoni_risultati") {
        bisogni.loyalty += 3;
    }

    // 2. Obiettivo diretto pesato fortemente
    switch(answers.obiettivo) {
        case "visibilita":
            bisogni.awareness += 5; break;
        case "interazione":
            bisogni.interest += 5; break;
        case "lead":
            bisogni.consideration += 4; bisogni.conversion += 2; break;
        case "vendite":
            bisogni.conversion += 6; break;
        case "fidelizzazione":
            bisogni.loyalty += 5; break;
    }

    // 3. Budget: più basso budget => priorità a awareness/organic
    if(answers.budget === "nessuno" || answers.budget === "basso") {
        bisogni.awareness += 2;
    } else if (answers.budget === "medio") {
        bisogni.consideration += 2;
        bisogni.conversion += 2;
    } else {
        bisogni.conversion += 3;
        bisogni.loyalty += 2;
    }

    // 4. Campagne adv
    if(answers.adv === "mai") {
        bisogni.awareness += 2;
    } else if(answers.adv === "qualche_volta") {
        bisogni.consideration += 1;
    } else {
        bisogni.conversion += 2;
    }

    // 5. Concorrenza alta => awareness e differenziazione
    if(answers.concorrenza === "alta") {
        bisogni.awareness += 2;
        bisogni.consideration += 1;
    } else if (answers.concorrenza === "bassa") {
        bisogni.loyalty += 1;
    }

    // Troviamo il bisogno con punteggio più alto
    const sortedBisogni = Object.entries(bisogni).sort((a,b) => b[1] - a[1]);

    // Prendiamo i primi 2 bisogni per un risultato più ricco
    const focusPrimario = sortedBisogni[0][0];
    const focusSecondario = sortedBisogni[1][0];

    // Salviamo tutto per la pagina risultato
    const risultatoCompleto = {
        focusPrimario,
        focusSecondario,
        risposte: answers
    };

    localStorage.setItem("quizRisultatoCompleto", JSON.stringify(risultatoCompleto));

    // Vai a pagina risultato
    window.location.href = "risultato.html";
});
