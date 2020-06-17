const { Router } = require('express');
const router = Router();
const { getSetEntries , getSetEntry , createSetEntries,deleteSetEntries,updateSetEntries} = require('../controllers/SetEntriesController');

router.route('/')
    .get(getSetEntries)//muestra todo
    .post(createSetEntries)//trae formulario
    
router.route('/:EntradaId')
    .get(getSetEntry)//muestra uno
    .put(updateSetEntries)//actualiza
    .delete(deleteSetEntries)//elimina

module.exports = router;