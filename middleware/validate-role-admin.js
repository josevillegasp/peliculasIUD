const jwt = require('jsonwebtoken');

const validateRoleAdmin = (req, res, next) => {
	if (req.payload.role !== 'admin') {
		return res
			.status(403)
			.json({ message: 'Access denied, admin role required' });
	}
	next();
};

module.exports = { validateRoleAdmin };
