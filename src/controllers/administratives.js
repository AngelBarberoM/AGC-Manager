import { AdministrativesModel } from '../models/mysql/administratives.js'
import { validateAdministrative, validatePartialAdministrative } from '../schemas/AGC.js'
import { ContractsModel } from '../models/mysql/contracts.js'

export class AdministrativesController {
  getAllAdministratives = async (req, res) => {
    const administratives = await AdministrativesModel.getAllAdministratives()

    if (!administratives) {
      return res.status(400).json({ status: 'Error', message: 'No existen administrativos para mostrar' })
    }
    res.json(administratives)
  }

  getAdministrativeById = async (req, res) => {
    const { id } = req.params

    const administratives = await AdministrativesModel.getAdministrativeById({ id })

    if (!administratives) {
      return res.status(400).json({ status: 'Error', message: 'No existe administrativo para mostrar' })
    }
    res.json(administratives)
  }

  createAdministrative = async (req, res) => {
    const validate = validateAdministrative(req.body)

    if (!validate.success) {
      return res.status(400).json({ error: JSON.parse(validate.error.message) })
      // return res.status(400).json({ status: 'Error', message: 'Error Administrative Schema' })
    }

    const validateContractId = await ContractsModel.getContractById({ id: validate.data.contractId })

    if (!validateContractId) {
      return res.status(400).json({ status: 'Error', message: `El administrativo ${validate.data.nombre} no ha sido creado correctamente por que el contractId no es correcto ` })
    }

    const newAdministrative = await AdministrativesModel.createAdministrative({ input: validate.data })

    if (newAdministrative) {
      return res.status(201).json({ status: 'ok', message: `Administrative ${newAdministrative.nombre} con id ${newAdministrative.employeeId} creado correctamente`, redirect: '/administratives' })
    } else {
      return res.status(400).json({ status: 'Error', message: `El administrativo ${validate.data.nombre} no ha sido creado correctamente ` })
    }
  }

  updateAdministrative = async (req, res) => {
    const validate = validatePartialAdministrative(req.body)

    if (!validate.success) {
      return res.status(400).json({ error: JSON.parse(validate.error.message) })
    }

    const { id } = req.params

    const administratives = await AdministrativesModel.getAdministrativeById({ id })

    if (!administratives) {
      return res.status(400).json({ status: 'Error', message: 'No existe administrativo para actualizar' })
    }

    const updatedAdministrative = await AdministrativesModel.updateAdministrative({ id, input: validate.data })

    if (!updatedAdministrative) {
      return res.status(400).json({ status: 'Error', message: 'No se ha podido actualizar' })
    }

    return res.json(updatedAdministrative)
  }

  deleteAdministrative = async (req, res) => {
    const { id } = req.params

    const deletedAdministrative = await AdministrativesModel.deleteAdministrative({ id })

    if (deletedAdministrative === false) {
      return res.status(404).json({ status: 'Error', message: 'Administrative not found' })
    }

    return res.json({ message: 'Administrative deleted' })
  }
}
