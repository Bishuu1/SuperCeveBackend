const { Schema, model } = require("mongoose");

const TempleateSchema = new Schema(
  {
    Nombre: String,
    Description: String,
    Element: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Template", TempleateSchema);
