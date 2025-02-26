const { Shema,model } = require ('mongoose');

const MediaShema = Shema ({
    serial:{ type: String ,required : true, unique: true },
    titulo:{ type: String ,required : true },
    Sipnosis:{ type: String ,required : true },
    url:{ type: String ,required : true, unique: true },
    imagen :{ type: String ,required : true,},
    fechacreacion:{ type: Date ,required : true },
    fechaactualizacion:{ type: Date ,required : true },
    añoestreno:{ type: Date ,required : true },
    generoprincipal:{ type: Shema.Types.ObjectId , ref: 'Genero', required : true },
    directorprincipal:{ type: Shema.Types.ObjectId , ref: 'Director', required : true },
    productora:{ type: Shema.Types.ObjectId , ref: 'Productora', required : true },
    tipo:{ type: Shema.Types.ObjectId , ref: 'Tipo', required : true },
});
module.exports = model('Media', MediaShema);