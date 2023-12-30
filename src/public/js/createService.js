document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('createService-form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const tipoServicio = e.target.elements.tipoServicio.value
    const descripcion = e.target.elements.descripcion.value
    const fechaServicio = e.target.elements.fechaServicio.value
    const fechaCreacion = e.target.elements.fechaCreacion.value
    const clientId = e.target.elements.clientId.value

    const confirmCreate = window.confirm('¿Estás seguro de que deseas crear este servicio?')

    if (confirmCreate) {
      fetch('/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tipoServicio, descripcion, fechaServicio, fechaCreacion, clientId
        })
      })
        .then(response => response.json())
        .then(patchData => {
          if (patchData.status === 'ok') {
            window.alert('Servicio creado correctamente.')

            window.location.href = '/services'
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
    window.location.href = '/services'
  })
})
