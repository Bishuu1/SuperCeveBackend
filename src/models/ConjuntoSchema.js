const { Schema, model } = require('mongoose');

const ConjuntoSchema = new Schema(
  {
    NombreConjuntoEntradas: { type: String },
    Descripcion: { type: String },
    Entradas: [{ type: String }],
    Usuario: {
      //CAMPO REQUERIDO PARA LAS SESIONES EN TODOS LOS ESQUEMAS MENOS EN USUARIOS
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Conjunto', ConjuntoSchema);
