import { Router } from 'express'
// import { RegisterController } from '../controllers/register.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const loginRouter = Router()

loginRouter.get('/', (req, res) => {
  const loginHtmlPath = path.join(__dirname, '..', 'views', 'login.html')
  res.sendFile(loginHtmlPath)
})

loginRouter.post('/', (req, res) => {
  console.log(req.body)
  res.send('recived')
})
