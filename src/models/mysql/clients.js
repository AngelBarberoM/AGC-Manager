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

  static async getClientByDNI ({ dni }) {
    const [clients] = await connection.query(
      `SELECT BIN_TO_UUID(clientId) as clientId, nombreEmpresa, dni, nombre, apellidos, email, telefono, fechaNacimiento, direccion 
      FROM clients WHERE dni = ?`, [dni]
    )

    if (clients.length > 0) {
      return clients[0]
    } else {
      return null
    }
  }

  static async getClientByEmail ({ email }) {
    const [clients] = await connection.query(
      `SELECT BIN_TO_UUID(clientId) as clientId, nombreEmpresa, dni, nombre, apellidos, email, telefono, fechaNacimiento, direccion 
      FROM clients WHERE email = ?`, [email]
    )

    if (clients.length > 0) {
      return clients[0]
    } else {
      return null
    }
  }

  static async getClientByTelefono ({ telefono }) {
    const [clients] = await connection.query(
      `SELECT BIN_TO_UUID(clientId) as clientId, nombreEmpresa, dni, nombre, apellidos, email, telefono, fechaNacimiento, direccion 
      FROM clients WHERE telefono = ?`, [telefono]
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
    const nombreEmpresa = input.nombreEmpresa
    const dni = input.dni
    const nombre = input.nombre
    const apellidos = input.apellidos
    const email = input.email
    const telefono = input.telefono
    const fechaNacimiento = input.email
    const direccion = input.telefono

    if (nombreEmpresa) {
      try {
        await connection.query(
          'UPDATE clients SET nombreEmpresa = ? WHERE clientId = UUID_TO_BIN(?)', [nombreEmpresa, id]
        )
      } catch (e) {
        throw new Error('Error updating nombre empresa in client')
      }
    }
    if (dni) {
      try {
        await connection.query(
          'UPDATE clients SET dni = ? WHERE clientId = UUID_TO_BIN(?)', [dni, id]
        )
      } catch (e) {
        throw new Error('Error updating dni in client')
      }
    }
    if (nombre) {
      try {
        await connection.query(
          'UPDATE clients SET nombre = ? WHERE clientId = UUID_TO_BIN(?)', [nombre, id]
        )
      } catch (e) {
        throw new Error('Error updating nombre in client')
      }
    }
    if (apellidos) {
      try {
        await connection.query(
          'UPDATE clients SET apellidos = ? WHERE clientId = UUID_TO_BIN(?)', [apellidos, id]
        )
      } catch (e) {
        throw new Error('Error updating apellidos in client')
      }
    }
    if (email) {
      try {
        await connection.query(
          'UPDATE clients SET email = ? WHERE clientId = UUID_TO_BIN(?)', [email, id]
        )
      } catch (e) {
        throw new Error('Error updating email in client')
      }
    }
    if (telefono) {
      try {
        await connection.query(
          'UPDATE clients SET telefono = ? WHERE clientId = UUID_TO_BIN(?)', [telefono, id]
        )
      } catch (e) {
        throw new Error('Error updating telefono in client')
      }
    }
    if (fechaNacimiento) {
      try {
        await connection.query(
          'UPDATE clients SET fechaNacimiento = ? WHERE clientId = UUID_TO_BIN(?)', [fechaNacimiento, id]
        )
      } catch (e) {
        throw new Error('Error updating fechaNacimiento in client')
      }
    }
    if (direccion) {
      try {
        await connection.query(
          'UPDATE clients SET direccion = ? WHERE clientId = UUID_TO_BIN(?)', [direccion, id]
        )
      } catch (e) {
        throw new Error('Error updating direccion in client')
      }
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
