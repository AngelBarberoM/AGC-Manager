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

administrativesRouter.get('/allAdministratives', administrativesController.getAllAdministratives)
administrativesRouter.get('/:id', administrativesController.getAdministrativeById)
administrativesRouter.delete('/:id', administrativesController.deleteAdministrative)
administrativesRouter.post('/', administrativesController.createAdministrative)
administrativesRouter.patch('/:id', administrativesController.updateAdministrative)

// administrativesRouter.get('/allAdministratives', onlyLoggedIn, administrativesController.getAllAdministratives)
// administrativesRouter.get('/:id', onlyLoggedIn, administrativesController.getAdministrativeById)
// administrativesRouter.delete('/:id', onlyLoggedIn, administrativesController.deleteAdministrative)
// administrativesRouter.post('/', onlyLoggedIn, administrativesController.createAdministrative)
// administrativesRouter.patch('/:id', onlyLoggedIn, administrativesController.updateAdministrative)
