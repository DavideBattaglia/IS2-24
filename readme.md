Batty code
npm install express jsonwebtoken body-parser dotenv bcrypt


Per quanto riguarda le rotte (Escluse login e Register) -> Generalmente le rotte in lingua inglese sono protete, quelle in lingua italiano no

npm test tests/loginRoute.test.js
npm test tests/registerRoute.test.js
npm test tests/shoeRoute.test.js
npm test tests/updateShoeRoute.test.js
npm test tests/deleteShoeRoute.test.js
npm test tests/addShoeRoute.test.js

Per eseguire tutti i test:
npm test -- --detectOpenHandles