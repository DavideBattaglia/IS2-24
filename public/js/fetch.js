function fetchAndDisplay(route) {
    const token = localStorage.getItem('token');
    console.log('TOKEN fetch.js:', token);

    if (token) {
        fetch(route, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'text/html',
            },
        })
        .then(response => response.text())
        .then(html => {
            const newElement = document.createElement('div');
            newElement.innerHTML = html;

            // Aggiungi il nuovo elemento come figlio del corpo
            document.body.appendChild(newElement);
        })
        .catch(error => {
            console.error('Errore nella richiesta alla rotta specifica:', error);
        });
    } else {
        console.error('Token non presente. Effettuare l\'accesso.');
        // Gestisci l'assenza di token come desideri
        // Esempio: Reindirizza l'utente alla pagina di accesso
        // window.location.href = '/login';
    }
}
