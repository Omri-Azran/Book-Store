import express from 'express'
import * as userController from '../controllers/user.controller.js';
import AuthenticateToken from '../middlewares/auth.middleware.js'

const UserRouter = express.Router();

UserRouter.post('/users/signup', userController.CreateUser)
UserRouter.post('/users/login', userController.Login)
UserRouter.delete('/users/logout',AuthenticateToken, userController.Logout)





export default UserRouter