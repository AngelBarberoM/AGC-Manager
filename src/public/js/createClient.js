document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('createClient-form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const nombreEmpresa = e.target.elements.nombreEmpresa.value
    const dni = e.target.elements.dni.value
    const nombre = e.target.elements.nombre.value
    const apellidos = e.target.elements.apellidos.value
    const email = e.target.elements.email.value
    const telefono = e.target.elements.telefono.value
    const fechaNacimiento = e.target.elements.fechaNacimiento.value
    const direccion = e.target.elements.direccion.value

    const confirmCreate = window.confirm('¿Estás seguro de que deseas crear este cliente?')

    if (confirmCreate) {
      fetch('/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombreEmpresa, dni, nombre, apellidos, email, telefono, fechaNacimiento, direccion
        })
      })
        .then(response => response.json())
        .then(patchData => {
          if (patchData.status === 'ok') {
            window.alert('Cliente creado correctamente.')

            window.location.href = '/clients'
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
    window.location.href = '/clients'
  })
})
