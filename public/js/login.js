// login.js

function performLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulazione di una richiesta di login con fetch
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Salva il token nel localStorage
            localStorage.setItem('username', username);
            localStorage.setItem('token', data.token);
            console.log('Login riuscito. Token salvato nel localStorage.');

            // Reindirizza l'utente alla home dopo il login riuscito
            window.location.href = '/home';
        } else {
            console.error('Login fallito. Nessun token ricevuto.');

            // Rimuovi il token dal localStorage in caso di credenziali errate
            localStorage.removeItem('token');

            // Reindirizza l'utente alla home anche in caso di login fallito
            window.location.href = '/home';
        }
    })
    .catch(error => {
        console.error('Errore durante la richiesta di login:', error);

        // Rimuovi il token dal localStorage in caso di errore
        localStorage.removeItem('token');

        // Reindirizza l'utente alla home in caso di errore
        window.location.href = '/home';
    });
}
