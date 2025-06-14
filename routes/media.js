const { Router } = require('express');
const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const { validateJWT } = require('../middleware/validate-jwt');
const { validateRoleAdmin } = require('../middleware/validate-role-admin');

const router = Router();

// Crear una nueva producción (película o serie)**
router.post(
	'/',
	[validateJWT, validateRoleAdmin],
	[
		check('serial', 'El serial es obligatorio').not().isEmpty(),
		check('titulo', 'El título es obligatorio').not().isEmpty(),
		check('sinopsis', 'La sinopsis es obligatoria').not().isEmpty(),
		check('url', 'La URL es obligatoria').not().isEmpty(),
		check('imagen', 'La imagen es obligatoria').not().isEmpty(),
		check(
			'anioestreno',
			'El año de estreno es obligatorio y debe ser un número'
		).isNumeric(),
		check('generoprincipal', 'El género es obligatorio').not().isEmpty(),
		check('directorprincipal', 'El director es obligatorio').not().isEmpty(),
		check('productora', 'La productora es obligatoria').not().isEmpty(),
		check('tipo', 'El tipo es obligatorio').not().isEmpty(),
	],
	async (req, res) => {
		try {
			console.log('Cuerpo recibido:', req.body);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			// Buscar los documentos en la base de datos
			const [genero, director, productora, tipo] = await Promise.all([
				Genero.findOne({ _id: req.body.generoprincipal, estado: 'activo' }),
				Director.findOne({ _id: req.body.directorprincipal, estado: 'activo' }),
				Productora.findOne({ _id: req.body.productora, estado: 'activo' }),
				Tipo.findById(req.body.tipo),
			]);

			// Verificar que los elementos requeridos sean válidos y activos
			if (!genero) {
				return res
					.status(400)
					.json({ msg: 'El género seleccionado no está activo o no existe' });
			}

			if (!director) {
				return res
					.status(400)
					.json({ msg: 'El director seleccionado no está activo o no existe' });
			}

			if (!productora) {
				return res.status(400).json({
					msg: 'La productora seleccionada no está activa o no existe',
				});
			}

			if (!tipo) {
				return res.status(400).json({ msg: 'El tipo seleccionado no existe' });
			}

			let media = new Media({
				serial: req.body.serial,
				titulo: req.body.titulo,
				sinopsis: req.body.sinopsis,
				url: req.body.url,
				imagen: req.body.imagen,
				anioestreno: req.body.anioestreno,
				generoprincipal: genero._id,
				directorprincipal: director._id,
				productora: productora._id,
				tipo: tipo._id,
				fechacreacion: new Date(),
				fechaactualizacion: new Date(),
			});

			media = await media.save();
			res.status(201).json(media);
		} catch (error) {
			console.error('Error en el servidor:', error);
			res.status(500).send('Error en el servidor');
		}
	}
);

// Obtener todas las producciones**
router.get('/', validateJWT, async function (req, res) {
	try {
		const media = await Media.find()
			.populate({ path: 'generoprincipal', select: 'nombre estado' })
			.populate({ path: 'directorprincipal', select: 'nombre estado' })
			.populate({
				path: 'productora',
				select: 'nombre estado slogan descripcion',
			})
			.populate({ path: 'tipo', select: 'nombre descripcion' });

		res.json(media);
	} catch (error) {
		console.log('Error al obtener la media:', error);
		res.status(500).json({ msg: 'Error en el servidor' });
	}
});

// Obtener una producción por ID**
router.get('/:id', validateJWT, async (req, res) => {
	try {
		const media = await Media.findById(req.params.id).populate(
			'generoprincipal directorprincipal productora tipo'
		);

		if (!media) {
			return res.status(404).json({ msg: 'No se encontró la producción' });
		}

		res.json(media);
	} catch (error) {
		console.error('Error al obtener media:', error);
		res.status(500).json({ msg: 'Error en el servidor' });
	}
});

// Actualizar una producción**
router.put('/:id', [validateJWT, validateRoleAdmin], async (req, res) => {
	try {
		let media = await Media.findById(req.params.id);
		if (!media) {
			return res.status(404).json({ msg: 'No se encontró la producción' });
		}

		req.body.fechaactualizacion = new Date();
		media = await Media.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});

		res.json(media);
	} catch (error) {
		console.error('Error al actualizar media:', error);
		res.status(500).json({ msg: 'Error en el servidor' });
	}
});

// Eliminar una producción**
router.delete('/:id', [validateJWT, validateRoleAdmin], async (req, res) => {
	try {
		const media = await Media.findByIdAndDelete(req.params.id);
		if (!media) {
			return res.status(404).json({ msg: 'No se encontró la producción' });
		}
		res.json({ msg: 'Producción eliminada correctamente' });
	} catch (error) {
		console.error('Error al eliminar media:', error);
		res.status(500).json({ msg: 'Error en el servidor' });
	}
});

module.exports = router;
