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
  static async getByEmail (email) {
    const [users] = await connection.query('SELECT email from users WHERE email = ?', [email])

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
