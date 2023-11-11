import { ServicesModel } from '../models/mysql/services.js'
import { validateService, validatePartialService } from '../schemas/AGC.js'
import { ClientsModel } from '../models/mysql/clients.js'

export class ServicesController {
  getAllServices = async (req, res) => {
    const services = await ServicesModel.getAllServices()

    if (!services) {
      return res.status(400).json({ status: 'Error', message: 'No existen servicios para mostrar' })
    }
    res.json(services)
  }

  getServiceById = async (req, res) => {
    const { id } = req.params

    const services = await ServicesModel.getServiceById({ id })

    if (!services) {
      return res.status(400).json({ status: 'Error', message: 'No existe servicio para mostrar' })
    }
    res.json(services)
  }

  createService = async (req, res) => {
    const validate = validateService(req.body)

    if (!validate.success) {
      return res.status(400).json({ error: JSON.parse(validate.error.message) })
      // return res.status(400).json({ status: 'Error', message: 'Error Service Schema' })
    }

    const validateClientId = await ClientsModel.getClientById({ id: validate.data.clientId })

    if (!validateClientId) {
      return res.status(400).json({ status: 'Error', message: `El servicio ${validate.data.tipoServicio} no ha sido creado correctamente por que el clientId no es correcto ` })
    }

    const newService = await ServicesModel.createService({ input: validate.data })

    if (newService) {
      return res.status(201).json({ status: 'ok', message: `Service ${newService.tipoServicio} con id ${newService.serviceId} creado correctamente`, redirect: '/services' })
    } else {
      return res.status(400).json({ status: 'Error', message: `El servicio ${validate.data.tipoServicio} no ha sido creado correctamente ` })
    }
  }

  updateService = async (req, res) => {
    const validate = validatePartialService(req.body)

    if (!validate.success) {
      return res.status(400).json({ error: JSON.parse(validate.error.message) })
    }

    const { id } = req.params

    const services = await ServicesModel.getServiceById({ id })

    if (!services) {
      return res.status(400).json({ status: 'Error', message: 'No existe servicio para actualizar' })
    }

    const updatedService = await ServicesModel.updateService({ id, input: validate.data })

    if (!updatedService) {
      return res.status(400).json({ status: 'Error', message: 'No se ha podido actualizar' })
    }

    return res.json(updatedService)
  }

  deleteService = async (req, res) => {
    const { id } = req.params

    const deletedService = await ServicesModel.deleteService({ id })

    if (deletedService === false) {
      return res.status(404).json({ status: 'Error', message: 'Service not found' })
    }

    return res.json({ message: 'Service deleted' })
  }
}
