// Obtén el path de la URL y divídelo en partes usando '/'
const pathParts = window.location.pathname.split('/')
// Encuentra la posición del segmento 'administratives'
const adminIndex = pathParts.indexOf('drivers')
// Si 'administratives' está en la URL y hay un identificador después, obtén el identificador
const employeeId = adminIndex !== -1 && pathParts.length > adminIndex + 1 ? pathParts[adminIndex + 1] : null

// // Realizar el fetch con el ID específico

fetch(`/drivers/details/${employeeId}`)
  .then(response => response.json())
  .then(data => {
    const driverTable = document.getElementById('driver-table')
    const tbody = driverTable.querySelector('tbody')

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

      const permisoConducirCell = document.createElement('td')
      permisoConducirCell.textContent = data.permisoConducir
      row.appendChild(permisoConducirCell)

      const tarjetaCAPCell = document.createElement('td')
      tarjetaCAPCell.textContent = data.tarjetaCAP
      row.appendChild(tarjetaCAPCell)

      const tarjetaTacografoCell = document.createElement('td')
      tarjetaTacografoCell.textContent = data.tarjetaTacografo
      row.appendChild(tarjetaTacografoCell)

      const certificadoAntecedentesCell = document.createElement('td')
      certificadoAntecedentesCell.textContent = data.certificadoAntecedentes
      row.appendChild(certificadoAntecedentesCell)

      const contractCell = document.createElement('td')
      contractCell.textContent = data.contractId
      row.appendChild(contractCell)

      tbody.appendChild(row)
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
