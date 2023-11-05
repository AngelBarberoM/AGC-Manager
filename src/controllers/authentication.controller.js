// import { AGCdbModel } from '../models/mysql/AGCdb.js'

export async function registerAuth (req, res) {
  console.log(req.body)

  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  const confirmedPassword = req.body.confirmedPassword

  if (!username || !email || !password || !confirmedPassword) {
    return res.status(400).send({ status: 'Error', message: 'Los campos están incompletos' })
  }

  if (password !== confirmedPassword) {
    return res.status(400).send({ status: 'Error', message: 'Las contraseñas introducidas son incorrectas' })
  }

  res.send('recived')
}
