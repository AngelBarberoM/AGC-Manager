import { Router } from 'express'
import { ContractsModel } from '../models/mysql/contracts.js'
import { onlyLoggedIn } from '../controllers/loggedIn.js'
import { ContractsController } from '../controllers/contracts.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const contractsRouter = Router()

const contractsController = new ContractsController({ ContractsModel })

contractsRouter.get('/', onlyLoggedIn, (req, res) => {
  const contractsHtmlPath = path.join(__dirname, '..', 'views', 'contracts.html')
  res.sendFile(contractsHtmlPath)
})

contractsRouter.get('/allContracts', onlyLoggedIn, contractsController.getAllContracts)
contractsRouter.get('/:id', onlyLoggedIn, contractsController.getContractById)
contractsRouter.delete('/:id', onlyLoggedIn, contractsController.deleteContract)
contractsRouter.post('/', onlyLoggedIn, contractsController.createContract)
contractsRouter.patch('/:id', onlyLoggedIn, contractsController.updateContract)
