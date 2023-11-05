import { Router } from 'express'
import { loginAuth } from '../controllers/authLogin.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const loginRouter = Router()

loginRouter.get('/', (req, res) => {
  const loginHtmlPath = path.join(__dirname, '..', 'views', 'login.html')
  res.sendFile(loginHtmlPath)
})

loginRouter.post('/', loginAuth)
