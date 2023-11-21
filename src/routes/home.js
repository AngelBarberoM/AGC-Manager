import { Router } from 'express'
import { onlyLoggedIn } from '../controllers/loggedIn.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const homeRouter = Router()

homeRouter.get('/', onlyLoggedIn, (req, res) => {
  const homeHtmlPath = path.join(__dirname, '..', 'views', 'home.html')

  res.sendFile(homeHtmlPath)
})
