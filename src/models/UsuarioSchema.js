const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UsuarioSchema = new Schema(
  {
    CorreoUsuario: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    Contraseña: {
      type: String,
      required: true,
    },
    Nombre: {
      type: String,
      required: false,
    },
    Rut: {
      type: String,
      trim: true,
    },

    FechaNacimiento: Date,
    LinkGoogleScholar: String,
    NivelAcceso: Number, //requerido
  },
  {
    timestamps: true,
  }
);

UsuarioSchema.methods.encryptContraseña = async (Contraseña) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(Contraseña, salt);
};

UsuarioSchema.methods.matchContraseña = async function (Contraseña) {
  return await bcrypt.compare(Contraseña, this.Contraseña);
};

module.exports = model("Usuario", UsuarioSchema);
