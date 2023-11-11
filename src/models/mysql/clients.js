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

export class ClientsModel {
  // CLIENTS

  static async getNumberClients () {
    const [clients] = await connection.query('SELECT COUNT(clientId) as Numero FROM clients')

    if (clients[0].Numero !== 0) {
      return clients[0].Numero
    } else {
      return null
    }
  }

  static async getAllClients () {
    const [clients] = await connection.query('SELECT BIN_TO_UUID(clientId) as clientId, nombreEmpresa, dni, nombre, apellidos, email, telefono, fechaNacimiento, direccion FROM clients')

    if (clients.length > 0) {
      return clients
    } else {
      return null
    }
  }

  static async getClientById ({ id }) {
    const [clients] = await connection.query(
      `SELECT BIN_TO_UUID(clientId) as clientId, nombreEmpresa, dni, nombre, apellidos, email, telefono, fechaNacimiento, direccion 
      FROM clients WHERE clientId = UUID_TO_BIN(?)`, [id]
    )

    if (clients.length > 0) {
      return clients[0]
    } else {
      return null
    }
  }

  static async createClient ({ input }) {
    const { nombreEmpresa, dni, nombre, apellidos, email, telefono, fechaNacimiento, direccion } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO clients (clientId, nombreEmpresa, dni, nombre, apellidos, email, telefono, fechaNacimiento, direccion) 
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?, ?, ?);`, [nombreEmpresa, dni, nombre, apellidos, email, telefono, fechaNacimiento, direccion]
      )
    } catch (e) {
      throw new Error('Error creating client')
    }

    const [clients] = await connection.query(
      `SELECT BIN_TO_UUID(clientId) as clientId, nombreEmpresa, dni, nombre, apellidos, email, telefono, fechaNacimiento, direccion 
      FROM clients WHERE clientId = UUID_TO_BIN(?)`, [uuid]
    )

    if (clients.length > 0) {
      return clients[0]
    } else {
      return null
    }
  }

  static async updateClient ({ id, input }) {
    const [datos] = await connection.query(
      `SELECT BIN_TO_UUID(clientId) as clientId, nombreEmpresa, dni, nombre, apellidos, email, telefono, fechaNacimiento, direccion 
      FROM clients WHERE clientId = UUID_TO_BIN(?)`, [id]
    )

    const nombreEmpresa = input.nombreEmpresa ?? datos[0].nombreEmpresa
    const dni = input.dni ?? datos[0].dni
    const nombre = input.nombre ?? datos[0].nombre
    const apellidos = input.apellidos ?? datos[0].apellidos
    const email = input.email ?? datos[0].email
    const telefono = input.telefono ?? datos[0].telefono
    const fechaNacimiento = input.email ?? datos[0].fechaNacimiento
    const direccion = input.telefono ?? datos[0].direccion

    try {
      await connection.query(
        `UPDATE clients
        SET nombreEmpresa = ?,
          dni = ?,
          nombre = ?,
          apellidos = ?,
          email = ?,
          telefono = ?,
          fechaNacimiento = ?,
          direccion = ?
        WHERE clientId = UUID_TO_BIN(?)`,
        [nombreEmpresa, dni, nombre, apellidos, email, telefono, fechaNacimiento, direccion, id]
      )
    } catch (e) {
      throw new Error('Error updating client')
    }

    const [clients] = await connection.query(
      `SELECT BIN_TO_UUID(clientId) as clientId, nombreEmpresa, dni, nombre, apellidos, email, telefono, fechaNacimiento, direccion 
      FROM clients WHERE clientId = UUID_TO_BIN(?)`, [id]
    )

    if (clients.length > 0) {
      return clients[0]
    } else {
      return null
    }
  }

  static async deleteClient ({ id }) {
    try {
      await connection.query(
        'DELETE FROM clients WHERE clientId = UUID_TO_BIN(?)', [id]
      )
    } catch (e) {
      throw new Error('Error deleting client')
    }

    const [clients] = await connection.query(
      `SELECT BIN_TO_UUID(clientId) as clientId, nombreEmpresa, dni, nombre, apellidos, email, telefono, fechaNacimiento, direccion 
      FROM clients WHERE clientId = UUID_TO_BIN(?)`, [id]
    )

    if (clients.length > 0) {
      return false
    } else {
      return true
    }
  }
}
