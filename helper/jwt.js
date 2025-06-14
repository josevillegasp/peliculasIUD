const jwt = require('jsonwebtoken');

const generateToken = (user) => {
	const payload = {
		id: user._id,
		name: user.name,
		email: user.email,
		state: user.state,
		role: user.role,
	};
	return jwt.sign(payload, '123456789', {
		expiresIn: '1h', // El token expirará en 1 hora
	});
};

module.exports = { generateToken };
