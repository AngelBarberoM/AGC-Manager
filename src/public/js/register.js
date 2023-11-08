const mensajeError = document.getElementsByClassName('error')[0]

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const username = e.target.children.username.value
  const email = e.target.children.email.value
  const password = e.target.children.password.value
  const confirmedPassword = e.target.children.confirmedPassword.value

  const res = await fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username, email, password, confirmedPassword
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
