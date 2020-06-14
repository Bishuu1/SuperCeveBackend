const userCtrl = {};

userCtrl.getUser = (req, res) => res.json({userid: []});

userCtrl.logUser = (req, res) => res.json({mensaje: 'algo'});

userCtrl.updateUser = (req, res) => res.json({mensaje: 'algo'});

userCtrl.createUser = (req, res) => res.json({mensaje: 'algo'});

module.exports = userCtrl;