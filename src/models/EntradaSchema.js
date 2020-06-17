const { Schema, model } = require('mongoose');

const EntradaSchema = new Schema ({
    NombreEntrada: {type:String},
    TipoEntrada: {type:String},
    IntervaloPaginas: {type:String},
    Autores: {type:String},
    FechaEntrada: {type:Date},
    Revista:{type: String},
    Volumen: {type: Number},
    NumeroTomo: {type: Number},
    Categoria:{type: String},
    LugarObtenido: {type:String},
    Institución: {type:String},
    Usuario: {//CAMPO REQUERIDO PARA LAS SESIONES EN TODOS LOS ESQUEMAS MENOS EN USUARIOS
        type: String
    }
}, {
    timestamps:true
});

module.exports = model('Entrada', EntradaSchema);