const SetEntriesCtrl = {};
const EntradaSchema = require('../Models/EntradaSchema');
const { json } = require('body-parser');

SetEntriesCtrl.getSetEntries = async(req,res) => {
    await EntradaSchema.find({}, (err,Entradas) =>{//CONSULTA QUE BUSCA LAS ENTRADAS
        if(err) return res.status(500).send.length({message:'error'})
        if(!Entradas) return res.status(404).send({message: 'Error al buscar'})
        res.send(200,{Entradas});//RESPUESTA TODAS LAS ENTRADAS
    });
};

SetEntriesCtrl.getSetEntry = async(req,res) => {
    const EntradaId = req.params.EntradaId;
    const Entrada = await EntradaSchema.findById(EntradaId, (err, Entrada) => {//CONSULTA QUE BUSCA LA ENTRADA POR ID
        if(err) return res.status(500).send({message : 'Error'})
        if(!Entrada) return res.status(404).send({message: 'Error al buscar'});
        res.status(200).send({Entrada});//RESPUESTA 1 ENTRADA
    });
};

SetEntriesCtrl.createSetEntries = async(req, res) => {
    console.log(req.body);
     //Transforma body en esquema y se guarda en Entrada
    const Entrada = new EntradaSchema(req.body);
    //Almacena en la bd
    await Entrada.save((err, EntradaGuardada)=> { 
        if(err) return res.status(500).send({message : 'Error al guardar'})
    res.send(200,{EntradaGuardada})//RESPUESTA ENTRADA GUARDADA
    })
};

SetEntriesCtrl.updateSetEntries = async(req,res) => {
    const EntradaId = req.params.EntradaId;
    const Update = req.body;
    await EntradaSchema.findByIdAndUpdate(EntradaId,Update, (err, EntradaUpdated)=>{
        if(err) res.status(500).send({message: 'Error al actualizar'});
        res.status(200).send({EntradaUpdated});//devuelve objeto actualizado
    });
};

SetEntriesCtrl.deleteSetEntries = async(req,res) => {
    const EntradaId = req.params.EntradaId;
    await EntradaSchema.findById(EntradaId, (err, Entrada)=>{
        if(err) res.status(500).send({message: 'Error al buscar'})
        Entrada.remove(err =>{
            if(err) res.status(500).send({message:'Error al eliminar'});
            res.status(200).send({message: 'Se elimino correctamente'});
        });
    });
};


module.exports = SetEntriesCtrl;