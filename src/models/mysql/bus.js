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
    const [bus] = await connection.query('SELECT BIN_TO_UUID(busId) as busId, matricula, marca, modelo, plazas, BIN_TO_UUID(employeeId) as employeeId FROM bus')

    if (bus.length > 0) {
      return bus
    } else {
      return null
    }
  }

  static async getBusById ({ id }) {
    const [bus] = await connection.query(
      `SELECT BIN_TO_UUID(busId) as busId, matricula, marca, modelo, plazas, BIN_TO_UUID(employeeId) as employeeId 
      FROM bus WHERE busId = UUID_TO_BIN(?)`, [id]
    )

    if (bus.length > 0) {
      return bus[0]
    } else {
      return null
    }
  }

  static async getBusByMatricula ({ matricula }) {
    const [bus] = await connection.query(
      `SELECT BIN_TO_UUID(busId) as busId, matricula, marca, modelo, plazas, BIN_TO_UUID(employeeId) as employeeId 
      FROM bus WHERE matricula = ?`, [matricula]
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

    if (employeeId !== 'NULL') {
      try {
        await connection.query(
        `INSERT INTO bus (busId, matricula, marca, modelo, plazas, employeeId) 
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, UUID_TO_BIN(?));`, [matricula, marca, modelo, plazas, employeeId]
        )
      } catch (e) {
        throw new Error('Error creating bus 1')
      }
    } else {
      try {
        await connection.query(
        `INSERT INTO bus (busId, matricula, marca, modelo, plazas) 
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?);`, [matricula, marca, modelo, plazas]
        )
      } catch (e) {
        throw new Error('Error creating bus 2')
      }
    }

    const [bus] = await connection.query(
      `SELECT BIN_TO_UUID(busId) as busId, matricula, marca, modelo, plazas, BIN_TO_UUID(employeeId) as employeeId 
      FROM bus WHERE busId = UUID_TO_BIN(?)`, [uuid]
    )

    if (bus.length > 0) {
      return bus[0]
    } else {
      return null
    }
  }

  static async updateBus ({ id, input }) {
    const matricula = input.matricula
    const marca = input.marca
    const modelo = input.modelo
    const plazas = input.plazas
    const employeeId = input.employeeId

    if (matricula) {
      try {
        await connection.query(
          'UPDATE bus SET matricula = ? WHERE busId = UUID_TO_BIN(?)', [matricula, id]
        )
      } catch (e) {
        throw new Error('Error updating matricula in bus')
      }
    }
    if (marca) {
      try {
        await connection.query(
          'UPDATE bus SET marca = ? WHERE busId = UUID_TO_BIN(?)', [marca, id]
        )
      } catch (e) {
        throw new Error('Error updating marca in bus')
      }
    }
    if (modelo) {
      try {
        await connection.query(
          'UPDATE bus SET modelo = ? WHERE busId = UUID_TO_BIN(?)', [modelo, id]
        )
      } catch (e) {
        throw new Error('Error updating modelo in bus')
      }
    }
    if (plazas) {
      try {
        await connection.query(
          'UPDATE bus SET plazas = ? WHERE busId = UUID_TO_BIN(?)', [plazas, id]
        )
      } catch (e) {
        throw new Error('Error updating plazas in bus')
      }
    }
    if (employeeId) {
      try {
        await connection.query(
          'UPDATE bus SET employeeId = UUID_TO_BIN(?) WHERE busId = UUID_TO_BIN(?)', [employeeId, id]
        )
      } catch (e) {
        throw new Error('Error updating employeeId in bus')
      }
    }

    const [bus] = await connection.query(
      `SELECT BIN_TO_UUID(busId) as busId, matricula, marca, modelo, plazas, BIN_TO_UUID(employeeId) as employeeId 
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
      `SELECT BIN_TO_UUID(busId) as busId, matricula, marca, modelo, plazas, BIN_TO_UUID(employeeId) as employeeId 
      FROM bus WHERE busId = UUID_TO_BIN(?)`, [id]
    )

    if (bus.length > 0) {
      return false
    } else {
      return true
    }
  }
}
