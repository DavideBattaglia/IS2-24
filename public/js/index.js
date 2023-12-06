// index.js

const token = localStorage.getItem('token');
console.log('TOKEN index.js:', token);
// Assicurati che il token sia presente prima di effettuare la richiesta
if (token) {
    // Esegui la richiesta GET alla rotta protetta con il token nell'header
    fetch('/protected', {
        method: 'GET',
        headers: {
            'Authorization': `${token}`,
            'Content-Type': 'text/html',  // Cambiato da 'application/json' a 'text/html'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Assume che la risposta sia HTML e la restituisca come testo
        return response.text();
    })
    .then(html => {
        // Inserisci la pagina HTML ricevuta nel DOM o fai altro con il contenuto HTML
        document.body.innerHTML = html;
    })
    .catch(error => {
        console.error('Errore nella richiesta alla rotta protetta:', error);
    });
} else {
    // Token non presente, gestisci la situazione come desideri
    console.error('Token non presente. Effettuare l\'accesso.');
    // Esempio: Reindirizza l'utente alla pagina di accesso
    //window.location.href = '/login';
}
