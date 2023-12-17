// Obtén el path de la URL y divídelo en partes usando '/'
const pathParts = window.location.pathname.split('/')
// Encuentra la posición del segmento 'administratives'
const adminIndex = pathParts.indexOf('administratives')
// Si 'administratives' está en la URL y hay un identificador después, obtén el identificador
const employeeId = adminIndex !== -1 && pathParts.length > adminIndex + 1 ? pathParts[adminIndex + 1] : null

// // Realizar el fetch con el ID específico

fetch(`/administratives/details/${employeeId}`)
  .then(response => response.json())
  .then(data => {
    const administrativeTable = document.getElementById('administrative-table')
    const tbody = administrativeTable.querySelector('tbody')

    if (data.status === 'Error') {
      console.error('Error:', data.message)
    } else {
      const row = document.createElement('tr')

      const dniCell = document.createElement('td')
      dniCell.textContent = data.dni
      row.appendChild(dniCell)

      const nombreCell = document.createElement('td')
      nombreCell.textContent = data.nombre
      row.appendChild(nombreCell)

      const apellidosCell = document.createElement('td')
      apellidosCell.textContent = data.apellidos
      row.appendChild(apellidosCell)

      const emailCell = document.createElement('td')
      emailCell.textContent = data.email
      row.appendChild(emailCell)

      const telefonoCell = document.createElement('td')
      telefonoCell.textContent = data.telefono
      row.appendChild(telefonoCell)

      const sexoCell = document.createElement('td')
      sexoCell.textContent = data.sexo
      row.appendChild(sexoCell)

      const fechaNacimientoCell = document.createElement('td')
      fechaNacimientoCell.textContent = data.fechaNacimiento
      row.appendChild(fechaNacimientoCell)

      const direccionCell = document.createElement('td')
      direccionCell.textContent = data.direccion
      row.appendChild(direccionCell)

      // Crear una celda para el botón
      const viewDetailsContractCell = document.createElement('td')

      // Crear el botón y configurar su comportamiento
      const viewDetailsButton = document.createElement('button')
      viewDetailsButton.textContent = 'Ver Contrato'

      viewDetailsButton.addEventListener('click', () => {
        window.location.href = `/contracts/${data.contractId}`
      })

      viewDetailsContractCell.appendChild(viewDetailsButton)

      row.appendChild(viewDetailsContractCell)

      tbody.appendChild(row)
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
