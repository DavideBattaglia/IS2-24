document.addEventListener('DOMContentLoaded', function() {
    // Rimuovi il token e l'username dal localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    // Ottieni il elemento del messaggio di logout
    var logoutMessageElement = document.getElementById('logoutMessage');

    // Mostra un messaggio di logout effettuato con successo
    logoutMessageElement.textContent = 'Logout effettuato con successo';

    // Aggiungi link alla registrazione e al login
    var registerLink = document.createElement('a');
    registerLink.href = '/register';
    registerLink.textContent = 'Register';

    var loginLink = document.createElement('a');
    loginLink.href = '/login';
    loginLink.textContent = 'Login';

    // Aggiungi i link al documento
    logoutMessageElement.appendChild(document.createElement('br'));
    logoutMessageElement.appendChild(document.createElement('br'));
    logoutMessageElement.appendChild(registerLink);
    logoutMessageElement.appendChild(document.createTextNode(' | '));
    logoutMessageElement.appendChild(loginLink);
});
