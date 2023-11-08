import { AGCdbModel } from '../models/mysql/AGCdb.js'
import { validateClient, validatePartialClient } from '../schemas/AGC.js'

export class ClientsController {
  getAllClients = async (req, res) => {
    const clients = await AGCdbModel.getAllClients()

    if (!clients) {
      return res.status(400).send({ status: 'Error', message: 'No existen clientes para mostrar' })
    }
    res.json(clients)
  }

  getClientById = async (req, res) => {
    const { id } = req.params

    const clients = await AGCdbModel.getClientById({ id })

    if (!clients) {
      return res.status(400).send({ status: 'Error', message: 'No existe cliente para mostrar' })
    }
    res.json(clients)
  }

  createClient = async (req, res) => {
    const validate = validateClient(req.body)

    if (!validate.success) {
      return res.status(400).send({ status: 'Error', message: 'Error Client Schema' })
    }

    const newMovie = await AGCdbModel.createClient({ input: validate.data })

    res.status(201).json(newMovie)
  }

  updateClient = async (req, res) => {
    const validate = validatePartialClient(req.body)

    if (!validate.success) {
      return res.status(400).send({ status: 'Error', message: 'Error Client Schema' })
    }

    const { id } = req.params

    const clients = await AGCdbModel.getClientById({ id })

    if (!clients) {
      return res.status(400).send({ status: 'Error', message: 'No existe cliente para actualizar' })
    }

    const updatedClient = await AGCdbModel.updateClient({ id, input: validate.data })

    if (!updatedClient) {
      return res.status(400).send({ status: 'Error', message: 'No se ha podido actualizar' })
    }

    return res.json(updatedClient)
  }

  deleteClient = async (req, res) => {
    const { id } = req.params

    const deletedClient = await AGCdbModel.deleteClient({ id })

    if (!deletedClient.success) {
      return res.status(404).send({ status: 'Error', message: 'Client not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }
}
