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

export class ServicesModel {
  // SERVICES

  static async getNumberServices () {
    const [services] = await connection.query('SELECT COUNT(serviceId) as Numero FROM services')

    if (services[0].Numero !== 0) {
      return services[0].Numero
    } else {
      return null
    }
  }

  static async getAllServices () {
    const [services] = await connection.query('SELECT BIN_TO_UUID(serviceId) as serviceId, tipoServicio, descripcion, fechaServicio, fechaCreacion, BIN_TO_UUID(clientId) as clientId FROM services')

    if (services.length > 0) {
      return services
    } else {
      return null
    }
  }

  static async getServiceById ({ id }) {
    const [services] = await connection.query(
      `SELECT BIN_TO_UUID(serviceId) as serviceId, tipoServicio, descripcion, fechaServicio, fechaCreacion, BIN_TO_UUID(clientId) as clientId 
      FROM services WHERE serviceId = UUID_TO_BIN(?)`, [id]
    )

    if (services.length > 0) {
      return services[0]
    } else {
      return null
    }
  }

  static async createService ({ input }) {
    const { tipoServicio, descripcion, fechaServicio, fechaCreacion, clientId } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    if (clientId !== 'NULL') {
      try {
        await connection.query(
        `INSERT INTO services (serviceId, tipoServicio, descripcion, fechaServicio, fechaCreacion, clientId) 
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, UUID_TO_BIN(?));`, [tipoServicio, descripcion, fechaServicio, fechaCreacion, clientId]
        )
      } catch (e) {
        throw new Error('Error creating service 1')
      }
    } else {
      try {
        await connection.query(
        `INSERT INTO services (serviceId, tipoServicio, descripcion, fechaServicio, fechaCreacion) 
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?);`, [tipoServicio, descripcion, fechaServicio, fechaCreacion]
        )
      } catch (e) {
        throw new Error('Error creating service 2')
      }
    }

    const [services] = await connection.query(
      `SELECT BIN_TO_UUID(serviceId) as serviceId, tipoServicio, descripcion, fechaServicio, fechaCreacion, BIN_TO_UUID(clientId) as clientId 
      FROM services WHERE serviceId = UUID_TO_BIN(?)`, [uuid]
    )

    if (services.length > 0) {
      return services[0]
    } else {
      return null
    }
  }

  static async updateService ({ id, input }) {
    const [datos] = await connection.query(
      `SELECT BIN_TO_UUID(serviceId) as serviceId, tipoServicio, descripcion, fechaServicio, fechaCreacion, BIN_TO_UUID(clientId) as clientId 
      FROM services WHERE serviceId = UUID_TO_BIN(?)`, [id]
    )

    const tipoServicio = input.tipoServicio ?? datos[0].tipoServicio
    const descripcion = input.descripcion ?? datos[0].descripcion
    const fechaServicio = input.fechaServicio ?? datos[0].fechaServicio
    const fechaCreacion = input.fechaCreacion ?? datos[0].fechaCreacion
    const clientId = input.clientId ?? datos[0].clientId

    try {
      await connection.query(
        `UPDATE services
        SET tipoServicio = ?,
          descripcion = ?,
          fechaServicio = ?,
          fechaCreacion = ?,
          clientId = = UUID_TO_BIN(?)
        WHERE serviceId = UUID_TO_BIN(?)`,
        [tipoServicio, descripcion, fechaServicio, fechaCreacion, clientId, id]
      )
    } catch (e) {
      throw new Error('Error updating client')
    }

    const [services] = await connection.query(
      `SELECT BIN_TO_UUID(serviceId) as serviceId, tipoServicio, descripcion, fechaServicio, fechaCreacion, BIN_TO_UUID(clientId) as clientId 
     FROM services WHERE serviceId = UUID_TO_BIN(?)`, [id]
    )

    if (services.length > 0) {
      return services[0]
    } else {
      return null
    }
  }

  static async deleteService ({ id }) {
    try {
      await connection.query(
        'DELETE FROM services WHERE serviceId = UUID_TO_BIN(?)', [id]
      )
    } catch (e) {
      throw new Error('Error deleting client')
    }

    const [services] = await connection.query(
      `SELECT BIN_TO_UUID(serviceId) as serviceId, tipoServicio, descripcion, fechaServicio, fechaCreacion, BIN_TO_UUID(clientId) as clientId 
      FROM services WHERE serviceId = UUID_TO_BIN(?)`, [id]
    )

    if (services.length > 0) {
      return false
    } else {
      return true
    }
  }
}
