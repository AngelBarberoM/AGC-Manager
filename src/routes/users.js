import { Router } from 'express'
import { UsersModel } from '../models/mysql/users.js'
import { onlyLoggedIn } from '../controllers/loggedIn.js'
import { UsersController } from '../controllers/users.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const usersRouter = Router()

const usersController = new UsersController({ UsersModel })

usersRouter.get('/', onlyLoggedIn, (req, res) => {
  const usersHtmlPath = path.join(__dirname, '..', 'views', 'users.html')
  res.sendFile(usersHtmlPath)
})

usersRouter.get('/allUsers', onlyLoggedIn, usersController.getAllUsers)

usersRouter.get('/:id', onlyLoggedIn, (req, res) => {
  const usersHtmlPath = path.join(__dirname, '..', 'views', 'user.html')
  res.sendFile(usersHtmlPath)
})
usersRouter.get('/details/:id', onlyLoggedIn, usersController.getUserById)

usersRouter.delete('/:id', onlyLoggedIn, usersController.deleteUser)
usersRouter.post('/', onlyLoggedIn, usersController.createUser)
usersRouter.patch('/:id', onlyLoggedIn, usersController.updateUser)
