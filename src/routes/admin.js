import { Router } from 'express'
import { onlyAdmin } from '../controllers/loggedIn.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const adminRouter = Router()

adminRouter.get('/', onlyAdmin, (req, res) => {
  const adminHtmlPath = path.join(__dirname, '..', 'views', 'admin.html')
  res.sendFile(adminHtmlPath)
})
