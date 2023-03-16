const { verify } = require('jsonwebtoken');
const { secret_key } = require('../config/env');
const {userByRole}= require('./serach')


const checkAuth = (req, res, next) => {
	try {
		const header = req.headers.authorization;
		const token = header.replace('Bearer ', '');
		const decoded = verify(token, secret_key);
		req.userId = decoded.id;
		userByRole(req.userId, (req, resultat) => {
			if (resultat.role === "ADMIN") {
				next();
			} else {
				res.json({message:'partie reserve à l\'admin'})
			}
		});
	} catch (err) {
		res.json({ success: 0, message: 'Auth failed' });
	}
};

module.exports = {
	checkAuth,
};
