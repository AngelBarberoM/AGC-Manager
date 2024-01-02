document.addEventListener('DOMContentLoaded', function () {
  const employeeIdSelect = document.getElementById('employeeId')

  fetch('/drivers/allDrivers')
    .then(response => response.json())
    .then(clientsData => {
      const defaultOption = document.createElement('option')
      defaultOption.value = ''
      defaultOption.textContent = 'Selecciona un conductor'
      employeeIdSelect.appendChild(defaultOption)

      clientsData.forEach(client => {
        const option = document.createElement('option')
        option.value = client.employeeId
        option.textContent = `${client.nombre} ${client.apellidos}`
        employeeIdSelect.appendChild(option)
      })
    })
    .catch(error => {
      console.error('Error al obtener los conductores del sistema', error)
    })

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
