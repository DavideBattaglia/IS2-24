document.addEventListener('DOMContentLoaded', function() {
    var token = localStorage.getItem('token');
    var username = localStorage.getItem('username');
    var userInfoElement = document.getElementById('userInfo');

    if (token && username) {
        userInfoElement.innerHTML = '<p>Welcome, ' + username + '!</p><p>Your Token is: ' + token + '</p>';
        userInfoElement.classList.add('userLoggedIn');

        // Aggiungi un event listener per il pulsante "Visualizza Vetrina Scarpe"
        var viewShoeStoreButton = document.getElementById('viewShoeStore');
        viewShoeStoreButton.classList.add('userLoggedIn'); // Aggiungi la classe
        viewShoeStoreButton.addEventListener('click', function() {
            // Reindirizza l'utente alla rotta della vetrina delle scarpe
            window.location.href = '/vetrina';
        });

        // Aggiungi un event listener per il pulsante "Aggiungi Scarpa"
        var addShoeButton = document.getElementById('addShoe');
        addShoeButton.classList.add('userLoggedIn'); // Aggiungi la classe
        addShoeButton.addEventListener('click', function() {
            // Reindirizza l'utente alla rotta per aggiungere una scarpa
            window.location.href = '/aggiungi';
        });
    } else {
        userInfoElement.innerHTML = '<p style="color: red;">Utente non registrato. <a href="/register">Register</a></p>';
    }
});
