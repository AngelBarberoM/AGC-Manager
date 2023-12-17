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
    const [services] = await connection.query(
      `SELECT BIN_TO_UUID(serviceId) as serviceId, tipoServicio, descripcion, DATE_FORMAT(fechaServicio, '%Y-%m-%d') AS fechaServicio, DATE_FORMAT(fechaCreacion, '%Y-%m-%d') AS fechaCreacion, BIN_TO_UUID(clientId) as clientId 
      FROM services`
    )

    if (services.length > 0) {
      return services
    } else {
      return null
    }
  }

  static async getServiceById ({ id }) {
    const [services] = await connection.query(
      `SELECT BIN_TO_UUID(serviceId) as serviceId, tipoServicio, descripcion, DATE_FORMAT(fechaServicio, '%Y-%m-%d') AS fechaServicio, DATE_FORMAT(fechaCreacion, '%Y-%m-%d') AS fechaCreacion, BIN_TO_UUID(clientId) as clientId 
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
    const tipoServicio = input.tipoServicio
    const descripcion = input.descripcion
    const fechaServicio = input.fechaServicio
    const fechaCreacion = input.fechaCreacion
    const clientId = input.clientId

    if (tipoServicio) {
      try {
        await connection.query(
          'UPDATE services SET tipoServicio = ? WHERE serviceId = UUID_TO_BIN(?)', [tipoServicio, id]
        )
      } catch (e) {
        throw new Error('Error updating type service in service')
      }
    }
    if (descripcion) {
      try {
        await connection.query(
          'UPDATE services SET descripcion = ? WHERE serviceId = UUID_TO_BIN(?)', [descripcion, id]
        )
      } catch (e) {
        throw new Error('Error updating description in service')
      }
    }
    if (fechaServicio) {
      try {
        await connection.query(
          'UPDATE services SET fechaServicio = ? WHERE serviceId = UUID_TO_BIN(?)', [fechaServicio, id]
        )
      } catch (e) {
        throw new Error('Error updating service date in service')
      }
    }
    if (fechaCreacion) {
      try {
        await connection.query(
          'UPDATE services SET fechaCreacion = ? WHERE serviceId = UUID_TO_BIN(?)', [fechaCreacion, id]
        )
      } catch (e) {
        throw new Error('Error updating create date in service')
      }
    }
    if (clientId) {
      try {
        await connection.query(
          'UPDATE services SET clientId = UUID_TO_BIN(?) WHERE serviceId = UUID_TO_BIN(?)', [clientId, id]
        )
      } catch (e) {
        throw new Error('Error updating clientId in service')
      }
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
