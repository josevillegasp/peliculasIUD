const { Router } = require('express');
const User = require('../models/User');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helper/jwt');

const router = Router();

router.post(
	'/',
	[
		check('email', 'invalid.email').isEmail(),
		check('password', 'invalid.password').not().isEmpty(),
		// check('role', 'invalid.role').isIn(['admin', 'user']),
	],
	async function (req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: errors.array() });
			}
			// Buscar usuario por email
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				return res.status(400).json({ message: 'user not found' });
			}

			// verifica y compara la contraseña
			const isMatch = bcrypt.compareSync(req.body.password, user.password);
			if (!isMatch) {
				return res
					.status(400)
					.json({ message: 'Correo o contraseña incorrectos' });
			}

			const token = generateToken(user);
			// Si la contraseña es correcta, enviar los datos del usuario
			res.send({
				accessToken: token,
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			});
		} catch (error) {
			console.log(error);
			res.status(500).send('Mensaje de error' + error.message);
		}
	}
);

module.exports = router;
