document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('createBus-form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const matricula = e.target.elements.matricula.value
    const marca = e.target.elements.marca.value
    const modelo = e.target.elements.modelo.value
    const plazas = Number(e.target.elements.plazas.value)
    const employeeId = e.target.elements.employeeId.value

    const confirmCreate = window.confirm('¿Estás seguro de que deseas crear este autobús?')

    if (confirmCreate) {
      fetch('/bus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          matricula, marca, modelo, plazas, employeeId
        })
      })
        .then(response => response.json())
        .then(patchData => {
          if (patchData.status === 'ok') {
            window.alert('Autobús creado correctamente.')

            window.location.href = '/bus'
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
    window.location.href = '/bus'
  })
})
