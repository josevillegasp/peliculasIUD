const { Schema,model } = require ('mongoose');

const DirectorSchema = Schema ({
    nombre:{ type: String ,required : true },
    estado:{ type: String ,required : true , enum: ['activo', 'inactivo'] }, 
    fechacreacion: { type: Date, required: true },
    fechaactualizacion: { type: Date, required: true },
  
});
module.exports = model('Director', DirectorSchema);