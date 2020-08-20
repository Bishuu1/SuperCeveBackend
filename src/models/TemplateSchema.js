const { Schema, model } = require("mongoose");

const TempleateSchema = new Schema(
  {
    Nombre: String,
    Descripcion: String,
    Color: String,
    Fuente: String,
    TipoPlantilla:String,
    Usuario:String
  },
  {
    timestamps: true,
  }
);

module.exports = model("Template", TempleateSchema);
