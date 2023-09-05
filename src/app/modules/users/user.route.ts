import express from 'express'

// Controllers
import userController from './user.controller'

const router = express.Router()

router.post('/create-user', userController.createUser)

export default router
