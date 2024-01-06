// public/js/aggiungi.js
function addShoe() {
    // Ottieni il token dalla memoria locale (localStorage)
    const token = localStorage.getItem('token');
    console.log('TOKEN:', token);
  
    // Ottieni i valori dai campi del modulo
    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
  
    // Crea l'oggetto con i dati della scarpa
    const shoeData = {
      brand: brand,
      model: model,
      description: description,
      price: parseFloat(price), // Converto il prezzo in un numero (float)
    };
  
    if (token) {
      // Esegui la richiesta POST alla rotta protetta con il token nell'header
      fetch('/addshoe', {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shoeData),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        console.log('Scarpa aggiunta con successo.');
        // Puoi gestire la risposta qui se necessario
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
  }
  