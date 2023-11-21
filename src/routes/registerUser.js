import { Router } from 'express'
import { registerAuth } from '../controllers/authRegister.js'
import { onlyAdmin } from '../controllers/loggedIn.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const registerUserRouter = Router()

registerUserRouter.get('/', onlyAdmin, (req, res) => {
  const registerUserAutorizedHtmlPath = path.join(__dirname, '..', 'views', 'registerUser.html')
  res.sendFile(registerUserAutorizedHtmlPath)
})

registerUserRouter.post('/', onlyAdmin, registerAuth)
