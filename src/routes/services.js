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

servicesRouter.get('/allServices', servicesController.getAllServices)
servicesRouter.get('/:id', servicesController.getServiceById)
servicesRouter.delete('/:id', servicesController.deleteService)
servicesRouter.post('/', servicesController.createService)
servicesRouter.patch('/:id', servicesController.updateService)

// servicesRouter.get('/allServices', onlyLoggedIn, servicesController.getAllServices)
// servicesRouter.get('/:id', onlyLoggedIn, servicesController.getServiceById)
// servicesRouter.delete('/:id', onlyLoggedIn, servicesController.deleteService)
// servicesRouter.post('/', onlyLoggedIn, servicesController.createService)
// servicesRouter.patch('/:id', onlyLoggedIn, servicesController.updateService)
