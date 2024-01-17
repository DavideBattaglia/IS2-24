// public/js/cart.js

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    console.log('TOKEN cart.js:', token);

    if (token) {
        // Esegui la richiesta GET alla rotta protetta per il carrello con il token nell'header
        fetch('/cart', {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Dati carrello ricevuti:', data);
            renderCartItemsTable(data);
        })

        .catch(error => {
            console.error('Errore nella richiesta al carrello:', error);
        });
        //------
        const buyButton = document.getElementById('buyButton');
        if (buyButton) {
            buyButton.addEventListener('click', () => {
                // Esegui la richiesta DELETE alla rotta per svuotare il carrello
                fetch('/deleteCart', {
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
                    // Dopo la cancellazione, ricarica la pagina
                    location.reload();
                })
                .catch(error => {
                    console.error('Errore nella richiesta per svuotare il carrello:', error);
                });
            });
        }


    } else {
        console.error('Token non presente. Effettuare l\'accesso.');
    }

    function renderCartItemsTable(cartItemsData) {
        const cartItemsContainer = document.getElementById('cartItems');
    
        if (cartItemsData && Array.isArray(cartItemsData)) {
            const cartItemsTable = document.createElement('table');
            cartItemsTable.classList.add('cart-items-table'); // Aggiungi una classe per lo stile (CSS)
    
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
            cartItemsTable.appendChild(tableHeader);
    
            // Corpo della tabella
            const tableBody = document.createElement('tbody');
    
            cartItemsData.forEach(cartItem => {
                const cartItemRow = document.createElement('tr');
                cartItemRow.id = `cartItemRow_${cartItem._id}`;
    
                // Estrai le informazioni dettagliate della scarpa dal campo 'shoeId' dell'elemento del carrello
                const shoeDetails = cartItem;
    
                ['brand', 'model', 'description', 'price'].forEach(column => {
                    const cell = document.createElement('td');
                    cell.textContent = shoeDetails[column];
                    cartItemRow.appendChild(cell);
                });
    
                tableBody.appendChild(cartItemRow);
            });
    
            // Aggiungi una riga per il totale
            const totalRow = document.createElement('tr');
            const totalCell = document.createElement('td');
            totalCell.setAttribute('colspan', '4'); // Unisce tutte e quattro le colonne per il totale
            const totalPrice = cartItemsData.reduce((total, cartItem) => total + cartItem.price, 0);
            totalCell.textContent = `Totale: ${totalPrice.toFixed(2)} €`;
            totalRow.appendChild(totalCell);
            tableBody.appendChild(totalRow);
    
            cartItemsTable.appendChild(tableBody);
            cartItemsContainer.innerHTML = ''; // Pulisci il contenitore prima di aggiungere la nuova tabella
            cartItemsContainer.appendChild(cartItemsTable);
        } else {
            console.error('Dati nel carrello non validi.');
        }
    }
    
    
});
