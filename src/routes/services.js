import { Router } from 'express'
import { ServicesModel } from '../models/mysql/services.js'
import { onlyLoggedIn } from '../controllers/loggedIn.js'
import { ServicesController } from '../controllers/services.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const servicesRouter = Router()

const servicesController = new ServicesController({ ServicesModel })

servicesRouter.get('/', onlyLoggedIn, (req, res) => {
  const servicesHtmlPath = path.join(__dirname, '..', 'views', 'services.html')
  res.sendFile(servicesHtmlPath)
})

servicesRouter.get('/allServices', onlyLoggedIn, servicesController.getAllServices)

servicesRouter.get('/:id', onlyLoggedIn, (req, res) => {
  const servicesHtmlPath = path.join(__dirname, '..', 'views', 'service.html')
  res.sendFile(servicesHtmlPath)
})

servicesRouter.get('/details/:id', onlyLoggedIn, servicesController.getServiceById)

servicesRouter.delete('/:id', onlyLoggedIn, servicesController.deleteService)
servicesRouter.post('/', onlyLoggedIn, servicesController.createService)
servicesRouter.patch('/:id', onlyLoggedIn, servicesController.updateService)
