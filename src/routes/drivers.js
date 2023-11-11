import { Router } from 'express'
import { DriversModel } from '../models/mysql/drivers.js'
import { onlyLoggedIn } from '../controllers/loggedIn.js'
import { DriversController } from '../controllers/drivers.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const driversRouter = Router()

const driversController = new DriversController({ DriversModel })

driversRouter.get('/', onlyLoggedIn, (req, res) => {
  const driversHtmlPath = path.join(__dirname, '..', 'views', 'drivers.html')
  res.sendFile(driversHtmlPath)
})

driversRouter.get('/allDrivers', driversController.getAllDrivers)
driversRouter.get('/:id', driversController.getDriverById)
driversRouter.delete('/:id', driversController.deleteDriver)
driversRouter.post('/', driversController.createDriver)
driversRouter.patch('/:id', driversController.updateDriver)

// driversRouter.get('/allDrivers', onlyLoggedIn, driversController.getAllDrivers)
// driversRouter.get('/:id', onlyLoggedIn, driversController.getDriverById)
// driversRouter.delete('/:id', onlyLoggedIn, driversController.deleteDriver)
// driversRouter.post('/', onlyLoggedIn, driversController.createDriver)
// driversRouter.patch('/:id', onlyLoggedIn, driversController.updateDriver)
