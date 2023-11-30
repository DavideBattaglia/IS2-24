// main.js

const token = localStorage.getItem('token');

fetch('/protected', {
    method: 'GET',
    headers: {
        'Authorization': `${token}`,
    },
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    console.log('Risposta dalla rotta protetta:', data);
})
.catch(error => {
    console.error('Errore nella richiesta alla rotta protetta:', error);
});