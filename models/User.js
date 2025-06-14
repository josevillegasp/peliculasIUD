const { Schema, model } = require('mongoose');

const UserSchema = Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, required: true, enum: ['admin', 'user'] },
	state: { type: String, required: true, enum: ['activo', 'inactivo'] },
	createdAt: { type: Date, required: true },
	updateAt: { type: Date, required: true },
});

module.exports = model('User', UserSchema);
