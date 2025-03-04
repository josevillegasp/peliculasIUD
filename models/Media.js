const { Schema, model } = require('mongoose');

const MediaSchema = new Schema({
    serial: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    sinopsis: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    imagen: { type: String, required: true },
    fechacreacion: { type: Date, default: Date.now },
    fechaactualizacion: { type: Date, default: Date.now },
    anioestreno: { type: Number, required: true }, 
    generoprincipal: { type: Schema.Types.ObjectId, ref: 'Genero', required: true },
    directorprincipal: { type: Schema.Types.ObjectId, ref: 'Director', required: true },
    productora: { type: Schema.Types.ObjectId, ref: 'Productora', required: true },
    tipo: { type: Schema.Types.ObjectId, ref: 'Tipo', required: true },
});

module.exports = model('Media', MediaSchema);
