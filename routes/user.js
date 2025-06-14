const { Router } = require('express');
const User = require('../models/User');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');

const { validateJWT } = require('../middleware/validate-jwt');
const { validateRoleAdmin } = require('../middleware/validate-role-admin');

const router = Router();
/**
 * Crear un usuario
 */
router.post(
	'/create/',
	[validateJWT, validateRoleAdmin],
	[
		check('name', 'invalid.nombre').not().isEmpty(),
		check('email', 'invalid.email').isEmail(),
		check('password', 'invalid.password').not().isEmpty(),
		check('role', 'invalid.role').isIn(['admin', 'user']),
		check('state', 'invalid.state').isIn(['activo', 'inactivo']),
	],
	async function (req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: errors.array() });
			}

			// Verificar si ya existe un usuario con el mismo email
			const userExist = await User.findOne({ email: req.body.email });
			if (userExist) {
				return res.status(400).send('El email ya está en uso');
			}

			let user = new User();
			user.name = req.body.name;
			user.email = req.body.email;

			// Encripta la contraseña
			const salt = bcrypt.genSaltSync();
			const hash = bcrypt.hashSync(req.body.password, salt);

			user.password = hash;
			user.role = req.body.role;
			user.state = req.body.state;
			user.createdAt = new Date();
			user.updateAt = new Date();

			user = await user.save();
			res.send(user);
		} catch (error) {
			console.log(error);
			res.status(500).send('Mensaje de error' + error.message);
		}
	}
);

/**
 * Obtener todos los usuarios
 */

router.get('/', [validateJWT, validateRoleAdmin], async function (req, res) {
	try {
		const users = await User.find();
		res.send(users);
	} catch (error) {
		console.log(error);
		res.status(500).send('Mensaje de error' + error.message);
	}
});

module.exports = router;
