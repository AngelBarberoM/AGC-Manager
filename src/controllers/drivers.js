import { DriversModel } from '../models/mysql/drivers.js'
import { validateDriver, validatePartialDriver } from '../schemas/AGC.js'
import { ContractsModel } from '../models/mysql/contracts.js'

export class DriversController {
  getAllDrivers = async (req, res) => {
    const drivers = await DriversModel.getAllDrivers()

    if (!drivers) {
      return res.status(400).json({ status: 'Error', message: 'No existen conductors para mostrar' })
    }
    res.json(drivers)
  }

  getDriverById = async (req, res) => {
    const { id } = req.params

    const drivers = await DriversModel.getDriverById({ id })

    if (!drivers) {
      return res.status(400).json({ status: 'Error', message: 'No existe conductor para mostrar' })
    }
    res.json(drivers)
  }

  createDriver = async (req, res) => {
    const validate = validateDriver(req.body)

    if (!validate.success) {
      return res.status(400).json({ error: JSON.parse(validate.error.message) })
      // return res.status(400).json({ status: 'Error', message: 'Error Driver Schema' })
    }

    const validateContractId = await ContractsModel.getContractById({ id: validate.data.contractId })

    if (!validateContractId) {
      return res.status(400).json({ status: 'Error', message: `El conductor ${validate.data.nombre} no ha sido creado correctamente por que el contractId no es correcto ` })
    }

    const newDriver = await DriversModel.createDriver({ input: validate.data })

    if (newDriver) {
      return res.status(201).json({ status: 'ok', message: `Driver ${newDriver.nombre} con id ${newDriver.employeeId} creado correctamente`, redirect: '/drivers' })
    } else {
      return res.status(400).json({ status: 'Error', message: `El conductor ${validate.data.nombre} no ha sido creado correctamente ` })
    }
  }

  updateDriver = async (req, res) => {
    const validate = validatePartialDriver(req.body)

    if (!validate.success) {
      return res.status(400).json({ error: JSON.parse(validate.error.message) })
    }

    const { id } = req.params

    const drivers = await DriversModel.getDriverById({ id })

    if (!drivers) {
      return res.status(400).json({ status: 'Error', message: 'No existe conductor para actualizar' })
    }

    const updatedDriver = await DriversModel.updateDriver({ id, input: validate.data })

    if (!updatedDriver) {
      return res.status(400).json({ status: 'Error', message: 'No se ha podido actualizar' })
    }

    return res.json(updatedDriver)
  }

  deleteDriver = async (req, res) => {
    const { id } = req.params

    const deletedDriver = await DriversModel.deleteDriver({ id })

    if (deletedDriver === false) {
      return res.status(404).json({ status: 'Error', message: 'Driver not found' })
    }

    return res.json({ message: 'Driver deleted' })
  }
}
