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

export class AGCdbModel {
  // USERS
  static async getNumberUsers () {
    const [users] = await connection.query('SELECT COUNT(id) as Numero FROM users')

    if (users[0].Numero !== 0) {
      return users[0].Numero
    } else {
      return null
    }
  }

  static async getUserByEmail (email) {
    const [users] = await connection.query(
      `SELECT BIN_TO_UUID(id) as id, username, email, password 
      FROM users WHERE email = ?`, [email]
    )

    if (users.length > 0) {
      return users[0]
    } else {
      return null
    }
  }

  static async getUserByUsername (username) {
    const [users] = await connection.query(
      `SELECT BIN_TO_UUID(id) as id, username, email, password 
      FROM users WHERE username = ?`, [username]
    )

    if (users.length > 0) {
      return users[0]
    } else {
      return null
    }
  }

  static async getUserById (id) {
    const [users] = await connection.query(
      `SELECT BIN_TO_UUID(id) as id, username, email, password 
      FROM users WHERE id = UUID_TO_BIN(?)`, [id]
    )

    if (users.length > 0) {
      return users[0]
    } else {
      return null
    }
  }

  static async createUser (input) {
    const { username, email, password } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult
    try {
      await connection.query(
        `INSERT INTO users (id, username, email, password) 
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?);`, [username, email, password]
      )
    } catch (e) {
      throw new Error('Error creating user')
    }

    const [users] = await connection.query(
      `SELECT BIN_TO_UUID(id), username, email, password 
      FROM users WHERE id = UUID_TO_BIN(?);`, [uuid]
    )

    return users[0]
  }

  static async updateUser ({ id, input }) {
    const { username, email, password } = input

    try {
      await connection.query(
        `UPDATE users SET username = ?, email = ?, password = ?, 
        WHERE id = ?`, [username, email, password, id]
      )
    } catch (e) {
      throw new Error('Error updating user')
    }

    const [users] = await connection.query(
      `SELECT username, email, password 
      FROM users WHERE id = UUID_TO_BIN(?)`, [id]
    )

    if (users.length > 0) {
      return users[0]
    } else {
      return null
    }
  }

  static async deleteUser ({ id }) {
    try {
      await connection.query(
        'DELETE FROM users WHERE id = ?', [id]
      )
    } catch (e) {
      throw new Error('Error deleting client')
    }

    const [users] = await connection.query(
      `SELECT nombreEmpresa, dni, nombre, apellidos, email, telefono 
      FROM users WHERE id = UUID_TO_BIN(?)`, [id]
    )

    if (users.length > 0) {
      return users[0]
    } else {
      return null
    }
  }

  // CLIENTS

  static async getNumberClients () {
    const [clients] = await connection.query('SELECT COUNT(id) as Numero FROM clients')

    if (clients[0].Numero !== 0) {
      return clients[0].Numero
    } else {
      return null
    }
  }

  static async getAllClients () {
    const [clients] = await connection.query('SELECT nombreEmpresa, dni, nombre, apellidos, email, telefono FROM clients')

    if (clients.length > 0) {
      return clients
    } else {
      return null
    }
  }

  static async getClientById ({ id }) {
    const [clients] = await connection.query(
      `SELECT nombreEmpresa, dni, nombre, apellidos, email, telefono 
      FROM clients WHERE id = UUID_TO_BIN(?)`, [id]
    )

    if (clients.length > 0) {
      return clients[0]
    } else {
      return null
    }
  }

  static async createClient ({ input }) {
    const { nombreEmpresa, dni, nombre, apellidos, email, telefono } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO clients (id, nombreEmpresa, dni, nombre, apellidos, email, telefono) 
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?);`, [nombreEmpresa, dni, nombre, apellidos, email, telefono]
      )
    } catch (e) {
      throw new Error('Error creating client')
    }

    const [clients] = await connection.query(
      `SELECT nombreEmpresa, dni, nombre, apellidos, email, telefono 
      FROM clients WHERE id = UUID_TO_BIN(?)`, [uuid]
    )

    if (clients.length > 0) {
      return clients[0]
    } else {
      return null
    }
  }

  static async updateClient ({ id, input }) {
    const { nombreEmpresa, dni, nombre, apellidos, email, telefono } = input

    try {
      await connection.query(
        `UPDATE clients SET nombreEmpresa = ?, dni = ?, nombre = ?, 
        apellidos = ?, email = ?, telefono = ? WHERE id = ?`,
        [nombreEmpresa, dni, nombre, apellidos, email, telefono, id]
      )
    } catch (e) {
      throw new Error('Error updating client')
    }

    const [clients] = await connection.query(
      `SELECT nombreEmpresa, dni, nombre, apellidos, email, telefono 
      FROM clients WHERE id = UUID_TO_BIN(?)`, [id]
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
        'DELETE FROM clients WHERE id = ?', [id]
      )
    } catch (e) {
      throw new Error('Error deleting client')
    }

    const [clients] = await connection.query(
      `SELECT nombreEmpresa, dni, nombre, apellidos, email, telefono 
      FROM clients WHERE id = UUID_TO_BIN(?)`, [id]
    )

    if (clients.length > 0) {
      return clients[0]
    } else {
      return null
    }
  }
}
