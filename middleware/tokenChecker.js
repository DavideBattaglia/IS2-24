const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.SECRET_KEY || 'defaultSecretKey';

const tokenChecker = function(req, res, next) {
	console.log("Chiave segreta:", process.env.SECRET_KEY);

	// check header or url parameters or post parameters for token
	//console.log("Before token assignment:", req.body.token, req.query.token, req.headers['x-access-token'], req.headers['authorization']);
	var token = req.headers['authorization'] || req.headers['x-access-token'] || req.query.token || req.body.token;
	console.log("tokenChecherTOP_token: ", token);
	// if there is no token
	if (!token) {
		return res.status(401).send({ 
			success: false,
			message: 'No token provided.'
		});
	}

	// decode token, verifies secret and checks exp
	jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {			
		if (err) {
			if (err.name === 'TokenExpiredError') {
				console.log('Token scaduto');
			} else if (err.name === 'JsonWebTokenError') {
				console.log('Errore di JWT:', err.message);
			} else {
				console.log('Altro tipo di errore durante la verifica del token:', err.message);
			}
			return res.status(403).send({
				success: false,
				message: 'Failed to authenticate token.'
			});		
		} else {
			// if everything is good, save to request for use in other routes
			console.log("[tokenChecer.ejs]everything is good");
			req.loggedUser = decoded;
			next();
		}
	});
	
};

module.exports = tokenChecker