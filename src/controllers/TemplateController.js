const TemplateCtrl = {};
const TemplateSchema = require('../models/TemplateSchema');



TemplateCtrl.getTemplate = async(req,res) => {
    await TemplateSchema.find({}, (err,Templates) =>{//CONSULTA QUE BUSCA LAS PLANTILLAS
        if(err) return res.status(500).send.length({message:'error'})
        if(!Templates) return res.status(404).send({message: 'Error al buscar'})
        res.send(200,{Templates});//RESPUESTA TODAS LAS PLANTILLAS
    });
};

TemplateCtrl.createTemplate = async(req, res) => {
    console.log(req.body);
     //Transforma body en esquema y se guarda en Template
    const Template = new TemplateSchema(req.body);
    //Almacena en la bd
    await Template.save((err, TemplateGuardado)=> { 
        if(err) return res.status(500).send({message : 'Error al guardar'})
    res.send(200,{TemplateGuardado})//RESPUESTA TEMPLATE GUARDADA
    })
};

TemplateCtrl.deleteTemplate = async(req,res) => {
    const TemplateId = req.params.TemplateId;
    await TemplateSchema.findById(TemplateId, (err, Template)=>{
        if(err) res.status(500).send({message: 'Error al buscar'})
        Template.remove(err =>{
            if(err) res.status(500).send({message:'Error al eliminar'});
            res.status(200).send({message: 'Se elimino correctamente'});
        });
    });
};

TemplateCtrl.updateTemplate = async(req,res) => {
    const TemplateId = req.params.TemplateId;
    const Update = req.body;
    await TemplateSchema.findByIdAndUpdate(TemplateId,Update, (err, TemplateUpdated)=>{
        if(err) res.status(500).send({message: 'Error al actualizar'});
        res.status(200).send({TemplateUpdated});//devuelve objeto actualizado
    });
};

module.exports = TemplateCtrl;