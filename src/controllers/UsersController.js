const UsersCtrl = {};
let Throttle = require('promise-parallel-throttle');
const UsuarioSchema = require('../Models/UsuarioSchema');
const EntradaSchema = require('../Models/EntradaSchema');
scholar = require('../utils/scholar');
let cheerioObject = require('fetch-cheerio-object');

const loadCheerio = async (html, beforeData, Usuario) => {
  return new Promise(async (resolve, reject) => {
    console.log('Agregando entrada...');
    const $ = await cheerioObject(html);
    let year = '';
    let book = '';
    let conference = '';
    let journal = '';
    let pages = '';
    let volume = '';
    let issue = '';
    let autors = '';
    let TipoEntrada = 'Publicacion';
    $('.gs_scl').each((i, r) => {
      if ($(r).find('.gsc_vcd_field').text() === 'Fecha de publicación') {
        year = $(r).find('.gsc_vcd_value').text();
      }
      if ($(r).find('.gsc_vcd_field').text() === 'Libro') {
        TipoEntrada = 'Publicacion';
        book = $(r).find('.gsc_vcd_value').text();
      }
      if ($(r).find('.gsc_vcd_field').text() === 'Revista') {
        TipoEntrada = 'Publicacion';
        journal = $(r).find('.gsc_vcd_value').text();
      }
      if ($(r).find('.gsc_vcd_field').text() === 'Conferencia') {
        TipoEntrada = 'Conferencia';
        conference = $(r).find('.gsc_vcd_value').text();
      }
      if ($(r).find('.gsc_vcd_field').text() === 'Volumen') {
        volume = $(r).find('.gsc_vcd_value').text();
      }
      if ($(r).find('.gsc_vcd_field').text() === 'Páginas') {
        pages = $(r).find('.gsc_vcd_value').text();
      }
      if ($(r).find('.gsc_vcd_field').text() === 'Número') {
        issue = $(r).find('.gsc_vcd_value').text();
      }
      if ($(r).find('.gsc_vcd_field').text() === 'Autores') {
        autors = $(r).find('.gsc_vcd_value').text();
      }
    });

    if (conference) {
      setTimeout(
        () =>
          resolve({
            ...beforeData,
            TipoEntrada: TipoEntrada,
            FechaEntrada: year,
            Revista: journal ? journal : book,
            NombreEntrada: conference,
            IntervaloPaginas: pages,
            NumeroTomo: issue,
            Autores: autors,
            Volumen: volume,
            Usuario,
          }),
        2000
      );
    } else {
      setTimeout(
        () =>
          resolve({
            ...beforeData,
            TipoEntrada: TipoEntrada,
            FechaEntrada: year,
            Revista: journal,
            IntervaloPaginas: pages,
            NumeroTomo: issue,
            Autores: autors,
            Volumen: volume,
            Usuario,
          }),
        2000
      );
    }
  });
};

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
  console.log(req.body);
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
  const Schema = new UsuarioSchema(Update);
  console.log(Update);
  if (Update.Contraseña) {
    Update.Contraseña = await Schema.encryptContraseña(Update.Contraseña);
  }
  if (Update.updateScholar) {
    scholar
      .profile(Update.LinkGoogleScholar)
      .then((response) => {
        return response.results;
      })
      .then((listData) => {
        if (listData.length > 0) {
          const queues = listData.map((item) => () =>
            loadCheerio(item.relatedUrl, item, UsuarioId)
          );
          Throttle.all(queues, { maxInProgress: 1 }).then((response) => {
            response.forEach(async (element) => {
              const input = new EntradaSchema(element);
              await input.save((err, EntradaGuardada) => {
                if (err) {
                  return res
                    .status(500)
                    .send({ message: 'Error al guardar entrada' });
                }
              });
            });
          });
        }
      });
    console.log('se actualizo la entrda');
  }

  await UsuarioSchema.findByIdAndUpdate(
    UsuarioId,
    Update,
    { new: true }, // Con esta configuracion devuelve efectivamente el usuario actualizado.
    (err, UsuarioUpdated) => {
      if (err) {
        res.status(500).send({ message: 'Error al actualizar' });
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
