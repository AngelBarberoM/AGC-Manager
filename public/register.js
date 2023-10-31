import { PORT } from '../index.js'

const mensajeError = document.getElementsByClassName('error')[0]

document.getElementById('register-form').addEventListener('submit', async (event) => {
  event.preventDefault()

  const res = await fetch(`http://localhost:${PORT}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: event.target.children.username.value,
      email: event.target.children.email.value,
      password: event.target.children.password.value,
      confirmedPassword: event.target.children.confirmedPassword.value
    })
  })

  if (!res.ok) return mensajeError.classList.toggle('escondido', false)

  const resJson = await res.json()

  if (resJson.redirect) {
    window.location.href = resJson.redirect
  }
})
