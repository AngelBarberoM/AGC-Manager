import { ContractsModel } from '../models/mysql/contracts.js'
import { validateContract, validatePartialContract } from '../schemas/AGC.js'

export class ContractsController {
  getAllContracts = async (req, res) => {
    const contracts = await ContractsModel.getAllContracts()

    if (!contracts) {
      return res.status(400).json({ status: 'Error', message: 'No existen contratos para mostrar' })
    }
    res.json(contracts)
  }

  getContractById = async (req, res) => {
    const { id } = req.params

    const contracts = await ContractsModel.getContractById({ id })

    if (!contracts) {
      return res.status(400).json({ status: 'Error', message: 'No existe contrato para mostrar' })
    }
    res.json(contracts)
  }

  createContract = async (req, res) => {
    const validate = validateContract(req.body)

    if (!validate.success) {
      return res.status(400).json({ status: 'Error', error: JSON.parse(validate.error.message), message: 'No se ha podido crear el contrato' })
    }

    if (validate.data.fechaInicio > validate.data.fechaFin) {
      return res.status(400).json({ status: 'Error', message: 'La fecha de inicio de contrato no puede ser mayor que la fecha fin' })
    }

    if (validate.data.horasSemana !== 40 && validate.data.horasSemana !== 20) {
      return res.status(400).json({ status: 'Error', message: 'Solo se pueden crear contratos con 20 o 40 horas' })
    }

    const newContract = await ContractsModel.createContract({ input: validate.data })

    if (newContract) {
      return res.status(201).json({ status: 'ok', message: `Contract ${newContract.contractId} creado correctamente`, redirect: '/contracts' })
    } else {
      return res.status(400).json({ status: 'Error', message: 'El contrato no ha sido creado correctamente ' })
    }
  }

  updateContract = async (req, res) => {
    const validate = validatePartialContract(req.body)

    if (!validate.success) {
      return res.status(400).json({ status: 'Error', error: JSON.parse(validate.error.message), message: 'No se ha podido actualizar' })
    }

    const { id } = req.params

    const contracts = await ContractsModel.getContractById({ id })

    if (!contracts) {
      return res.status(400).json({ status: 'Error', message: 'No existe contrato para actualizar' })
    }

    const updatedContract = await ContractsModel.updateContract({ id, input: validate.data })

    if (!updatedContract) {
      return res.status(400).json({ status: 'Error', message: 'No se ha podido actualizar' })
    }

    return res.json({ status: 'ok', message: 'Contrato actualizado', usuario: updatedContract })
  }

  deleteContract = async (req, res) => {
    const { id } = req.params

    const contracts = await ContractsModel.getContractById({ id })

    if (!contracts) {
      return res.status(400).json({ status: 'Error', message: 'No existe contrato para eliminar' })
    }

    const deletedContract = await ContractsModel.deleteContract({ id })

    if (deletedContract === false) {
      return res.status(404).json({ status: 'Error', message: 'Contract not found' })
    }

    return res.json({ status: 'ok', message: 'Contract deleted' })
  }
}
