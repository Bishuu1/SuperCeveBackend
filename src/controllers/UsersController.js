const UsersCtrl = {};
const UsuarioSchema = require('../Models/UsuarioSchema');
const { json } = require('body-parser');

UsersCtrl.getUsers = async(req,res) => {
    await UsuarioSchema.find({}, (err,Usuarios) =>{//CONSULTA QUE BUSCA LAS ENTRADAS
        if(err) return res.status(500).send.length({message:'error'})
        if(!Usuarios) return res.status(404).send({message: 'Error al buscar'})
        res.send(200,{Usuarios});//RESPUESTA TODAS LAS ENTRADAS
    });
};

UsersCtrl.getUser = async(req,res) => {
    const UsuarioId = req.params.UsuarioId;
    const Usuario = await UsuarioSchema.findById(UsuarioId, (err, Usuario) => {//CONSULTA QUE BUSCA LA ENTRADA POR ID
        if(err) return res.status(500).send({message : 'Error'})
        if(!Usuario) return res.status(404).send({message: 'Error al buscar'});
        res.status(200).send({Usuario});//RESPUESTA 1 ENTRADA
    });
};

UsersCtrl.createUser = async(req, res) => {
    console.log(req.body);
     //Transforma body en esquema y se guarda en Usuario
    const Usuario = new UsuarioSchema(req.body);
    //Almacena en la bd
    await Usuario.save((err, UsuarioGuardado)=> { 
        if(err) return res.status(500).send({message : 'Error al guardar'})
    res.send(200,{UsuarioGuardado})//RESPUESTA ENTRADA GUARDADA
    })
};

UsersCtrl.updateUser = async(req,res) => {
    const UsuarioId = req.params.UsuarioId;
    const Update = req.body;
    await UsuarioSchema.findByIdAndUpdate(UsuarioId,Update, (err, UsuarioUpdated)=>{
        if(err) res.status(500).send({message: 'Error al actualizar'});
        res.status(200).send({UsuarioUpdated});//devuelve objeto actualizado
    });
};

UsersCtrl.deleteUser = async(req,res) => {
    const UsuarioId = req.params.UsuarioId;
    await UsuarioSchema.findById(UsuarioId, (err, Usuario)=>{
        if(err) res.status(500).send({message: 'Error al buscar'})
        Usuario.remove(err =>{
            if(err) res.status(500).send({message:'Error al eliminar'});
            res.status(200).send({message: 'Se elimino correctamente'});
        });
    });
};


module.exports = UsersCtrl;