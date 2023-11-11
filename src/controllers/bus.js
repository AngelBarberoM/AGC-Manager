import { BusModel } from '../models/mysql/bus.js'
import { validateBus, validatePartialBus } from '../schemas/AGC.js'
import { DriversModel } from '../models/mysql/drivers.js'

export class BusController {
  getAllBus = async (req, res) => {
    const bus = await BusModel.getAllBus()

    if (!bus) {
      return res.status(400).json({ status: 'Error', message: 'No existen autobuss para mostrar' })
    }
    res.json(bus)
  }

  getBusById = async (req, res) => {
    const { id } = req.params

    const bus = await BusModel.getBusById({ id })

    if (!bus) {
      return res.status(400).json({ status: 'Error', message: 'No existe autobus para mostrar' })
    }
    res.json(bus)
  }

  createBus = async (req, res) => {
    const validate = validateBus(req.body)

    if (!validate.success) {
      return res.status(400).json({ error: JSON.parse(validate.error.message) })
      // return res.status(400).json({ status: 'Error', message: 'Error Bus Schema' })
    }

    const validateEmployeeId = await DriversModel.getDriverById({ id: validate.data.employeeId })

    if (!validateEmployeeId) {
      return res.status(400).json({ status: 'Error', message: `El autobus ${validate.data.matricula} no ha sido creado correctamente por que el employeeId no es correcto ` })
    }

    const newBus = await BusModel.createBus({ input: validate.data })

    if (newBus) {
      return res.status(201).json({ status: 'ok', message: `Bus ${newBus.matricula} con id ${newBus.busId} creado correctamente`, redirect: '/bus' })
    } else {
      return res.status(400).json({ status: 'Error', message: `El autobus ${validate.data.matricula} no ha sido creado correctamente ` })
    }
  }

  updateBus = async (req, res) => {
    const validate = validatePartialBus(req.body)

    if (!validate.success) {
      return res.status(400).json({ error: JSON.parse(validate.error.message) })
    }

    const { id } = req.params

    const bus = await BusModel.getBusById({ id })

    if (!bus) {
      return res.status(400).json({ status: 'Error', message: 'No existe autobus para actualizar' })
    }

    const updatedBus = await BusModel.updateBus({ id, input: validate.data })

    if (!updatedBus) {
      return res.status(400).json({ status: 'Error', message: 'No se ha podido actualizar' })
    }

    return res.json(updatedBus)
  }

  deleteBus = async (req, res) => {
    const { id } = req.params

    const deletedBus = await BusModel.deleteBus({ id })

    if (deletedBus === false) {
      return res.status(404).json({ status: 'Error', message: 'Bus not found' })
    }

    return res.json({ message: 'Bus deleted' })
  }
}
