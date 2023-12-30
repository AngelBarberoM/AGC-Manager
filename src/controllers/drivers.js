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

  getDriverByDNI = async (req, res) => {
    const { dni } = req.params

    const drivers = await DriversModel.getDriverByDNI({ dni })

    if (!drivers) {
      return res.status(400).json({ status: 'Error', message: 'No existe conductor para mostrar' })
    }
    res.json(drivers)
  }

  getDriverByEmail = async (req, res) => {
    const { email } = req.params

    const drivers = await DriversModel.getDriverByEmail({ email })

    if (!drivers) {
      return res.status(400).json({ status: 'Error', message: 'No existe conductor para mostrar' })
    }
    res.json(drivers)
  }

  getDriverByTelefono = async (req, res) => {
    const { telefono } = req.params

    const drivers = await DriversModel.getDriverByTelefono({ telefono })

    if (!drivers) {
      return res.status(400).json({ status: 'Error', message: 'No existe conductor para mostrar' })
    }
    res.json(drivers)
  }

  createDriver = async (req, res) => {
    if (!req.body.contractId) {
      req.body.contractId = 'NULL'
    }

    const validate = validateDriver(req.body)

    if (!validate.success) {
      return res.status(400).json({ status: 'Error', error: JSON.parse(validate.error.message), message: 'No se ha podido crear el conductor' })
    }

    // Comprobamos si existe conductor por DNI, email y telefono
    const existeConductorDNI = await DriversModel.getDriverByDNI({ dni: validate.data.dni })

    if (existeConductorDNI) {
      return res.status(400).json({ status: 'Error', message: 'Este conductor ya exisite' })
    }

    const existeConductorEmail = await DriversModel.getDriverByEmail({ email: validate.data.email })

    if (existeConductorEmail) {
      return res.status(400).json({ status: 'Error', message: 'Este conductor ya exisite' })
    }

    const existeConductorTelefono = await DriversModel.getDriverByTelefono({ telefono: validate.data.telefono })

    if (existeConductorTelefono) {
      return res.status(400).json({ status: 'Error', message: 'Este conductor ya exisite' })
    }

    // Comprobamos que cuando creamos un conductor sin contrato no pete

    if (validate.data.contractId !== 'NULL') {
      const validateContractId = await ContractsModel.getContractById({ id: validate.data.contractId })

      if (!validateContractId) {
        return res.status(400).json({ status: 'Error', message: `El conductor ${validate.data.nombre} no ha sido creado correctamente por que el contractId no es correcto ` })
      }
    }
    const newDriver = await DriversModel.createDriver({ input: validate.data })

    if (newDriver === 1) {
      return res.status(400).json({ status: 'Error', message: `El conductor ${validate.data.nombre} no ha sido creado correctamente por que el contrato ya está en uso` })
    } else if (newDriver) {
      return res.status(201).json({ status: 'ok', message: `Driver ${newDriver.nombre} con id ${newDriver.employeeId} creado correctamente`, redirect: '/drivers' })
    } else {
      return res.status(400).json({ status: 'Error', message: `El conductor ${validate.data.nombre} no ha sido creado correctamente ` })
    }
  }

  updateDriver = async (req, res) => {
    const validate = validatePartialDriver(req.body)

    if (!validate.success) {
      return res.status(400).json({ status: 'Error', error: JSON.parse(validate.error.message), message: 'No se ha podido actualizar' })
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

    return res.json({ status: 'ok', message: 'Conductor actualizado', usuario: updatedDriver })
  }

  deleteDriver = async (req, res) => {
    const { id } = req.params

    const drivers = await DriversModel.getDriverById({ id })

    if (!drivers) {
      return res.status(400).json({ status: 'Error', message: 'No existe conductor para eliminar' })
    }

    const deletedDriver = await DriversModel.deleteDriver({ id })

    if (deletedDriver === false) {
      return res.status(404).json({ status: 'Error', message: 'Driver not found' })
    }

    return res.json({ status: 'ok', message: 'Driver deleted' })
  }
}
