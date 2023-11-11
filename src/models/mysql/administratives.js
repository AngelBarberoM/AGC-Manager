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

export class AdministrativesModel {
  // ADMINISTRATIVES

  static async getNumberAdministratives () {
    const [administratives] = await connection.query('SELECT COUNT(employeeId) as Numero FROM administratives')

    if (administratives[0].Numero !== 0) {
      return administratives[0].Numero
    } else {
      return null
    }
  }

  static async getAllAdministratives () {
    const [administratives] = await connection.query('SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, BIN_TO_UUID(contractId) FROM administratives')

    if (administratives.length > 0) {
      return administratives
    } else {
      return null
    }
  }

  static async getAdministrativeById ({ id }) {
    const [administratives] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, BIN_TO_UUID(contractId) 
      FROM administratives WHERE employeeId = UUID_TO_BIN(?)`, [id]
    )

    if (administratives.length > 0) {
      return administratives[0]
    } else {
      return null
    }
  }

  static async createAdministrative ({ input }) {
    const { dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, contractId } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO administratives (employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, contractId) VALUES
        (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?, ?, ?, UUID_TO_BIN(?));`, [dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, contractId]
      )
    } catch (e) {
      throw new Error('Error creating administrative')
    }

    const [administratives] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, BIN_TO_UUID(contractId) 
      FROM administratives WHERE employeeId = UUID_TO_BIN(?)`, [uuid]
    )

    if (administratives.length > 0) {
      return administratives[0]
    } else {
      return null
    }
  }

  static async updateAdministrative ({ id, input }) {
    const [datos] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion
      FROM administratives WHERE employeeId = UUID_TO_BIN(?)`, [id]
    )

    const dni = input.dni ?? datos[0].dni
    const nombre = input.nombre ?? datos[0].nombre
    const apellidos = input.apellidos ?? datos[0].apellidos
    const email = input.email ?? datos[0].email
    const telefono = input.telefono ?? datos[0].telefono
    const sexo = input.sexo ?? datos[0].sexo
    const fechaNacimiento = input.fechaNacimiento ?? datos[0].fechaNacimiento
    const direccion = input.direccion ?? datos[0].direccion

    try {
      await connection.query(
        `UPDATE administratives
        SET dni = ?,
          nombre = ?,
          apellidos = ?,
          email = ?,
          telefono = ?,
          sexo = ?,
          fechaNacimiento = ?,
          direccion = ?
        WHERE employeeId = UUID_TO_BIN(?)`,
        [dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, id]
      )
    } catch (e) {
      throw new Error('Error updating administrative')
    }

    const [administratives] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, BIN_TO_UUID(contractId) 
      FROM administratives WHERE employeeId = UUID_TO_BIN(?)`, [id]
    )

    if (administratives.length > 0) {
      return administratives[0]
    } else {
      return null
    }
  }

  static async deleteAdministrative ({ id }) {
    try {
      await connection.query(
        'DELETE FROM administratives WHERE employeeId = UUID_TO_BIN(?)', [id]
      )
    } catch (e) {
      throw new Error('Error deleting administrative')
    }

    const [administratives] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, BIN_TO_UUID(contractId) 
      FROM administratives WHERE employeeId = UUID_TO_BIN(?)`, [id]
    )

    if (administratives.length > 0) {
      return false
    } else {
      return true
    }
  }
}
