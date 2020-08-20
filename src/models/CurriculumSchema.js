const { Schema, model } = require("mongoose");

const CurriculumSchema = new Schema(
  {
    Nombre: String,
    Conjuntos: Array,
    Usuario: String, //CAMPO REQUERIDO PARA LAS SESIONES EN TODOS LOS ESQUEMAS MENOS EN USUARIOS
  },
  {
    timestamps: true,
  }
);

module.exports = model("Curriculum", CurriculumSchema);
