import { Router } from 'express'
import { registerRouter } from './register.js'
import { loginRouter } from './login.js'
import { homeRouter } from './home.js'
import { isLoggedOut } from '../controllers/loggedout.js'
import { onlyPublic } from '../controllers/loggedIn.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const pagesRouter = Router()

// Página Inicial
pagesRouter.get('/', onlyPublic, (req, res) => {
  const mainHtmlPath = path.join(__dirname, '..', 'views', 'main.html')
  res.sendFile(mainHtmlPath)
})

// Página principal
pagesRouter.get('/home', homeRouter)

// Página login
pagesRouter.use('/login', loginRouter)

// Página registro
pagesRouter.use('/register', registerRouter)

// Función cerrar sesión
pagesRouter.use('/logout', isLoggedOut)
