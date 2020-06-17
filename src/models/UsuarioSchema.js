const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs')

const UsuarioSchema = new Schema ({
    CorreoUsuario: { 
      type: String,
      required: true,
      unique: true
    },
    Contraseña: { 
      type: String, 
      required: true,
      trim: true
    },
    Nombre: {
      type: String,
      required:true
    },
    Rut: String,
    FechaNacimiento: Date,
    LinkGoogleScholar: String,
    NivelAcceso: Number,//requeido
}, {
  timestamps: true
});

UsuarioSchema.methods.encryptPassword = async Contraseña => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(Contraseña, salt);
  };
  
UsuarioSchema.methods.matchPassword = async function(Contraseña) {
    return await bcrypt.compare(Contraseña, this.Contraseña);
  };
  
  module.exports = model("Usuario", UsuarioSchema);