const { Router } = require('express');
const router = Router();
const { getInputs, createInputs, updateInputs, deleteInputs } = require('../controllers/inputsController')

router.route('api/user:id/inputs')
	.get(getInputs)
	.post(createInputs)
    .put(updateInputs)
    .delete(deleteInputs)

    
module.exports = router;