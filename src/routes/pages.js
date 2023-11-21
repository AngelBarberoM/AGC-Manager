import { Router } from 'express'

import { loginRouter } from './login.js'
import { homeRouter } from './home.js'
import { adminRouter } from './admin.js'
import { registerUserRouter } from './registerUser.js'

import { changePasswordRouter } from './changePassword.js'

import { usersRouter } from './users.js'
import { clientsRouter } from './clients.js'
import { servicesRouter } from './services.js'
import { administrativesRouter } from './administratives.js'
import { driversRouter } from './drivers.js'
import { busRouter } from './bus.js'
import { contractsRouter } from './contracts.js'

import { isLoggedOut } from '../controllers/loggedout.js'
import { onlyPublic, loggedOut } from '../controllers/loggedIn.js'

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
pagesRouter.use('/home', homeRouter)

// Admin Page
pagesRouter.use('/admin', adminRouter)

// Admin Register User Page
pagesRouter.use('/registerUser', registerUserRouter)

// Change Password Page
pagesRouter.use('/changePassword', changePasswordRouter)

// Login Page
pagesRouter.use('/login', loginRouter)

// LogOut
pagesRouter.use('/logout', loggedOut, isLoggedOut)

// Users Page
pagesRouter.use('/users', usersRouter)

// Clients Page
pagesRouter.use('/clients', clientsRouter)

// Services Page
pagesRouter.use('/services', servicesRouter)

// Administratives Page
pagesRouter.use('/administratives', administrativesRouter)

// Drivers Page
pagesRouter.use('/drivers', driversRouter)

// Bus Page
pagesRouter.use('/bus', busRouter)

// Contracts Page
pagesRouter.use('/contracts', contractsRouter)
