
const jwt = require('jsonwebtoken'); 
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.SECRET_KEY || 'defaultSecretKey';

const tokenChecker = function(req, res, next) {
	
	console.log("Chiave segreta:", process.env.SECRET_KEY);
	var token = req.headers['authorization'] || req.headers['x-access-token'] || req.query.token || req.body.token;
	console.log("tokenChecherTOP_token: ", token);
	// if there is no token
	if (!token) {
		return res.status(401).send({ 
			success: false,
			message: 'No token provided.'
		});
	}

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
			console.log("[tokenChecer.ejs]everything is good");
			req.loggedUser = decoded;
			next();
		}
	});
	
};

module.exports = tokenChecker
