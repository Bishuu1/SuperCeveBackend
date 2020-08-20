const { Router } = require("express");
const router = Router();
const {
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} = require("../controllers/TemplateController");

router
  .route("/")
  .get(getTemplate) //muestra todo
  .post(createTemplate); //trae formulario

router
  .route("/:TemplateId")
  .get(getTemplate) //muestra uno
  .put(updateTemplate) //actualiza
  .delete(deleteTemplate); //elimina

module.exports = router;
