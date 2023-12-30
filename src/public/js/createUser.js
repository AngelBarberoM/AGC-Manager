document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('createUser-form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const username = e.target.elements.username.value
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value
    const confirmedPassword = e.target.elements.confirmedPassword.value
    const tipoUsuario = e.target.elements.tipoUsuario.value

    const confirmCreate = window.confirm('¿Estás seguro de que deseas crear este usuario?')

    if (confirmCreate) {
      fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username, email, password, confirmedPassword, tipoUsuario
        })
      })
        .then(response => response.json())
        .then(patchData => {
          if (patchData.status === 'ok') {
            window.alert('Usuario creado correctamente.')

            window.location.href = '/users'
          } else {
            window.alert(`${patchData.message}`)

            console.error('Error al crear:', patchData.message)
          }
        })
        .catch(error => {
          console.error('Error al crear:', error)
        })
    }
  })

  document.getElementById('cancelarCreate').addEventListener('click', function () {
    window.location.href = '/users'
  })
})
