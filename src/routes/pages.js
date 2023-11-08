import { Router } from 'express'
import { registerRouter } from './register.js'
import { loginRouter } from './login.js'
import { homeRouter } from './home.js'
import { usersRouter } from './users.js'
import { clientsRouter } from './clients.js'

import { isLoggedOut } from '../controllers/loggedout.js'
import { onlyPublic, onlyLoggedIn } from '../controllers/loggedIn.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const pagesRouter = Router()

// Main Page
pagesRouter.get('/', onlyPublic, (req, res) => {
  const mainHtmlPath = path.join(__dirname, '..', 'views', 'main.html')
  res.sendFile(mainHtmlPath)
})

// Home Page
pagesRouter.get('/home', homeRouter)

// Login Page
pagesRouter.use('/login', loginRouter)

// Register Page
pagesRouter.use('/register', registerRouter)

// LogOut
pagesRouter.use('/logout', onlyLoggedIn, isLoggedOut)

// Users Page
pagesRouter.use('/users', usersRouter)

// Clients Page
pagesRouter.use('/clients', clientsRouter)
