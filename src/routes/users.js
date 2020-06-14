const { Router } = require('express');
const router = Router();
const {getUser, createUser, updateUser, logUser} = require('../controllers/userController')

router.route('/')
	.get(getUser)
	.post(logUser)
	.put(updateUser)

module.exports = router;