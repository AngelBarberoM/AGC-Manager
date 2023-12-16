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

export class AdministrativesModel {
  // ADMINISTRATIVES

  static async getNumberAdministratives () {
    const [administratives] = await connection.query('SELECT COUNT(employeeId) as Numero FROM administratives')

    if (administratives[0].Numero !== 0) {
      return administratives[0].Numero
    } else {
      return null
    }
  }

  static async getAllAdministratives () {
    const [administratives] = await connection.query('SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, BIN_TO_UUID(contractId) as contractId FROM administratives')

    if (administratives.length > 0) {
      return administratives
    } else {
      return null
    }
  }

  static async getAdministrativeById ({ id }) {
    const [administratives] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, BIN_TO_UUID(contractId) as contractId 
      FROM administratives WHERE employeeId = UUID_TO_BIN(?)`, [id]
    )

    if (administratives.length > 0) {
      return administratives[0]
    } else {
      return null
    }
  }

  static async getAdministrativeByDNI ({ dni }) {
    const [administratives] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, BIN_TO_UUID(contractId) as contractId 
      FROM administratives WHERE dni = ?`, [dni]
    )

    if (administratives.length > 0) {
      return administratives[0]
    } else {
      return null
    }
  }

  static async getAdministrativeByEmail ({ email }) {
    const [administratives] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, BIN_TO_UUID(contractId) as contractId 
      FROM administratives WHERE email = ?`, [email]
    )

    if (administratives.length > 0) {
      return administratives[0]
    } else {
      return null
    }
  }

  static async getAdministrativeByTelefono ({ telefono }) {
    const [administratives] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, BIN_TO_UUID(contractId) as contractId 
      FROM administratives WHERE telefono = ?`, [telefono]
    )

    if (administratives.length > 0) {
      return administratives[0]
    } else {
      return null
    }
  }

  static async createAdministrative ({ input }) {
    const { dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, contractId } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    if (contractId !== 'NULL') {
      try {
        const [contrato] = await connection.query(
          `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, BIN_TO_UUID(contractId) as contractId 
          FROM administratives WHERE contractId = UUID_TO_BIN(?)`, [contractId]
        )

        if (contrato.length > 0) {
          return 1
        }

        await connection.query(
        `INSERT INTO administratives (employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, contractId) VALUES
        (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?, ?, ?, UUID_TO_BIN(?));`, [dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, contractId]
        )
      } catch (e) {
        throw new Error('Error creating administrative 1')
      }
    } else {
      try {
        await connection.query(
        `INSERT INTO administratives (employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion) VALUES
        (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?, ?, ?);`, [dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion]
        )
      } catch (e) {
        throw new Error('Error creating administrative 2')
      }
    }

    const [administratives] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, BIN_TO_UUID(contractId) as contractId 
      FROM administratives WHERE employeeId = UUID_TO_BIN(?)`, [uuid]
    )

    if (administratives.length > 0) {
      return administratives[0]
    } else {
      return null
    }
  }

  static async updateAdministrative ({ id, input }) {
    const dni = input.dni
    const nombre = input.nombre
    const apellidos = input.apellidos
    const email = input.email
    const telefono = input.telefono
    const sexo = input.sexo
    const fechaNacimiento = input.fechaNacimiento
    const direccion = input.direccion
    const contractId = input.contractId

    if (dni) {
      try {
        await connection.query(
          'UPDATE administratives SET dni = ? WHERE employeeId = UUID_TO_BIN(?)', [dni, id]
        )
      } catch (e) {
        throw new Error('Error updating dni in administrative')
      }
    }
    if (nombre) {
      try {
        await connection.query(
          'UPDATE administratives SET nombre = ? WHERE employeeId = UUID_TO_BIN(?)', [nombre, id]
        )
      } catch (e) {
        throw new Error('Error updating nombre in administrative')
      }
    }
    if (apellidos) {
      try {
        await connection.query(
          'UPDATE administratives SET apellidos = ? WHERE employeeId = UUID_TO_BIN(?)', [apellidos, id]
        )
      } catch (e) {
        throw new Error('Error updating apellidos in administrative')
      }
    }
    if (email) {
      try {
        await connection.query(
          'UPDATE administratives SET email = ? WHERE employeeId = UUID_TO_BIN(?)', [email, id]
        )
      } catch (e) {
        throw new Error('Error updating email in administrative')
      }
    }
    if (telefono) {
      try {
        await connection.query(
          'UPDATE administratives SET telefono = ? WHERE employeeId = UUID_TO_BIN(?)', [telefono, id]
        )
      } catch (e) {
        throw new Error('Error updating telefono in administrative')
      }
    }
    if (sexo) {
      try {
        await connection.query(
          'UPDATE administratives SET sexo = ? WHERE employeeId = UUID_TO_BIN(?)', [sexo, id]
        )
      } catch (e) {
        throw new Error('Error updating sexo in administrative')
      }
    }
    if (fechaNacimiento) {
      try {
        await connection.query(
          'UPDATE administratives SET fechaNacimiento = ? WHERE employeeId = UUID_TO_BIN(?)', [fechaNacimiento, id]
        )
      } catch (e) {
        throw new Error('Error updating fechaNacimiento in administrative')
      }
    }
    if (direccion) {
      try {
        await connection.query(
          'UPDATE administratives SET direccion = ? WHERE employeeId = UUID_TO_BIN(?)', [direccion, id]
        )
      } catch (e) {
        throw new Error('Error updating direccion in administrative')
      }
    }
    if (contractId) {
      try {
        await connection.query(
          'UPDATE administratives SET contractId = ? WHERE employeeId = UUID_TO_BIN(?)', [contractId, id]
        )
      } catch (e) {
        throw new Error('Error updating contractId in administrative')
      }
    }

    const [administratives] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, BIN_TO_UUID(contractId) as contractId 
      FROM administratives WHERE employeeId = UUID_TO_BIN(?)`, [id]
    )

    if (administratives.length > 0) {
      return administratives[0]
    } else {
      return null
    }
  }

  static async deleteAdministrative ({ id }) {
    try {
      await connection.query(
        'DELETE FROM administratives WHERE employeeId = UUID_TO_BIN(?)', [id]
      )
    } catch (e) {
      throw new Error('Error deleting administrative')
    }

    const [administratives] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, BIN_TO_UUID(contractId) as contractId 
      FROM administratives WHERE employeeId = UUID_TO_BIN(?)`, [id]
    )

    if (administratives.length > 0) {
      return false
    } else {
      return true
    }
  }
}
