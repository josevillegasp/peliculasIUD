const { Schema,model } = require ('mongoose');

const ProductoraSchema = Schema ({
    nombre:{ type: String ,required : true },
    estado:{ type: String ,required : true , enum: ['activo', 'inactivo'] }, 
    fechacreacion:{ type: Date ,required : true },
    fechaactualizacion:{ type: Date ,required : true },
    slogan:{ type: String ,required : true },
    descripcion:{type: String ,required : true },
});
module.exports = model('Productora', ProductoraSchema);