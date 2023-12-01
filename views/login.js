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
            localStorage.setItem('token', data.token);
            alert('token login.js' + data.token);
            console.log('Login riuscito. Token salvato nel localStorage.');
        } else {
            console.error('Login fallito. Nessun token ricevuto.');
        }
    })
    .catch(error => {
        console.error('Errore durante la richiesta di login:', error);

        // Verifica se la risposta è di tipo JSON prima di parsificarla
        if (error.headers.get('content-type')?.includes('application/json')) {
            error.json().then(errorMessage => {
                console.error('Messaggio di errore JSON ricevuto:', errorMessage);
            });
        } else {
            console.error('Risposta HTML ricevuta:', error);
        }
    });
}
