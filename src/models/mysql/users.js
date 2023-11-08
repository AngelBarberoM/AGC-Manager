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

export class UsersModel {
  // USERS

  static async getNumberUsers () {
    const [users] = await connection.query('SELECT COUNT(id) as Numero FROM users')

    if (users[0].Numero !== 0) {
      return users[0].Numero
    } else {
      return null
    }
  }

  static async getAllUsers () {
    const [users] = await connection.query('SELECT username, email, password FROM users')

    if (users.length > 0) {
      return users
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

  static async getUserById ({ id }) {
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

  static async createUser ({ input }) {
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
    const [datos] = await connection.query(
    `SELECT username, email, password 
    FROM users WHERE id = UUID_TO_BIN(?)`, [id]
    )

    const username = input.username ?? datos[0].username
    const email = input.email ?? datos[0].email
    const password = input.password ?? datos[0].password

    try {
      await connection.query(
      `UPDATE users
      SET username = ?,
        email = ?,
        password = ?
      WHERE id = UUID_TO_BIN(?)`,
      [username, email, password, id]
      )
    } catch (e) {
      throw new Error('Error updating client')
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
        'DELETE FROM users WHERE id = UUID_TO_BIN(?)', [id]
      )
    } catch (e) {
      throw new Error('Error deleting client')
    }

    const [users] = await connection.query(
      `SELECT username, email, password 
    FROM users WHERE id = UUID_TO_BIN(?)`, [id]
    )
    if (users.length > 0) {
      return false
    } else {
      return true
    }
  }
}
