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

export class DriversModel {
  // DRIVERS

  static async getNumberDrivers () {
    const [drivers] = await connection.query('SELECT COUNT(employeeId) as Numero FROM drivers')

    if (drivers[0].Numero !== 0) {
      return drivers[0].Numero
    } else {
      return null
    }
  }

  static async getAllDrivers () {
    const [drivers] = await connection.query('SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, BIN_TO_UUID(contractId) FROM drivers')

    if (drivers.length > 0) {
      return drivers
    } else {
      return null
    }
  }

  static async getDriverById ({ id }) {
    const [drivers] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, BIN_TO_UUID(contractId) 
      FROM drivers WHERE employeeId = UUID_TO_BIN(?)`, [id]
    )

    if (drivers.length > 0) {
      return drivers[0]
    } else {
      return null
    }
  }

  static async createDriver ({ input }) {
    const { dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, contractId } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult
    try {
      await connection.query(
        `INSERT INTO drivers (employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, contractId) 
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, UUID_TO_BIN(?));`, [dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, contractId]
      )
    } catch (e) {
      throw new Error('Error creating driver')
    }

    const [drivers] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, BIN_TO_UUID(contractId) 
      FROM drivers WHERE employeeId = UUID_TO_BIN(?)`, [uuid]
    )

    if (drivers.length > 0) {
      return drivers[0]
    } else {
      return null
    }
  }

  static async updateDriver ({ id, input }) {
    const [datos] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes
      FROM drivers WHERE employeeId = UUID_TO_BIN(?)`, [id]
    )

    const dni = input.dni ?? datos[0].dni
    const nombre = input.nombre ?? datos[0].nombre
    const apellidos = input.apellidos ?? datos[0].apellidos
    const email = input.email ?? datos[0].email
    const telefono = input.telefono ?? datos[0].telefono
    const sexo = input.sexo ?? datos[0].sexo
    const fechaNacimiento = input.fechaNacimiento ?? datos[0].fechaNacimiento
    const direccion = input.direccion ?? datos[0].direccion
    const permisoConducir = input.permisoConducir ?? datos[0].permisoConducir
    const tarjetaCAP = input.tarjetaCAP ?? datos[0].tarjetaCAP
    const tarjetaTacografo = input.tarjetaTacografo ?? datos[0].tarjetaTacografo
    const certificadoAntecedentes = input.certificadoAntecedentes ?? datos[0].certificadoAntecedentes
    try {
      await connection.query(
        `UPDATE drivers
        SET dni = ?,
          nombre = ?,
          apellidos = ?,
          email = ?,
          telefono = ?,
          sexo = ?,
          fechaNacimiento = ?,
          direccion = ?,
          permisoConducir = ?,
          tarjetaCAP = ?,
          tarjetaTacografo = ?,
          certificadoAntecedentes = ?
        WHERE employeeId = UUID_TO_BIN(?)`,
        [dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, id]
      )
    } catch (e) {
      throw new Error('Error updating driver')
    }

    const [drivers] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, BIN_TO_UUID(contractId) 
      FROM drivers WHERE employeeId = UUID_TO_BIN(?)`, [id]
    )

    if (drivers.length > 0) {
      return drivers[0]
    } else {
      return null
    }
  }

  static async deleteDriver ({ id }) {
    try {
      await connection.query(
        'DELETE FROM drivers WHERE employeeId = UUID_TO_BIN(?)', [id]
      )
    } catch (e) {
      throw new Error('Error deleting driver')
    }

    const [drivers] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, BIN_TO_UUID(contractId) 
      FROM drivers WHERE employeeId = UUID_TO_BIN(?)`, [id]
    )

    if (drivers.length > 0) {
      return false
    } else {
      return true
    }
  }
}
