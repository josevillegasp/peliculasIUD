
const {Router }= require('express');
const Director = require('../models/Director');
const {validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado','invalid.estado').isIn( [ 'activo', 'inactivo' ]),

], async function(req,res) {
    
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
        res.send(director)    

        
} catch (error) {
    console.log(error);
    res.status(500).send('mensage de error')

}
 

});

router.get('/',async function (req,res) {
 try {
    
    const directors = await Director.find();
    res.send(directors);

} catch (error) {
    console.log(error);
    res.status(500).send('message error')
}
});



// UPDATE


router.put('/:directorId', [
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado','invalid.estado').isIn( [ 'activo', 'inactivo' ]),

], async function(req,res) {
    
try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() }); //CÓDIGOS DE ESTADO HTTP
    }

    let director = await Director.findById (req.params.directorId);
    if (!director){
        return res.status(400).send('El director no existe');
    }

   //  const directorExist = await Director.findOne({ nombre: req.body.nombre });
    // if (directorExist) {
      // return res.status(400).send('nombre repetido');
    }

       
    director.nombre = req.body.nombre;
    director.estado = req.body.estado;
    director.fechaactualizacion = new Date();

    director = await director.save();
    res.send(director)    

        
} catch (error) {
    console.log(error);
    res.status(500).send('mensage de error')

}


});

module.exports = router;
