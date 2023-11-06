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
  static async getNumberUsers () {
    const [users] = await connection.query('SELECT COUNT(id) as Numero from users ')
    console.log(users[0].Numero)

    if (users[0].Numero !== 0) {
      return users[0].Numero
    } else {
      return null
    }
  }

  static async getUserByEmail (email) {
    const [users] = await connection.query('SELECT BIN_TO_UUID(id) as id, username, email, password from users WHERE email = ?', [email])

    if (users.length > 0) {
      return users[0]
    } else {
      return null
    }
  }

  static async getUserByUsername (username) {
    const [users] = await connection.query('SELECT BIN_TO_UUID(id) as id, username, email, password from users WHERE username = ?', [username])

    if (users.length > 0) {
      return users[0]
    } else {
      return null
    }
  }

  static async getUserById (id) {
    const [users] = await connection.query('SELECT BIN_TO_UUID(id) as id, id, email, password from users WHERE id = UUID_TO_BIN(?)', [id])

    if (users.length > 0) {
      return users[0]
    } else {
      return null
    }
  }

  static async createUser ({ username, email, password }) {
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult
    try {
      await connection.query(
        `INSERT INTO users (id, username, email, password) VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?);`,
        [username, email, password]
      )
    } catch (e) {
      throw new Error('Error creating user')
    }

    const [users] = await connection.query(
      'SELECT BIN_TO_UUID(id), username, email, password FROM users WHERE id = UUID_TO_BIN(?);',
      [uuid]
    )

    return users[0]
  }
}
