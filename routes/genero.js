const { Router } = require('express');
const Genero = require('../models/Genero');
const { validationResult, check } = require('express-validator');

const router = Router();

/**
  Crear un genero
 */
router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['activo', 'inactivo'])
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let genero = new Genero();
        genero.nombre = req.body.nombre;
        genero.descripcion = req.body.descripcion;
        genero.estado = req.body.estado;
        genero.fechacreacion = new Date();
        genero.fechaactualizacion = new Date();

        genero = await genero.save();
        res.send(genero);

    } catch (error) {
        console.log(error);
        res.status(500).send('Mensaje de error');
    }

});

/**
 Listar los generos
 */
router.get('/', async function (req, res) {

    try {
        const generos = await Genero.find();
        res.send(generos);

    } catch (error) {
        console.log(error);
        res.status(500).send('Mensaje de error');
    }

});

/**
 Buscar un genero por ID
 */
router.get('/:id', async function (req, res) {

    try {
        const genero = await Genero.findById(req.params.id);
        if (!genero) {
            return res.status(404).json({ message: 'Género no encontrado' });
        }

        res.send(genero);

    } catch (error) {
        console.log(error);
        res.status(500).send('Mensaje de error');
    }

});

/**
  Actualizar un género 
 */
router.put('/:id', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['activo', 'inactivo'])
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let genero = await Genero.findById(req.params.id);
        if (!genero) {
            return res.status(404).json({ message: 'Género no encontrado' });
        }

        genero.nombre = req.body.nombre;
        genero.descripcion = req.body.descripcion;
        genero.estado = req.body.estado;
        genero.fechaactualizacion = new Date();

        genero = await genero.save();
        res.send(genero);

    } catch (error) {
        console.log(error);
        res.status(500).send('Mensaje de error');
    }

});

/**
  Eliminar un género 
 */
router.delete('/:id', async function (req, res) {

    try {
        const genero = await Genero.findByIdAndDelete(req.params.id);
        if (!genero) {
            return res.status(404).json({ message: 'Género no encontrado' });
        }

        res.json({ message: 'Género eliminado correctamente' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Mensaje de error');
    }

});

module.exports = router;