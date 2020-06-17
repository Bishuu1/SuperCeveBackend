const inputsCtrl = {};
const inputsModel = require('../models/UsuarioSchema');



inputsCtrl.getInputs = (req, res) => {
    
    res.json({mensage: 'algo'});

}

inputsCtrl.createInputs = (req, res) => res.json({mensage: 'algo'});

inputsCtrl.deleteInputs = (req, res) => res.json({mensage: 'algo'});

inputsCtrl.updateInputs = (req, res) => res.json({mensage: 'algo'});

module.exports = inputsCtrl;