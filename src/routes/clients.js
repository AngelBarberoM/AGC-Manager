import { Router } from 'express'
import { ClientsModel } from '../models/mysql/clients.js'
import { onlyLoggedIn } from '../controllers/loggedIn.js'
import { ClientsController } from '../controllers/clients.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const clientsRouter = Router()

const clientsController = new ClientsController({ ClientsModel })

clientsRouter.get('/', onlyLoggedIn, (req, res) => {
  const clientsHtmlPath = path.join(__dirname, '..', 'views', 'clients.html')
  res.sendFile(clientsHtmlPath)
})

clientsRouter.get('/allClients', onlyLoggedIn, clientsController.getAllClients)
clientsRouter.get('/:id', onlyLoggedIn, clientsController.getClientById)
clientsRouter.delete('/:id', onlyLoggedIn, clientsController.deleteClient)
clientsRouter.post('/', onlyLoggedIn, clientsController.createClient)
clientsRouter.patch('/:id', onlyLoggedIn, clientsController.updateClient)
