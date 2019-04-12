const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articuloSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    codigo: {
        type: String,
        required: [true, 'El nombre completo es obligatorio']
    },
	precio: {
        type: String,
        required: [true, 'El nombre completo es obligatorio']
	},
	stock: {
        type: String,
        required: [true, 'El nombre completo es obligatorio']
	}
})

module.exports = mongoose.model('Articulo', articuloSchema)
