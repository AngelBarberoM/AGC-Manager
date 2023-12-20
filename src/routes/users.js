import { Router } from 'express'
import { UsersModel } from '../models/mysql/users.js'
import { onlyLoggedIn, onlyAdmin, onlyUserAdmin } from '../controllers/loggedIn.js'
import { UsersController } from '../controllers/users.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const usersRouter = Router()

const usersController = new UsersController({ UsersModel })

usersRouter.get('/', onlyAdmin, (req, res) => {
  const usersHtmlPath = path.join(__dirname, '..', 'views', 'users.html')
  res.sendFile(usersHtmlPath)
})

usersRouter.get('/allUsers', onlyAdmin, usersController.getAllUsers)

usersRouter.get('/:id', onlyUserAdmin, (req, res) => {
  const usersHtmlPath = path.join(__dirname, '..', 'views', 'user.html')
  res.sendFile(usersHtmlPath)
})
usersRouter.get('/details/:id', onlyUserAdmin, usersController.getUserById)

usersRouter.get('/typeUser/:id', onlyLoggedIn, usersController.getTypeUserById)

usersRouter.delete('/:id', onlyLoggedIn, usersController.deleteUser)
usersRouter.post('/', onlyLoggedIn, usersController.createUser)
usersRouter.patch('/:id', onlyLoggedIn, usersController.updateUser)
