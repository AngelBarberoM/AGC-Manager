const mensajeError = document.getElementsByClassName('error')[0]

document.getElementById('changePassword-form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const password = e.target.children.password.value
  const confirmedPassword = e.target.children.confirmedPassword.value
  const tipoUsuario = e.target.children.tipoUsuario.value

  const res = await fetch('/changePassword', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password, confirmedPassword, tipoUsuario
    })
  })

  if (!res.ok) {
    return mensajeError.classList.toggle('escondido', false)
  }
  const resJSON = await res.json()

  if (resJSON.redirect) {
    window.location.href = resJSON.redirect
  }
})
