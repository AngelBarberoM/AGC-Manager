import { Router } from 'express'
import { AGCdbModel } from '../models/mysql/AGCdb.js'
import { onlyLoggedIn } from '../controllers/loggedIn.js'
import { UsersController } from '../controllers/users.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const usersRouter = Router()

const usersController = new UsersController({ AGCdbModel })

usersRouter.get('/', onlyLoggedIn, (req, res) => {
  const usersHtmlPath = path.join(__dirname, '..', 'views', 'users.html')
  res.sendFile(usersHtmlPath)
})

usersRouter.get('/allUsers', usersController.getAllUsers)
usersRouter.get('/:id', usersController.getUserById)
usersRouter.delete('/:id', usersController.deleteUser)
usersRouter.post('/', usersController.createUser)
usersRouter.patch('/:id', usersController.updateUser)

// usersRouter.get('/allUsers', onlyLoggedIn, usersController.getAllUsers)
// usersRouter.get('/:id', onlyLoggedIn, usersController.getUserById)
// usersRouter.delete('/:id', onlyLoggedIn, usersController.deleteUser)
// usersRouter.post('/', onlyLoggedIn, usersController.createUser)
// usersRouter.patch('/:id', onlyLoggedIn, usersController.updateUser)
