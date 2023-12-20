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
    const [users] = await connection.query('SELECT COUNT(userId) as Numero FROM users')

    if (users[0].Numero !== 0) {
      return users[0].Numero
    } else {
      return null
    }
  }

  static async getAllUsers () {
    const [users] = await connection.query('SELECT BIN_TO_UUID(userId) as userId, username, email, password, tipoUsuario FROM users')

    if (users.length > 0) {
      return users
    } else {
      return null
    }
  }

  static async getUserByEmail ({ email }) {
    const [users] = await connection.query(
      `SELECT BIN_TO_UUID(userId) as userId, username, email, password, tipoUsuario 
      FROM users WHERE email = ?`, [email]
    )

    if (users.length > 0) {
      return users[0]
    } else {
      return null
    }
  }

  static async getUserByUsername ({ username }) {
    const [users] = await connection.query(
      `SELECT BIN_TO_UUID(userId) as userId, username, email, password, tipoUsuario 
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
      `SELECT BIN_TO_UUID(userId) as userId, username, email, password, tipoUsuario 
      FROM users WHERE userId = UUID_TO_BIN(?)`, [id]
    )

    if (users.length > 0) {
      return users[0]
    } else {
      return null
    }
  }

  static async getTypeUserById ({ id }) {
    const [users] = await connection.query(
      `SELECT BIN_TO_UUID(userId) as userId, tipoUsuario 
      FROM users WHERE userId = UUID_TO_BIN(?)`, [id]
    )

    if (users.length > 0) {
      return users[0]
    } else {
      return null
    }
  }

  static async createUser ({ input }) {
    const { username, email, password, tipoUsuario } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO users (userId, username, email, password, tipoUsuario) 
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?);`, [username, email, password, tipoUsuario]
      )
    } catch (e) {
      throw new Error('Error creating user')
    }

    const [users] = await connection.query(
      `SELECT BIN_TO_UUID(userId) as userId, username, email, password, tipoUsuario 
      FROM users WHERE userId = UUID_TO_BIN(?);`, [uuid]
    )

    return users[0]
  }

  static async updateUser ({ id, input }) {
    const username = input.username
    const email = input.email
    const password = input.password
    const tipoUsuario = input.tipoUsuario

    if (username) {
      try {
        await connection.query(
          'UPDATE users SET username = ? WHERE userId = UUID_TO_BIN(?)', [username, id]
        )
      } catch (e) {
        throw new Error('Error updating username in user')
      }
    }
    if (email) {
      try {
        await connection.query(
          'UPDATE users SET email = ? WHERE userId = UUID_TO_BIN(?)', [email, id]
        )
      } catch (e) {
        throw new Error('Error updating email in user')
      }
    }
    if (password) {
      try {
        await connection.query(
          'UPDATE users SET password = ? WHERE userId = UUID_TO_BIN(?)', [password, id]
        )
      } catch (e) {
        throw new Error('Error updating password in user')
      }
    }
    if (tipoUsuario) {
      try {
        await connection.query(
          'UPDATE users SET tipoUsuario = ? WHERE userId = UUID_TO_BIN(?)', [tipoUsuario, id]
        )
      } catch (e) {
        throw new Error('Error updating tipoUsuario in user')
      }
    }

    const [users] = await connection.query(
      `SELECT BIN_TO_UUID(userId) as userId, username, email, password, tipoUsuario 
      FROM users WHERE userId = UUID_TO_BIN(?)`, [id]
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
        'DELETE FROM users WHERE userId = UUID_TO_BIN(?)', [id]
      )
    } catch (e) {
      throw new Error('Error deleting user')
    }

    const [users] = await connection.query(
      `SELECT BIN_TO_UUID(userId) as userId, username, email, password, tipoUsuario 
      FROM users WHERE userId = UUID_TO_BIN(?)`, [id]
    )

    if (users.length > 0) {
      return false
    } else {
      return true
    }
  }
}
