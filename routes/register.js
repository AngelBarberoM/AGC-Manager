import { Router } from 'express'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const registerRouter = Router()

registerRouter.get('/', (req, res) => {
  const registerHtmlPath = path.join(__dirname, '..', 'views', 'register.html')
  res.sendFile(registerHtmlPath)
})
