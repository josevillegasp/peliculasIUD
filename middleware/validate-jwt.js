const jwt = require('jsonwebtoken');
const { validate } = require('../models/Media');

const validateJWT = (req, res, next) => {
	const token = req.header('authorization');
	if (!token) {
		return res.status(401).json({ message: 'authorization denied' });
	}

	try {
		const payload = jwt.verify(token, '123456789');
		req.payload = payload;
		next();
	} catch (error) {
		return res.status(401).json({ message: 'Token is not valid' });
	}
};

module.exports = { validateJWT };
