const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const auth = require('../middleware/auth.middleware')
const Role = require('../utils/userRoles.utils')
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware')

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware')

router.get('/', auth(), awaitHandlerFactory(userController.getAllUsers)) // /api/v1/users
router.get('/id/:id', auth(), awaitHandlerFactory(userController.getUserById)) // /api/v1/users/id/1
router.get('/username/:username', auth(), awaitHandlerFactory(userController.getUserByuserName)) // /api/v1/users/usersname/julia
router.get('/whoami', auth(), awaitHandlerFactory(userController.getCurrentUser)) // /api/v1/users/whoami
router.post('/', createUserSchema, awaitHandlerFactory(userController.createUser)) // /api/v1/users
router.patch('/id/:id', auth(Role.Admin), updateUserSchema, awaitHandlerFactory(userController.updateUser)) // /api/v1/users/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(userController.deleteUser)) // /api/v1/users/id/1

router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin)) // /api/v1/users/login

module.exports = router