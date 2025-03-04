const { Router } = require('express');
const Tipo = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const router = Router();

/**
 Crear un nuevo tipo (POST)
 */
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty()
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let tipo = new Tipo({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            fechacreacion: new Date(),
            fechaactualizacion: new Date()
        });

        tipo = await tipo.save();
        res.status(201).json(tipo);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

/**
 Listar todos los tipos (GET)
 */
router.get('/', async function (req, res) {
    try {
        const tipos = await Tipo.find();
        res.json(tipos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

/**
 Obtener un tipo por ID (GET)
 */
router.get('/:id', async function (req, res) {
    try {
        const tipo = await Tipo.findById(req.params.id);
        if (!tipo) {
            return res.status(404).json({ message: 'Tipo no encontrado' });
        }
        res.json(tipo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

/**
Actualizar un tipo (PUT)
 */
router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty()
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let tipo = await Tipo.findById(req.params.id);
        if (!tipo) {
            return res.status(404).json({ message: 'Tipo no encontrado' });
        }

        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;
        tipo.fechaactualizacion = new Date();

        tipo = await tipo.save();
        res.json(tipo);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

/**
 Eliminar un tipo (DELETE)
 */
router.delete('/:id', async function (req, res) {
    try {
        const tipo = await Tipo.findByIdAndDelete(req.params.id);
        if (!tipo) {
            return res.status(404).json({ message: 'Tipo no encontrado' });
        }

        res.json({ message: 'Tipo eliminado correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;