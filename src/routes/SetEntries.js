const { Router } = require('express');
const router = Router();
const {
  getEntries,
  getEntry,
  createEntries,
  deleteEntries,
  updateEntries,
  getSetEntries,
  getSetEntry,
  createSetEntries,
  deleteSetEntries,
  updateSetEntries,
} = require('../controllers/SetEntriesController');

router
  .route('/Entry')
  .get(getEntries) //muestra todo
  .post(createEntries); //trae formulario
router
  .route('/SetEntry')
  .get(getSetEntries) //muestra todo
  .post(createSetEntries); //trae formulario
router
  .route('/Entry/:EntradaId')
  .get(getEntry) //muestra uno
  .put(updateEntries) //actualiza
  .delete(deleteEntries); //elimina
router
  .route('/SetEntry/:ConjuntoId')
  .get(getSetEntry) //muestra uno
  .put(updateSetEntries) //actualiza
  .delete(deleteSetEntries); //elimina

module.exports = router;
