import { Router } from 'express'
import { busModel } from '../models/mysql/bus.js'
import { onlyLoggedIn } from '../controllers/loggedIn.js'
import { BusController } from '../controllers/bus.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const busRouter = Router()

const busController = new BusController({ busModel })

busRouter.get('/', onlyLoggedIn, (req, res) => {
  const busHtmlPath = path.join(__dirname, '..', 'views', 'bus.html')
  res.sendFile(busHtmlPath)
})

busRouter.get('/allBus', busController.getAllBus)
busRouter.get('/:id', busController.getbusById)
busRouter.delete('/:id', busController.deletebus)
busRouter.post('/', busController.createbus)
busRouter.patch('/:id', busController.updatebus)

// busRouter.get('/allBus', onlyLoggedIn, busController.getAllBus)
// busRouter.get('/:id', onlyLoggedIn, busController.getbusById)
// busRouter.delete('/:id', onlyLoggedIn, busController.deletebus)
// busRouter.post('/', onlyLoggedIn, busController.createbus)
// busRouter.patch('/:id', onlyLoggedIn, busController.updatebus)
