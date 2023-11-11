import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'agcdb'
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG
const connection = await mysql.createConnection(connectionString)

export class ContractsModel {
  // CONTRACTS

  static async getNumberContracts () {
    const [contracts] = await connection.query('SELECT COUNT(contractId) as Numero FROM contracts')

    if (contracts[0].Numero !== 0) {
      return contracts[0].Numero
    } else {
      return null
    }
  }

  static async getAllContracts () {
    const [contracts] = await connection.query('SELECT BIN_TO_UUID(contractId) as contractId, fechaInicio, fechaFin, sueldoHora, horasSemana FROM contracts')

    if (contracts.length > 0) {
      return contracts
    } else {
      return null
    }
  }

  static async getContractById ({ id }) {
    const [contracts] = await connection.query(
      `SELECT BIN_TO_UUID(contractId) as contractId, fechaInicio, fechaFin, sueldoHora, horasSemana 
      FROM contracts WHERE contractId = UUID_TO_BIN(?)`, [id]
    )

    if (contracts.length > 0) {
      return contracts[0]
    } else {
      return null
    }
  }

  static async createContract ({ input }) {
    const { fechaInicio, fechaFin, sueldoHora, horasSemana } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult
    try {
      await connection.query(
        `INSERT INTO contracts (contractId, fechaInicio, fechaFin, sueldoHora, horasSemana) 
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?);`, [fechaInicio, fechaFin, sueldoHora, horasSemana]
      )
    } catch (e) {
      throw new Error('Error creating contract')
    }

    const [contracts] = await connection.query(
      `SELECT BIN_TO_UUID(contractId) as contractId, fechaInicio, fechaFin, sueldoHora, horasSemana 
      FROM contracts WHERE contractId = UUID_TO_BIN(?)`, [uuid]
    )

    if (contracts.length > 0) {
      return contracts[0]
    } else {
      return null
    }
  }

  static async updateContract ({ id, input }) {
    const [datos] = await connection.query(
    `SELECT BIN_TO_UUID(contractId) as contractId, fechaInicio, fechaFin, sueldoHora, horasSemana 
   FROM contracts WHERE contractId = UUID_TO_BIN(?)`, [id]
    )

    const fechaInicio = input.fechaInicio ?? datos[0].fechaInicio
    const fechaFin = input.fechaFin ?? datos[0].fechaFin
    const sueldoHora = input.sueldoHora ?? datos[0].sueldoHora
    const horasSemana = input.horasSemana ?? datos[0].horasSemana

    try {
      await connection.query(
        `UPDATE contracts
        SET fechaInicio = ?,
          fechaFin = ?,
          sueldoHora = ?,
          horasSemana = ?
        WHERE contractId = UUID_TO_BIN(?)`,
        [fechaInicio, fechaFin, sueldoHora, horasSemana, id]
      )
    } catch (e) {
      throw new Error('Error updating contract')
    }

    const [contracts] = await connection.query(
      `SELECT BIN_TO_UUID(contractId) as contractId, fechaInicio, fechaFin, sueldoHora, horasSemana 
      FROM contracts WHERE contractId = UUID_TO_BIN(?)`, [id]
    )

    if (contracts.length > 0) {
      return contracts[0]
    } else {
      return null
    }
  }

  static async deleteContract ({ id }) {
    try {
      await connection.query(
        'DELETE FROM contracts WHERE contractId = UUID_TO_BIN(?)', [id]
      )
    } catch (e) {
      throw new Error('Error deleting contract')
    }

    const [contracts] = await connection.query(
      `SELECT BIN_TO_UUID(contractId) as contractId, fechaInicio, fechaFin, sueldoHora, horasSemana 
      FROM contracts WHERE contractId = UUID_TO_BIN(?)`, [id]
    )

    if (contracts.length > 0) {
      return false
    } else {
      return true
    }
  }
}
