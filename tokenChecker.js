const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const tokenChecker = function(req, res, next) {
	
	// check header or url parameters or post parameters for token
	console.log("Before token assignment:", req.body.token, req.query.token, req.headers['x-access-token'], req.headers['authorization']);
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