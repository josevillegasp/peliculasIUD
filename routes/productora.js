const { Router } = require('express');
const Productora = require('../models/Productora');
const { validationResult, check } = require('express-validator');

const { validateJWT } = require('../middleware/validate-jwt');
const { validateRoleAdmin } = require('../middleware/validate-role-admin');

const router = Router();

/**
 Crear una nueva productora (POST)
 */
router.post(
	'/',
	[validateJWT, validateRoleAdmin],
	[
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('slogan', 'El slogan es obligatorio').not().isEmpty(),
		check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
		check('estado', 'Estado inválido').isIn(['activo', 'inactivo']),
	],
	async function (req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			// Verificar si ya existe un género con el mismo nombre
			const productoraExist = await Productora.findOne({
				nombre: req.body.nombre,
			});
			if (productoraExist) {
				return res.status(400).send('El nombre de la productora ya existe');
			}

			let productora = new Productora({
				nombre: req.body.nombre,
				slogan: req.body.slogan,
				descripcion: req.body.descripcion,
				estado: req.body.estado,
				fechacreacion: new Date(),
				fechaactualizacion: new Date(),
			});

			productora = await productora.save();
			res.status(201).json(productora);
		} catch (error) {
			console.error(error);
			res.status(500).send('Error en el servidor');
		}
	}
);

/**
 Listar todas las productoras (GET)
 */
router.get('/', [validateJWT, validateRoleAdmin], async function (req, res) {
	try {
		const productoras = await Productora.find();
		res.json(productoras);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error en el servidor');
	}
});

/**
 Obtener una productora por ID (GET)
 */
router.get('/:id', [validateJWT, validateRoleAdmin], async function (req, res) {
	try {
		const productora = await Productora.findById(req.params.id);
		if (!productora) {
			return res.status(404).json({ message: 'Productora no encontrada' });
		}
		res.json(productora);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error en el servidor');
	}
});

/**
 Actualizar una productora (PUT)
 */
router.put(
	'/:id',
	[validateJWT, validateRoleAdmin],
	[
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('slogan', 'El slogan es obligatorio').not().isEmpty(),
		check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
		check('estado', 'Estado inválido').isIn(['activo', 'inactivo']),
	],
	async function (req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			let productora = await Productora.findById(req.params.id);
			if (!productora) {
				return res.status(404).json({ message: 'Productora no encontrada' });
			}

			productora.nombre = req.body.nombre;
			productora.slogan = req.body.slogan;
			productora.descripcion = req.body.descripcion;
			productora.estado = req.body.estado;
			productora.fechaactualizacion = new Date();

			productora = await productora.save();
			res.json(productora);
		} catch (error) {
			console.error(error);
			res.status(500).send('Error en el servidor');
		}
	}
);

/**
 Eliminar una productora (DELETE)
 */
router.delete(
	'/:id',
	[validateJWT, validateRoleAdmin],
	async function (req, res) {
		try {
			const productora = await Productora.findByIdAndDelete(req.params.id);
			if (!productora) {
				return res.status(404).json({ message: 'Productora no encontrada' });
			}

			res.json({ message: 'Productora eliminada correctamente' });
		} catch (error) {
			console.error(error);
			res.status(500).send('Error en el servidor');
		}
	}
);

module.exports = router;
