document.getElementById('modificaButton').addEventListener('click', executeModification);

function executeModification() {
    // Ottieni il token dalla memoria locale (localStorage)
    const token = localStorage.getItem('token');
    console.log('TOKEN (ClientModifica.js):', token);

    // Ottieni i valori dai campi del modulo
    const brandInput = document.getElementById('brand');
    const modelInput = document.getElementById('model');
    const descriptionInput = document.getElementById('description');
    const priceInput = document.getElementById('price');
    const shoeIdInput = document.getElementById('shoeId');

    // Estrai l'ID della scarpa dal percorso
    const shoeId = window.location.pathname.split('/').pop();
    console.log('id della scarpa (ClientModifica.js):', shoeId);

    if (token && shoeId) {
        // Ottieni i valori aggiornati dai campi del modulo
        const updatedBrand = brandInput.value;
        const updatedModel = modelInput.value;
        const updatedDescription = descriptionInput.value;
        const updatedPrice = parseFloat(priceInput.value); 

        // Esegui la richiesta PUT  alla rotta protetta con il token nell'header
        fetch(`/updateshoe/${shoeId}`, {
            method: 'PUT', 
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                brand: updatedBrand,
                model: updatedModel,
                description: updatedDescription,
                price: updatedPrice,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Scarpa modificata con successo.');
            // Reindirizza l'utente a Vetrina dopo la modifica
            window.location.href = '/vetrina';
        })
        .catch(error => {
            console.error('Errore nella modifica della scarpa:', error);
        });
    } else {
        console.error('Token o ID scarpa non presenti.');
}}
