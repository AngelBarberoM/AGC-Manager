import { Router } from 'express'
import { registerRouter } from './register.js'
import { loginRouter } from './login.js'
import { onlyLoggedIn } from '../controllers/loggedIn.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const pagesRouter = Router()

pagesRouter.get('/', onlyLoggedIn, (req, res) => {
  const homeHtmlPath = path.join(__dirname, '..', 'views', 'home.html')
  res.sendFile(homeHtmlPath)
})

pagesRouter.use('/login', loginRouter)
pagesRouter.use('/register', registerRouter)
