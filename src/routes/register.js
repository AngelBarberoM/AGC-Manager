import { Router } from 'express'
import { registerAuth } from '../controllers/authRegister.js'
import { onlyPublic } from '../controllers/loggedIn.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const registerRouter = Router()

registerRouter.get('/', onlyPublic, (req, res) => {
  const registerHtmlPath = path.join(__dirname, '..', 'views', 'register.html')
  res.sendFile(registerHtmlPath)
})

registerRouter.post('/', registerAuth)
