import { Router } from 'express'
import { AGCdbModel } from '../models/mysql/AGCdb.js'
import { onlyLoggedIn } from '../controllers/loggedIn.js'
import { ClientsController } from '../controllers/clients.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const clientsRouter = Router()

const clientsController = new ClientsController({ AGCdbModel })

clientsRouter.get('/', onlyLoggedIn, (req, res) => {
  const clientsHtmlPath = path.join(__dirname, '..', 'views', 'clients.html')
  res.sendFile(clientsHtmlPath)
})

clientsRouter.get('/allClients', clientsController.getAllClients)
clientsRouter.get('/:id', clientsController.getClientById)
clientsRouter.delete('/:id', clientsController.deleteClient)
clientsRouter.post('/', clientsController.createClient)
clientsRouter.patch('/:id', clientsController.updateClient)

// clientsRouter.get('/allClients', onlyLoggedIn, clientsController.getAllClients)
// clientsRouter.get('/:id', onlyLoggedIn, clientsController.getClientById)
// clientsRouter.delete('/:id', onlyLoggedIn, clientsController.deleteClient)
// clientsRouter.post('/', onlyLoggedIn, clientsController.createClient)
// clientsRouter.patch('/:id', onlyLoggedIn, clientsController.updateClient)
