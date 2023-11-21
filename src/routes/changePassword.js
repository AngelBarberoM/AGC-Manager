import { Router } from 'express'
import { changePasswordAuth } from '../controllers/authChangePassword.js'
import { onlyPublicAutorized } from '../controllers/loggedIn.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const changePasswordRouter = Router()

changePasswordRouter.get('/', onlyPublicAutorized, (req, res) => {
  const registerHtmlPath = path.join(__dirname, '..', 'views', 'changePassword.html')
  res.sendFile(registerHtmlPath)
})

changePasswordRouter.patch('/', onlyPublicAutorized, changePasswordAuth)
