const token = localStorage.getItem('token');
console.log('TOKEN vetrina.js:', token);

if (token) {
    // Esegui la richiesta GET alla rotta protetta con il token nell'header
    fetch('/shoe', {
        method: 'GET',
        headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',  // Cambiato a 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Assume che la risposta sia JSON e la restituisce come oggetto
        return response.json();
    })
    .then(data => {
        // Manipola i dati come desiderato, ad esempio, aggiornando l'interfaccia utente
        console.log('Dati ricevuti:', data);
        renderShoes(data);
    })
    .catch(error => {
        console.error('Errore nella richiesta alla rotta protetta:', error);
    });
} else {
    // Token non presente, gestisci la situazione come desideri
    console.error('Token non presente. Effettuare l\'accesso.');
    // Esempio: Reindirizza l'utente alla pagina di accesso
    // window.location.href = '/login';
}

function renderShoes(shoesData) {
    // Esempio di come potresti utilizzare i dati ricevuti
    // Ad esempio, puoi creare elementi HTML e aggiungerli al DOM
    const shoeListContainer = document.getElementById('shoeList');

    if (shoesData && Array.isArray(shoesData)) {
        const shoeList = document.createElement('ul');
        
        shoesData.forEach(shoe => {
            const shoeItem = document.createElement('li');
            shoeItem.textContent = `${shoe.brand} - ${shoe.model} - ${shoe.description} - ${shoe.price}`;
            shoeList.appendChild(shoeItem);
        });

        // Aggiungi la lista al contenitore
        shoeListContainer.appendChild(shoeList);
    } else {
        console.error('Dati sulle scarpe non validi.');
    }
}
