document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM pronto.");

    // Aggiungi un evento di clic a tutti gli elementi con la classe routeButton
    const buttons = document.querySelectorAll('.routeButton');
    
    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            console.log("Click.");
            const route = e.target.getAttribute('data-route');
            fetchAndDisplay(route);
        });
    });
});

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
            document.body.innerHTML = ''; // Rimuovi il contenuto precedente
            document.body.appendChild(newElement); // Aggiungi il nuovo elemento al corpo del documento
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
