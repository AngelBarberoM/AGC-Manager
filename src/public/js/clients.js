fetch('/clients/allClients')
  .then(response => response.json())
  .then(data => {
    const clientTable = document.getElementById('client-table')
    const tbody = clientTable.querySelector('tbody')

    if (data.status === 'Error') {
      console.error('Error:', data.message)
    } else {
      data.forEach(client => {
        const row = document.createElement('tr')

        const nombreEmpresaCell = document.createElement('td')
        nombreEmpresaCell.textContent = client.nombreEmpresa
        row.appendChild(nombreEmpresaCell)

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

        tbody.appendChild(row)
      })
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
