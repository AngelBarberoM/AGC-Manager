import { Router } from 'express'
import { AdministrativesModel } from '../models/mysql/administratives.js'
import { onlyLoggedIn } from '../controllers/loggedIn.js'
import { AdministrativesController } from '../controllers/administratives.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const administrativesRouter = Router()

const administrativesController = new AdministrativesController({ AdministrativesModel })

administrativesRouter.get('/', onlyLoggedIn, (req, res) => {
  const administrativesHtmlPath = path.join(__dirname, '..', 'views', 'administratives.html')
  res.sendFile(administrativesHtmlPath)
})

administrativesRouter.get('/allAdministratives', onlyLoggedIn, administrativesController.getAllAdministratives)

administrativesRouter.get('/create', onlyLoggedIn, (req, res) => {
  const administrativesHtmlPath = path.join(__dirname, '..', 'views', 'createAdministrative.html')
  res.sendFile(administrativesHtmlPath)
})

administrativesRouter.get('/:id', onlyLoggedIn, (req, res) => {
  const administrativesHtmlPath = path.join(__dirname, '..', 'views', 'administrative.html')
  res.sendFile(administrativesHtmlPath)
})
administrativesRouter.get('/details/:id', onlyLoggedIn, administrativesController.getAdministrativeById)

administrativesRouter.delete('/:id', onlyLoggedIn, administrativesController.deleteAdministrative)

administrativesRouter.post('/', onlyLoggedIn, administrativesController.createAdministrative)

administrativesRouter.patch('/:id', onlyLoggedIn, administrativesController.updateAdministrative)
