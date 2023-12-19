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
    if (!req.body.clientId) {
      req.body.clientId = 'NULL'
    }

    const validate = validateService(req.body)

    if (!validate.success) {
      return res.status(400).json({ status: 'Error', error: JSON.parse(validate.error.message), message: 'No se ha podido actualizar' })
    }

    if (validate.data.clientId !== 'NULL') {
      const validateClientId = await ClientsModel.getClientById({ id: validate.data.clientId })

      if (!validateClientId) {
        return res.status(400).json({ status: 'Error', message: `El servicio ${validate.data.tipoServicio} no ha sido creado correctamente por que el clientId no es correcto ` })
      }
    }
    const newService = await ServicesModel.createService({ input: validate.data })

    if (newService) {
      return res.status(201).json({ status: 'ok', message: `Service ${newService.tipoServicio} con id ${newService.serviceId} creado correctamente`, redirect: '/services' })
    } else {
      return res.status(400).json({ status: 'Error', message: `El servicio ${validate.data.tipoServicio} no ha sido creado correctamente ` })
    }
  }

  updateService = async (req, res) => {
    // controlamos las fechas de los servicios
    if (req.body.fechaServicio) {
      const { id } = req.params
      const provisionalService = await ServicesModel.getServiceById({ id })

      // FECHA ACTUAL
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const formattedDate = `${year}-${month}-${day}`

      if (req.body.fechaServicio <= formattedDate) {
        return res.status(400).json({ status: 'Error', message: 'No se puede poner una fecha de servicio anterior a la fecha actual' })
      }

      if (provisionalService.fechaServicio <= formattedDate) {
        return res.status(400).json({ status: 'Error', message: 'La fecha de un servicio que ya ha pasado no se puede cambiar' })
      }
    }

    const validate = validatePartialService(req.body)

    if (!validate.success) {
      return res.status(400).json({ status: 'Error', error: JSON.parse(validate.error.message), message: 'No se ha podido actualizar' })
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

    return res.json({ status: 'ok', message: 'Conductor actualizado', usuario: updatedService })
  }

  deleteService = async (req, res) => {
    const { id } = req.params

    const services = await ServicesModel.getServiceById({ id })

    if (!services) {
      return res.status(400).json({ status: 'Error', message: 'No existe servicio para eliminar' })
    }

    const deletedService = await ServicesModel.deleteService({ id })

    if (deletedService === false) {
      return res.status(404).json({ status: 'Error', message: 'Service not found' })
    }

    return res.json({ status: 'ok', message: 'Service deleted' })
  }
}
