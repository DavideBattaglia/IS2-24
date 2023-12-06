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
// ... (Il codice precedente rimane invariato)

// Funzione per la gestione dell'eliminazione
function handleDelete(shoeId) {
    // Esegui la richiesta DELETE a /deleteShoe/:shoeId
    console.log('TOKEN to delete:', token);
    fetch(`/deleteShoe/${shoeId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Scarpa eliminata con successo.');
        // Puoi aggiornare l'interfaccia utente dopo l'eliminazione, ad esempio, ricaricando i dati.
        // In alternativa, puoi rimuovere la riga della tabella corrispondente senza dover ricaricare tutti i dati.
        // Esempio: rimuovi la riga con l'ID corrispondente dalla tabella.
        const deletedRow = document.getElementById(`shoeRow_${shoeId}`);
        if (deletedRow) {
            deletedRow.remove();
        }
    })
    .catch(error => {
        console.error('Errore nell\'eliminazione della scarpa:', error);
    });
}

function handleEdit(shoeId) {
    // Reindirizza l'utente alla pagina di aggiornamento con l'ID della scarpa come parametro
    window.location.href = `/modifica/${shoeId}`;
}

function renderShoes(shoesData) {
    const shoeTableContainer = document.getElementById('shoeTable');

    if (shoesData && Array.isArray(shoesData)) {
        const shoeTable = document.createElement('table');
        shoeTable.classList.add('shoe-table'); // Aggiungi una classe per lo stile (CSS)

        // Intestazione della tabella
        const tableHeader = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headerColumns = ['Marca', 'Modello', 'Descrizione', 'Prezzo', 'Azioni'];

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
            shoeRow.id = `shoeRow_${shoe._id}`;

            ['brand', 'model', 'description', 'price'].forEach(column => {
                const cell = document.createElement('td');
                cell.textContent = shoe[column];
                shoeRow.appendChild(cell);
            });

            // Aggiungi la cella per il pulsante Modifica
            const editCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Modifica';
            editButton.addEventListener('click', () => handleEdit(shoe._id));
            editCell.appendChild(editButton);
            shoeRow.appendChild(editCell);

            // Aggiungi la cella per il pulsante Elimina
            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Elimina';
            deleteButton.addEventListener('click', () => handleDelete(shoe._id));
            deleteCell.appendChild(deleteButton);
            shoeRow.appendChild(deleteCell);

            tableBody.appendChild(shoeRow);
        });

        shoeTable.appendChild(tableBody);
        shoeTableContainer.innerHTML = ''; // Pulisci il contenitore prima di aggiungere la nuova tabella
        shoeTableContainer.appendChild(shoeTable);
    } else {
        console.error('Dati sulle scarpe non validi.');
    }
}
