const { Router } = require('express');
const router = Router();
const {getUsers,getUser, createUser, updateUser, deleteUser} = require('../controllers/UsersController')

router.route('/')
    .get(getUsers)//muestra todo
    .post(createUser)//trae formulario
    
router.route('/:UsuarioId')
    .get(getUser)//muestra uno
    .put(updateUser)//actualiza
    .delete(deleteUser)//elimina

module.exports = router;   