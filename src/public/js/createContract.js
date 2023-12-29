document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('createContract-form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const fechaInicio = e.target.elements.fechaInicio.value
    const fechaFin = e.target.elements.fechaFin.value
    const sueldoHora = Number(e.target.elements.sueldoHora.value)
    const horasSemana = Number(e.target.elements.horasSemana.value)

    const confirmCreate = window.confirm('¿Estás seguro de que deseas crear este contrato?')

    if (confirmCreate) {
      fetch('/contracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fechaInicio, fechaFin, sueldoHora, horasSemana
        })
      })
        .then(response => response.json())
        .then(patchData => {
          if (patchData.status === 'ok') {
            window.alert('Contrato creado correctamente.')

            window.location.href('/contracts')
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
    window.location.href = '/contracts'
  })
})
