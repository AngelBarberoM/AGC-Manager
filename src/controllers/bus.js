import { BusModel } from '../models/mysql/bus.js'
import { validateBus, validatePartialBus } from '../schemas/AGC.js'
import { DriversModel } from '../models/mysql/drivers.js'

export class BusController {
  getAllBus = async (req, res) => {
    const bus = await BusModel.getAllBus()

    if (!bus) {
      return res.status(400).json({ status: 'Error', message: 'No existen autobúss para mostrar' })
    }
    res.json(bus)
  }

  getBusById = async (req, res) => {
    const { id } = req.params

    const bus = await BusModel.getBusById({ id })

    if (!bus) {
      return res.status(400).json({ status: 'Error', message: 'No existe autobús para mostrar' })
    }
    res.json(bus)
  }

  getBusByMatricula = async (req, res) => {
    const { matricula } = req.params

    const bus = await BusModel.getBusById({ matricula })

    if (!bus) {
      return res.status(400).json({ status: 'Error', message: 'No existe autobús para mostrar' })
    }
    res.json(bus)
  }

  createBus = async (req, res) => {
    if (!req.body.employeeId) {
      req.body.employeeId = 'NULL'
    }

    const validate = validateBus(req.body)

    if (!validate.success) {
      return res.status(400).json({ status: 'Error', error: JSON.parse(validate.error.message), message: 'No se ha podido crear el autobús' })
    }

    const existeBusMatricula = await BusModel.getBusByMatricula({ matricula: validate.data.matricula })

    if (existeBusMatricula) {
      return res.status(400).json({ status: 'Error', message: 'Este autobús ya exisite' })
    }

    // Comprobamos que si se le pasa un uuid no correcto por el formato salte el error
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

    if (validate.data.employeeId !== 'NULL' && !uuidRegex.test(validate.data.employeeId)) {
      return res.status(400).json({ status: 'Error', message: 'El employeeId no es un UUID válido' })
    }

    if (validate.data.employeeId !== 'NULL') {
      const validateEmployeeId = await DriversModel.getDriverById({ id: validate.data.employeeId })

      if (!validateEmployeeId) {
        return res.status(400).json({ status: 'Error', message: `El autobús ${validate.data.matricula} no ha sido creado correctamente por que el employeeId no es correcto ` })
      }
    }
    const newBus = await BusModel.createBus({ input: validate.data })

    if (newBus) {
      return res.status(201).json({ status: 'ok', message: `Bus ${newBus.matricula} con id ${newBus.busId} creado correctamente`, redirect: '/bus' })
    } else {
      return res.status(400).json({ status: 'Error', message: `El autobús ${validate.data.matricula} no ha sido creado correctamente ` })
    }
  }

  updateBus = async (req, res) => {
    const validate = validatePartialBus(req.body)

    if (!validate.success) {
      return res.status(400).json({ status: 'Error', error: JSON.parse(validate.error.message), message: 'No se ha podido actualizar' })
    }

    const { id } = req.params

    const bus = await BusModel.getBusById({ id })

    if (!bus) {
      return res.status(400).json({ status: 'Error', message: 'No existe autobús para actualizar' })
    }

    const updatedBus = await BusModel.updateBus({ id, input: validate.data })

    if (!updatedBus) {
      return res.status(400).json({ status: 'Error', message: 'No se ha podido actualizar' })
    }

    return res.json({ status: 'ok', message: 'Autobús actualizado', usuario: updatedBus })
  }

  deleteBus = async (req, res) => {
    const { id } = req.params

    const bus = await BusModel.getBusById({ id })

    if (!bus) {
      return res.status(400).json({ status: 'Error', message: 'No existe autobús para eliminar' })
    }

    const deletedBus = await BusModel.deleteBus({ id })

    if (deletedBus === false) {
      return res.status(404).json({ status: 'Error', message: 'Bus not found' })
    }

    return res.json({ status: 'ok', message: 'Bus deleted' })
  }
}
