fetch('/employees/allAdministratives')
  .then(response => response.json())
  .then(data => {
    const administrativeTable = document.getElementById('administrative-table')
    const tbody = administrativeTable.querySelector('tbody')

    if (data.status === 'Error') {
      console.error('Error:', data.message)
    } else {
      data.forEach(client => {
        const row = document.createElement('tr')

        const dniCell = document.createElement('td')
        dniCell.textContent = client.dni
        row.appendChild(dniCell)

        const nombreCell = document.createElement('td')
        nombreCell.textContent = client.nombre
        row.appendChild(nombreCell)

        const apellidosCell = document.createElement('td')
        apellidosCell.textContent = client.apellidos
        row.appendChild(apellidosCell)

        const emailCell = document.createElement('td')
        emailCell.textContent = client.email
        row.appendChild(emailCell)

        const telefonoCell = document.createElement('td')
        telefonoCell.textContent = client.telefono
        row.appendChild(telefonoCell)

        const sexoCell = document.createElement('td')
        sexoCell.textContent = client.sexo
        row.appendChild(sexoCell)

        const fechaNacimientoCell = document.createElement('td')
        fechaNacimientoCell.textContent = client.fechaNacimiento
        row.appendChild(fechaNacimientoCell)

        const direccionCell = document.createElement('td')
        direccionCell.textContent = client.direccion
        row.appendChild(direccionCell)

        const contratoIdCell = document.createElement('td')
        contratoIdCell.textContent = client.contractId
        row.appendChild(contratoIdCell)

        tbody.appendChild(row)
      })
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })

fetch('/employees/allDrivers')
  .then(response => response.json())
  .then(data => {
    const driverTable = document.getElementById('driver-table')
    const tbody = driverTable.querySelector('tbody')

    if (data.status === 'Error') {
      console.error('Error:', data.message)
    } else {
      data.forEach(client => {
        const row = document.createElement('tr')

        const dniCell = document.createElement('td')
        dniCell.textContent = client.dni
        row.appendChild(dniCell)

        const nombreCell = document.createElement('td')
        nombreCell.textContent = client.nombre
        row.appendChild(nombreCell)

        const apellidosCell = document.createElement('td')
        apellidosCell.textContent = client.apellidos
        row.appendChild(apellidosCell)

        const emailCell = document.createElement('td')
        emailCell.textContent = client.email
        row.appendChild(emailCell)

        const telefonoCell = document.createElement('td')
        telefonoCell.textContent = client.telefono
        row.appendChild(telefonoCell)

        const sexoCell = document.createElement('td')
        sexoCell.textContent = client.sexo
        row.appendChild(sexoCell)

        const fechaNacimientoCell = document.createElement('td')
        fechaNacimientoCell.textContent = client.fechaNacimiento
        row.appendChild(fechaNacimientoCell)

        const direccionCell = document.createElement('td')
        direccionCell.textContent = client.direccion
        row.appendChild(direccionCell)

        const permisoConducirCell = document.createElement('td')
        permisoConducirCell.textContent = client.permisoConducir
        row.appendChild(permisoConducirCell)

        const tarjetaCAPCell = document.createElement('td')
        tarjetaCAPCell.textContent = client.tarjetaCAP
        row.appendChild(tarjetaCAPCell)

        const tarjetaTacografoCell = document.createElement('td')
        tarjetaTacografoCell.textContent = client.tarjetaTacografo
        row.appendChild(tarjetaTacografoCell)

        const certificadoAntecedentesCell = document.createElement('td')
        certificadoAntecedentesCell.textContent = client.certificadoAntecedentes
        row.appendChild(certificadoAntecedentesCell)

        const contratoIdCell = document.createElement('td')
        contratoIdCell.textContent = client.contractId
        row.appendChild(contratoIdCell)

        tbody.appendChild(row)
      })
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })