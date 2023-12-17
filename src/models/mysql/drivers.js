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

export class DriversModel {
  // DRIVERS

  static async getNumberDrivers () {
    const [drivers] = await connection.query('SELECT COUNT(employeeId) as Numero FROM drivers')

    if (drivers[0].Numero !== 0) {
      return drivers[0].Numero
    } else {
      return null
    }
  }

  static async getAllDrivers () {
    const [drivers] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo,  DATE_FORMAT(fechaNacimiento, '%Y-%m-%d') AS fechaNacimiento, 
      direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, BIN_TO_UUID(contractId) as contractId 
      FROM drivers`
    )

    if (drivers.length > 0) {
      return drivers
    } else {
      return null
    }
  }

  static async getDriverById ({ id }) {
    const [drivers] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo,  DATE_FORMAT(fechaNacimiento, '%Y-%m-%d') AS fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, BIN_TO_UUID(contractId) as contractId 
      FROM drivers WHERE employeeId = UUID_TO_BIN(?)`, [id]
    )

    if (drivers.length > 0) {
      return drivers[0]
    } else {
      return null
    }
  }

  static async getDriverByDNI ({ dni }) {
    const [drivers] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo,  DATE_FORMAT(fechaNacimiento, '%Y-%m-%d') AS fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, BIN_TO_UUID(contractId) as contractId 
      FROM drivers WHERE dni = ?`, [dni]
    )

    if (drivers.length > 0) {
      return drivers[0]
    } else {
      return null
    }
  }

  static async getDriverByEmail ({ email }) {
    const [drivers] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo,  DATE_FORMAT(fechaNacimiento, '%Y-%m-%d') AS fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, BIN_TO_UUID(contractId) as contractId 
      FROM drivers WHERE email = ?`, [email]
    )

    if (drivers.length > 0) {
      return drivers[0]
    } else {
      return null
    }
  }

  static async getDriverByTelefono ({ telefono }) {
    const [drivers] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo,  DATE_FORMAT(fechaNacimiento, '%Y-%m-%d') AS fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, BIN_TO_UUID(contractId) as contractId 
      FROM drivers WHERE telefono = ?`, [telefono]
    )

    if (drivers.length > 0) {
      return drivers[0]
    } else {
      return null
    }
  }

  static async createDriver ({ input }) {
    const { dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, contractId } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    if (contractId !== 'NULL') {
      try {
        const [contrato] = await connection.query(
          `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, BIN_TO_UUID(contractId) as contractId 
          FROM drivers WHERE contractId = UUID_TO_BIN(?)`, [contractId]
        )

        if (contrato.length > 0) {
          return 1
        }

        await connection.query(
        `INSERT INTO drivers (employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, contractId) 
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, UUID_TO_BIN(?));`, [dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, contractId]
        )
      } catch (e) {
        throw new Error('Error creating driver 1')
      }
    } else {
      try {
        await connection.query(
        `INSERT INTO drivers (employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes) 
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, [dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes]
        )
      } catch (e) {
        throw new Error('Error creating driver 2')
      }
    }

    const [drivers] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, BIN_TO_UUID(contractId) as contractId 
      FROM drivers WHERE employeeId = UUID_TO_BIN(?)`, [uuid]
    )

    if (drivers.length > 0) {
      return drivers[0]
    } else {
      return null
    }
  }

  static async updateDriver ({ id, input }) {
    const dni = input.dni
    const nombre = input.nombre
    const apellidos = input.apellidos
    const email = input.email
    const telefono = input.telefono
    const sexo = input.sexo
    const fechaNacimiento = input.fechaNacimiento
    const direccion = input.direccion
    const permisoConducir = input.permisoConducir
    const tarjetaCAP = input.tarjetaCAP
    const tarjetaTacografo = input.tarjetaTacografo
    const certificadoAntecedentes = input.certificadoAntecedentes
    const contractId = input.contractId

    if (dni) {
      try {
        await connection.query(
          'UPDATE drivers SET dni = ? WHERE employeeId = UUID_TO_BIN(?)', [dni, id]
        )
      } catch (e) {
        throw new Error('Error updating dni in driver')
      }
    }
    if (nombre) {
      try {
        await connection.query(
          'UPDATE drivers SET nombre = ? WHERE employeeId = UUID_TO_BIN(?)', [nombre, id]
        )
      } catch (e) {
        throw new Error('Error updating nombre in driver')
      }
    }
    if (apellidos) {
      try {
        await connection.query(
          'UPDATE drivers SET apellidos = ? WHERE employeeId = UUID_TO_BIN(?)', [apellidos, id]
        )
      } catch (e) {
        throw new Error('Error updating apellidos in driver')
      }
    }
    if (email) {
      try {
        await connection.query(
          'UPDATE drivers SET email = ? WHERE employeeId = UUID_TO_BIN(?)', [email, id]
        )
      } catch (e) {
        throw new Error('Error updating email in driver')
      }
    }
    if (telefono) {
      try {
        await connection.query(
          'UPDATE drivers SET telefono = ? WHERE employeeId = UUID_TO_BIN(?)', [telefono, id]
        )
      } catch (e) {
        throw new Error('Error updating telefono in driver')
      }
    }
    if (sexo) {
      try {
        await connection.query(
          'UPDATE drivers SET sexo = ? WHERE employeeId = UUID_TO_BIN(?)', [sexo, id]
        )
      } catch (e) {
        throw new Error('Error updating sexo in driver')
      }
    }
    if (fechaNacimiento) {
      try {
        await connection.query(
          'UPDATE drivers SET fechaNacimiento = ? WHERE employeeId = UUID_TO_BIN(?)', [fechaNacimiento, id]
        )
      } catch (e) {
        throw new Error('Error updating fechaNacimiento in driver')
      }
    }
    if (direccion) {
      try {
        await connection.query(
          'UPDATE drivers SET direccion = ? WHERE employeeId = UUID_TO_BIN(?)', [direccion, id]
        )
      } catch (e) {
        throw new Error('Error updating direccion in driver')
      }
    }
    if (permisoConducir) {
      try {
        await connection.query(
          'UPDATE drivers SET permisoConducir = ? WHERE employeeId = UUID_TO_BIN(?)', [permisoConducir, id]
        )
      } catch (e) {
        throw new Error('Error updating permisoConducir in driver')
      }
    }
    if (tarjetaCAP) {
      try {
        await connection.query(
          'UPDATE drivers SET tarjetaCAP = ? WHERE employeeId = UUID_TO_BIN(?)', [tarjetaCAP, id]
        )
      } catch (e) {
        throw new Error('Error updating tarjetaCAP in driver')
      }
    }
    if (tarjetaTacografo) {
      try {
        await connection.query(
          'UPDATE drivers SET tarjetaTacografo = ? WHERE employeeId = UUID_TO_BIN(?)', [tarjetaTacografo, id]
        )
      } catch (e) {
        throw new Error('Error updating tarjetaTacografo in driver')
      }
    }
    if (certificadoAntecedentes) {
      try {
        await connection.query(
          'UPDATE drivers SET certificadoAntecedentes = ? WHERE employeeId = UUID_TO_BIN(?)', [certificadoAntecedentes, id]
        )
      } catch (e) {
        throw new Error('Error updating certificadoAntecedentes in driver')
      }
    }
    if (contractId) {
      try {
        await connection.query(
          'UPDATE drivers SET contractId = UUID_TO_BIN(?) WHERE employeeId = UUID_TO_BIN(?)', [contractId, id]
        )
      } catch (e) {
        throw new Error('Error updating contractId in driver')
      }
    }

    const [drivers] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, BIN_TO_UUID(contractId) as contractId 
      FROM drivers WHERE employeeId = UUID_TO_BIN(?)`, [id]
    )

    if (drivers.length > 0) {
      return drivers[0]
    } else {
      return null
    }
  }

  static async deleteDriver ({ id }) {
    try {
      await connection.query(
        'DELETE FROM drivers WHERE employeeId = UUID_TO_BIN(?)', [id]
      )
    } catch (e) {
      throw new Error('Error deleting driver')
    }

    const [drivers] = await connection.query(
      `SELECT BIN_TO_UUID(employeeId) as employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, BIN_TO_UUID(contractId) as contractId 
      FROM drivers WHERE employeeId = UUID_TO_BIN(?)`, [id]
    )

    if (drivers.length > 0) {
      return false
    } else {
      return true
    }
  }
}
