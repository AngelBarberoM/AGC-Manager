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
      return res.status(400).json({ error: JSON.parse(validate.error.message) })
      // return res.status(400).json({ status: 'Error', message: 'Error Contract Schema' })
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
      return res.status(400).json({ error: JSON.parse(validate.error.message) })
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

    return res.json(updatedContract)
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
