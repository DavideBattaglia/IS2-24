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
    const shoeTableContainer = document.getElementById('shoeTable');

    if (shoesData && Array.isArray(shoesData)) {
        const shoeTable = document.createElement('table');
        shoeTable.classList.add('shoe-table'); // Aggiungi una classe per lo stile (CSS)

        // Intestazione della tabella
        const tableHeader = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headerColumns = ['Marca', 'Modello', 'Descrizione', 'Prezzo'];

        headerColumns.forEach(columnText => {
            const headerCell = document.createElement('th');
            headerCell.textContent = columnText;
            headerRow.appendChild(headerCell);
        });

        tableHeader.appendChild(headerRow);
        shoeTable.appendChild(tableHeader);

        // Corpo della tabella
        const tableBody = document.createElement('tbody');

        shoesData.forEach(shoe => {
            const shoeRow = document.createElement('tr');

            ['brand', 'model', 'description', 'price'].forEach(column => {
                const cell = document.createElement('td');
                cell.textContent = shoe[column];
                shoeRow.appendChild(cell);
            });

            tableBody.appendChild(shoeRow);
        });

        shoeTable.appendChild(tableBody);
        shoeTableContainer.innerHTML = ''; // Pulisci il contenitore prima di aggiungere la nuova tabella
        shoeTableContainer.appendChild(shoeTable);
    } else {
        console.error('Dati sulle scarpe non validi.');
    }
}

/*
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

*/