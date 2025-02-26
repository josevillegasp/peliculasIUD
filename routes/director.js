const {Router }= require('express');
const Director = require('../models/Director');
const {validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado','invalid.estado').isIn( ['activo','inactivo'])
], async function(req,res) {
    
try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()}); 


    }
        
        
} catch (error) {
    console.log(error);
    res.status(500).send('mensage de error')

}
 

});

router.get('/',async function (req,res) {
 try {
    
    const directors = await Director.find();
    res.send(directors);

 } catch(error) {

    console.log(error);
    res.status(500).send('mensage de error')

 } 
 let director = new Director();
        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.nombre = req.body.nombre;
        director.fechacreacion = new Date();
        fechaactualizacion = new Date();

        director = await director.save ();
        res.send(director)

    
 }); 



module.exports=router;

