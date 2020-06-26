const UsersCtrl = {};
const UsuarioSchema = require('../Models/UsuarioSchema');

UsersCtrl.getUsers = async (req, res) => {
  await UsuarioSchema.find({}, (err, Usuarios) => {
    //CONSULTA QUE BUSCA LOS USUARIOS
    if (err) return res.status(500).send.length({ message: 'error' });
    if (!Usuarios) return res.status(404).send({ message: 'Error al buscar' });
    res.send(200, { Usuarios }); //RESPUESTA TODAS LOS USUARIOS
  });
};

UsersCtrl.getUser = async (req, res) => {
  const UsuarioId = req.params.UsuarioId;
  const Usuario = await UsuarioSchema.findById(UsuarioId, (err, Usuario) => {
    //CONSULTA QUE BUSCA EL USUARIO POR ID
    if (err) return res.status(500).send({ message: 'Error' });
    if (!Usuario) return res.status(404).send({ message: 'Error al buscar' });
    res.status(200).send({ Usuario }); //RESPUESTA 1 USUARIO
  });
};

UsersCtrl.loginUser = async (req, res) => {
  const Usuario = new UsuarioSchema(req.body);
  const UsuarioBdd = await UsuarioSchema.findOne({
    CorreoUsuario: req.body.CorreoUsuario,
  });
  if (!UsuarioBdd) {
    return res.status(500).send({ message: 'Error de email y/o contraseña' });
  } else {
    const match = await UsuarioBdd.matchContraseña(req.body.Contraseña);
    if (match) {
      const Resultado = await UsuarioSchema.findOne(
        { CorreoUsuario: Usuario.CorreoUsuario },
        'CorreoUsuario Rut FechaNacimiento LinkGoogleScholar NivelAcceso Nombre _id'
      );
      res.send(200, Resultado);
    } else {
      return res.status(500).send({ message: 'Error de email y/o contraseña' });
    }
  }
};

UsersCtrl.createUser = async (req, res) => {
  //Transforma body en esquema y se guarda en Usuario
  const Usuario = new UsuarioSchema(req.body);
  Usuario.Contraseña = await Usuario.encryptContraseña(req.body.Contraseña);
  //Almacena en la bd
  await Usuario.save((err, UsuarioGuardado) => {
    if (err) {
      return res.status(500).send({ message: 'Error al guardar' });
    } else {
      res.send(200, { UsuarioGuardado }); //RESPUESTA USUARIO GUARDADA
    }
  });
};

UsersCtrl.updateUser = async (req, res) => {
  const UsuarioId = req.params.UsuarioId;
  const Update = req.body;
  const Schema = new UsuarioSchema(Update)
  if (Update.Contraseña){
    Update.Contraseña = await Schema.encryptContraseña(Update.Contraseña);
  }
  await UsuarioSchema.findByIdAndUpdate(
    UsuarioId,
    Update,
    { new: true }, // Con esta configuracion devuelve efectivamente el usuario actualizado.
    (err, UsuarioUpdated) => {
      if (err) {
         res.status(500).send({ message: "Error al actualizar" });
      } else {
         res.status(200).send({ UsuarioUpdated }); //devuelve objeto actualizado 
      }
    }
  );
};

UsersCtrl.deleteUser = async (req, res) => {
  const UsuarioId = req.params.UsuarioId;
  await UsuarioSchema.findById(UsuarioId, (err, Usuario) => {
    if (err) {
      res.status(500).send({ message: 'Error al buscar' });
    } else {
      Usuario.remove((err) => {
        if (err) {
          res.status(500).send({ message: 'Error al eliminar' });
        } else {
          res.status(200).send({ message: 'Se elimino correctamente' });
        }
      });
    }
  });
};

module.exports = UsersCtrl;
