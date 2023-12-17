import { Router } from 'express'
import { BusModel } from '../models/mysql/bus.js'
import { onlyLoggedIn } from '../controllers/loggedIn.js'
import { BusController } from '../controllers/bus.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const busRouter = Router()

const busController = new BusController({ BusModel })

busRouter.get('/', onlyLoggedIn, (req, res) => {
  const busHtmlPath = path.join(__dirname, '..', 'views', 'bus.html')
  res.sendFile(busHtmlPath)
})

busRouter.get('/allBus', onlyLoggedIn, busController.getAllBus)

busRouter.get('/:id', onlyLoggedIn, (req, res) => {
  const busHtmlPath = path.join(__dirname, '..', 'views', 'busSingular.html')
  res.sendFile(busHtmlPath)
})

busRouter.get('/details/:id', onlyLoggedIn, busController.getBusById)

busRouter.delete('/:id', onlyLoggedIn, busController.deleteBus)
busRouter.post('/', onlyLoggedIn, busController.createBus)
busRouter.patch('/:id', onlyLoggedIn, busController.updateBus)
