import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'agcdb'
}

const connection = mysql.createConnection(config)

connection.connect()

const query = 'SELECT * FROM users'

connection.query(query, (error, results) => {
  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Conexión con la base de datos correcta')
  }
  connection.end()
})

export class AGCdbModel {

}
