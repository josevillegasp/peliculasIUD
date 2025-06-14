const { Router } = require('express');
const Director = require('../models/Director');
const { validationResult, check } = require('express-validator');

const { validateJWT } = require('../middleware/validate-jwt');
const { validateRoleAdmin } = require('../middleware/validate-role-admin');

const router = Router();

router.post(
	'/',
	[validateJWT, validateRoleAdmin],
	[
		check('nombre', 'invalid.nombre').not().isEmpty(),
		check('estado', 'invalid.estado').isIn(['activo', 'inactivo']),
	],
	async function (req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: errors.array() }); //CÓDIGOS DE ESTADO HTTP
			}

			const directorExist = await Director.findOne({ nombre: req.body.nombre });
			if (directorExist) {
				return res.status(400).send('nombre repetido');
			}

			let director = new Director();
			director.nombre = req.body.nombre;
			director.estado = req.body.estado;
			director.fechacreacion = new Date();
			director.fechaactualizacion = new Date();

			director = await director.save();
			res.send(director);
		} catch (error) {
			console.log(error);
			res.status(500).send('mensage de error');
		}
	}
);

router.get('/', [validateJWT, validateRoleAdmin], async function (req, res) {
	try {
		const directors = await Director.find();
		res.send(directors);
	} catch (error) {
		console.log(error);
		res.status(500).send('message error');
	}
});

// UPDATE

router.put(
	'/:directorId',
	[validateJWT, validateRoleAdmin],
	[
		check('nombre', 'invalid.nombre').not().isEmpty(),
		check('estado', 'invalid.estado').isIn(['activo', 'inactivo']),
	],
	async function (req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: errors.array() });
			}

			// Busca el director por ID
			let director = await Director.findById(req.params.directorId);
			if (!director) {
				return res.status(400).send('El director no existe');
			}

			// Verifica si el nombre ya existe en otro director (excluyendo el director actual)
			if (req.body.nombre !== director.nombre) {
				const directorExist = await Director.findOne({
					nombre: req.body.nombre,
				});
				if (directorExist) {
					return res.status(400).send('nombre repetido');
				}
			}

			// Actualiza los campos
			director.nombre = req.body.nombre;
			director.estado = req.body.estado;
			director.fechaactualizacion = new Date();

			// Guarda los cambios
			director = await director.save();
			res.send(director);
		} catch (error) {
			console.log(error);
			res.status(500).send('mensage de error');
		}
	}
);

/**
  Eliminar un director 
 */
router.delete(
	'/:id',
	[validateJWT, validateRoleAdmin],
	async function (req, res) {
		try {
			const director = await Director.findByIdAndDelete(req.params.id);
			if (!director) {
				return res.status(404).json({ message: 'Director no encontrado' });
			}

			res.json({ message: 'Director eliminado correctamente' });
		} catch (error) {
			console.log(error);
			res.status(500).send('Mensaje de error');
		}
	}
);

module.exports = router;
