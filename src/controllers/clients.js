// import { AGCdbModel } from '../models/mysql/AGCdb.js'
import { ClientsModel } from '../models/mysql/clients.js'
import { validateClient, validatePartialClient } from '../schemas/AGC.js'

export class ClientsController {
  getAllClients = async (req, res) => {
    const clients = await ClientsModel.getAllClients()

    if (!clients) {
      return res.status(400).json({ status: 'Error', message: 'No existen clientes para mostrar' })
    }
    res.json(clients)
  }

  getClientById = async (req, res) => {
    const { id } = req.params

    const clients = await ClientsModel.getClientById({ id })

    if (!clients) {
      return res.status(400).json({ status: 'Error', message: 'No existe cliente para mostrar' })
    }
    res.json(clients)
  }

  getClientByDNI = async (req, res) => {
    const { dni } = req.params

    const clients = await ClientsModel.getClientByDNI({ dni })

    if (!clients) {
      return res.status(400).json({ status: 'Error', message: 'No existe cliente para mostrar' })
    }
    res.json(clients)
  }

  getClientByEmail = async (req, res) => {
    const { email } = req.params

    const clients = await ClientsModel.getClientByEmail({ email })

    if (!clients) {
      return res.status(400).json({ status: 'Error', message: 'No existe cliente para mostrar' })
    }
    res.json(clients)
  }

  getClientByTelefono = async (req, res) => {
    const { telefono } = req.params

    const clients = await ClientsModel.getClientByTelefono({ telefono })

    if (!clients) {
      return res.status(400).json({ status: 'Error', message: 'No existe cliente para mostrar' })
    }
    res.json(clients)
  }

  createClient = async (req, res) => {
    const validate = validateClient(req.body)

    if (!validate.success) {
      return res.status(400).json({ status: 'Error', error: JSON.parse(validate.error.message), message: 'No se ha podido crear el cliente' })
    }

    // Comprobamos si existe cliente por DNI, email y telefono
    const existeClienteDNI = await ClientsModel.getClientByDNI({ dni: validate.data.dni })

    if (existeClienteDNI) {
      return res.status(400).json({ status: 'Error', message: 'Este cliente ya existe' })
    }

    const existeClienteEmail = await ClientsModel.getClientByEmail({ email: validate.data.email })

    if (existeClienteEmail) {
      return res.status(400).json({ status: 'Error', message: 'Este cliente ya existe' })
    }

    const existeClienteTelefono = await ClientsModel.getClientByTelefono({ telefono: validate.data.telefono })

    if (existeClienteTelefono) {
      return res.status(400).json({ status: 'Error', message: 'Este cliente ya existe' })
    }

    const newClient = await ClientsModel.createClient({ input: validate.data })

    if (newClient) {
      return res.status(201).json({ status: 'ok', message: `Cliente ${newClient.nombre} con id ${newClient.clientId} creado correctamente`, redirect: '/clients' })
    } else {
      return res.status(400).json({ status: 'Error', message: `El cliente ${validate.data.nombre} no ha sido creado correctamente ` })
    }
  }

  updateClient = async (req, res) => {
    const validate = validatePartialClient(req.body)

    if (!validate.success) {
      return res.status(400).json({ status: 'Error', error: JSON.parse(validate.error.message), message: 'No se ha podido actualizar el cliente' })
    }

    const { id } = req.params

    const clients = await ClientsModel.getClientById({ id })

    if (!clients) {
      return res.status(400).json({ status: 'Error', message: 'No existe cliente para actualizar' })
    }

    const updatedClient = await ClientsModel.updateClient({ id, input: validate.data })

    if (!updatedClient) {
      return res.status(400).json({ status: 'Error', message: 'No se ha podido actualizar' })
    }

    return res.json({ status: 'ok', message: 'Cliente actualizado', usuario: updatedClient })
  }

  deleteClient = async (req, res) => {
    const { id } = req.params

    const clients = await ClientsModel.getClientById({ id })

    if (!clients) {
      return res.status(400).json({ status: 'Error', message: 'No existe cliente para eliminar' })
    }

    const deletedClient = await ClientsModel.deleteClient({ id })

    if (deletedClient === false) {
      return res.status(404).json({ status: 'Error', message: 'Client not found' })
    }

    return res.json({ status: 'ok', message: 'Cliente eliminado' })
  }
}
