document.addEventListener('DOMContentLoaded', function () {
  const contractIdSelect = document.getElementById('contractId')

  fetch('/contracts/allContracts')
    .then(response => response.json())
    .then(contractsData => {
      const defaultOption = document.createElement('option')
      defaultOption.value = ''
      defaultOption.textContent = 'Selecciona un contrato'
      contractIdSelect.appendChild(defaultOption)

      contractsData.forEach(client => {
        const option = document.createElement('option')
        option.value = client.contractId
        option.textContent = `${client.fechaInicio} / ${client.fechaFin}`
        contractIdSelect.appendChild(option)
      })
    })
    .catch(error => {
      console.error('Error al obtener los contratos del sistema', error)
    })

  document.getElementById('createDriver-form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const dni = e.target.elements.dni.value
    const nombre = e.target.elements.nombre.value
    const apellidos = e.target.elements.apellidos.value
    const email = e.target.elements.email.value
    const telefono = e.target.elements.telefono.value
    const sexo = e.target.elements.sexo.value
    const fechaNacimiento = e.target.elements.fechaNacimiento.value
    const direccion = e.target.elements.direccion.value
    const contractId = e.target.elements.contractId.value
    const permisoConducir = e.target.elements.permisoConducir.value
    const tarjetaCAP = e.target.elements.tarjetaCAP.value
    const tarjetaTacografo = e.target.elements.tarjetaTacografo.value
    const certificadoAntecedentes = e.target.elements.certificadoAntecedentes.value

    const confirmCreate = window.confirm('¿Estás seguro de que deseas crear este conductor?')

    if (confirmCreate) {
      fetch('/drivers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, contractId, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes
        })
      })
        .then(response => response.json())
        .then(patchData => {
          if (patchData.status === 'ok') {
            window.alert('Conductor creado correctamente.')

            window.location.href = '/drivers'
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
    window.location.href = '/drivers'
  })
})
