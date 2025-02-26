const { Schema,model } = require ('mongoose');

const TipoSchema = Schema ({
    nombre:{ type: String ,required : true },
    fechacreacion:{ type: Date ,required : true },
    fechaactualizacion:{ type: Date ,required : true },
      descripcion:{type: String ,required : true },
});
module.exports = model('Tipo', TipoSchema);