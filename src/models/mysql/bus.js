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

export class BusModel {
  // BUS

  static async getNumberBus () {
    const [bus] = await connection.query('SELECT COUNT(busId) as Numero FROM bus')

    if (bus[0].Numero !== 0) {
      return bus[0].Numero
    } else {
      return null
    }
  }

  static async getAllBus () {
    const [bus] = await connection.query('SELECT BIN_TO_UUID(busId) as busId, matricula, marca, modelo, plazas, BIN_TO_UUID(employeeId) FROM bus')

    if (bus.length > 0) {
      return bus
    } else {
      return null
    }
  }

  static async getBusById ({ id }) {
    const [bus] = await connection.query(
      `SELECT BIN_TO_UUID(busId) as busId, matricula, marca, modelo, plazas, BIN_TO_UUID(employeeId) 
      FROM bus WHERE busId = UUID_TO_BIN(?)`, [id]
    )

    if (bus.length > 0) {
      return bus[0]
    } else {
      return null
    }
  }

  static async createBus ({ input }) {
    const { matricula, marca, modelo, plazas, employeeId } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult
    try {
      await connection.query(
        `INSERT INTO bus (busId, matricula, marca, modelo, plazas, employeeId) 
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, UUID_TO_BIN(?));`, [matricula, marca, modelo, plazas, employeeId]
      )
    } catch (e) {
      throw new Error('Error creating bus')
    }

    const [bus] = await connection.query(
      `SELECT BIN_TO_UUID(busId) as busId, matricula, marca, modelo, plazas, BIN_TO_UUID(employeeId) 
      FROM bus WHERE busId = UUID_TO_BIN(?)`, [uuid]
    )

    if (bus.length > 0) {
      return bus[0]
    } else {
      return null
    }
  }

  static async updateBus ({ id, input }) {
    const [datos] = await connection.query(
      `SELECT BIN_TO_UUID(busId) as busId, matricula, marca, modelo, plazas 
      FROM bus WHERE busId = UUID_TO_BIN(?)`, [id]
    )

    const matricula = input.matricula ?? datos[0].matricula
    const marca = input.marca ?? datos[0].marca
    const modelo = input.modelo ?? datos[0].modelo
    const plazas = input.plazas ?? datos[0].plazas

    try {
      await connection.query(
        `UPDATE bus
        SET matricula = ?,
          marca = ?,
          modelo = ?,
          plazas = ?
        WHERE busId = UUID_TO_BIN(?)`,
        [matricula, marca, modelo, plazas, id]
      )
    } catch (e) {
      throw new Error('Error updating bus')
    }

    const [bus] = await connection.query(
      `SELECT BIN_TO_UUID(busId) as busId, matricula, marca, modelo, plazas, BIN_TO_UUID(employeeId) 
      FROM bus WHERE busId = UUID_TO_BIN(?)`, [id]
    )

    if (bus.length > 0) {
      return bus[0]
    } else {
      return null
    }
  }

  static async deleteBus ({ id }) {
    try {
      await connection.query(
        'DELETE FROM bus WHERE busId = UUID_TO_BIN(?)', [id]
      )
    } catch (e) {
      throw new Error('Error deleting bus')
    }

    const [bus] = await connection.query(
      `SELECT BIN_TO_UUID(busId) as busId, matricula, marca, modelo, plazas, BIN_TO_UUID(employeeId) 
      FROM bus WHERE busId = UUID_TO_BIN(?)`, [id]
    )

    if (bus.length > 0) {
      return false
    } else {
      return true
    }
  }
}
