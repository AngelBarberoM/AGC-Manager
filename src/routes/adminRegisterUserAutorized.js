import { Router } from 'express'
import { registerAuth } from '../controllers/authRegister.js'
import { onlyAdmin } from '../controllers/loggedIn.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const registerUserAutorizedRouter = Router()

registerUserAutorizedRouter.get('/registerUserAutorized', onlyAdmin, (req, res) => {
  const registerUserAutorizedHtmlPath = path.join(__dirname, '..', 'views', 'registerUserAutorized.html')
  res.sendFile(registerUserAutorizedHtmlPath)
})

registerUserAutorizedRouter.post('/', registerAuth)
