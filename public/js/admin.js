// admin.js
const token = localStorage.getItem('token');
console.log('TOKEN admin.js:', token);

if (token) {
    // Esegui la richiesta GET alla rotta protetta per gli utenti con il token nell'header
    fetch('/admin', {
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
        console.log('Dati utenti ricevuti:', data);
        renderUsersTable(data);
    })
    .catch(error => {
        console.error('Errore nella richiesta alla rotta protetta per gli utenti:', error);
    });
} else {
    console.error('Token non presente. Effettuare l\'accesso.');
}

function renderUsersTable(usersData) {
    const userTableContainer = document.getElementById('userTable');

    if (usersData && Array.isArray(usersData)) {
        const userTable = document.createElement('table');
        userTable.classList.add('user-table'); 

        // Intestazione della tabella
        const tableHeader = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headerColumns = ['Username', 'Password', 'isAdmin'];

        headerColumns.forEach(columnText => {
            const headerCell = document.createElement('th');
            headerCell.textContent = columnText;
            headerRow.appendChild(headerCell);
        });

        tableHeader.appendChild(headerRow);
        userTable.appendChild(tableHeader);

        // Corpo della tabella
        const tableBody = document.createElement('tbody');

        usersData.forEach(user => {
            const userRow = document.createElement('tr');
            userRow.id = `userRow_${user._id}`;

            ['username', 'password', 'isAdmin'].forEach(column => {
                const cell = document.createElement('td');
                cell.textContent = column === 'password' ? '********' : user[column];
                userRow.appendChild(cell);
            });

            tableBody.appendChild(userRow);
        });

        userTable.appendChild(tableBody);
        userTableContainer.innerHTML = ''; 
        userTableContainer.appendChild(userTable);
    } else {
        console.error('Dati sugli utenti non validi.');
    }
}
