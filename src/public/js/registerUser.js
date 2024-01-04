const mensajeError = document.getElementsByClassName('error')[0]

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const username = e.target.elements.username.value
  const email = e.target.elements.email.value
  const password = e.target.elements.password.value
  const confirmedPassword = e.target.elements.confirmedPassword.value
  const tipoUsuario = e.target.elements.tipoUsuario.value

  const res = await fetch('/registerUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username, email, password, confirmedPassword, tipoUsuario
    })
  })

  if (res.ok) {
    window.alert('Usuario registrado correctamente.')
  }

  if (!res.ok) {
    return mensajeError.classList.toggle('escondido', false)
  }

  const resJSON = await res.json()

  if (resJSON.redirect) {
    window.location.href = resJSON.redirect
  }
})
