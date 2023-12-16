import { Router } from 'express'
import { DriversModel } from '../models/mysql/drivers.js'
import { onlyLoggedIn } from '../controllers/loggedIn.js'
import { DriversController } from '../controllers/drivers.js'

import { AdministrativesModel } from '../models/mysql/administratives.js'
import { AdministrativesController } from '../controllers/administratives.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const employeesRouter = Router()

const driversController = new DriversController({ DriversModel })
const administrativesController = new AdministrativesController({ AdministrativesModel })

employeesRouter.get('/', onlyLoggedIn, (req, res) => {
  const driversHtmlPath = path.join(__dirname, '..', 'views', 'employees.html')
  res.sendFile(driversHtmlPath)
})

employeesRouter.get('/allAdministratives', onlyLoggedIn, administrativesController.getAllAdministratives)
employeesRouter.get('/allDrivers', onlyLoggedIn, driversController.getAllDrivers)
