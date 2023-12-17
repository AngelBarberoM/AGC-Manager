fetch('/services/allServices')
  .then(response => response.json())
  .then(data => {
    const serviceTable = document.getElementById('service-table')
    const tbody = serviceTable.querySelector('tbody')

    if (data.status === 'Error') {
      console.error('Error:', data.message)
    } else {
      data.forEach(client => {
        const row = document.createElement('tr')

        const tipoServicioCell = document.createElement('td')
        tipoServicioCell.textContent = client.tipoServicio
        row.appendChild(tipoServicioCell)

        const descripcionCell = document.createElement('td')
        descripcionCell.textContent = client.descripcion
        row.appendChild(descripcionCell)

        const fechaServicioCell = document.createElement('td')
        fechaServicioCell.textContent = client.fechaServicio
        row.appendChild(fechaServicioCell)

        const fechaCreacionCell = document.createElement('td')
        fechaCreacionCell.textContent = client.fechaCreacion
        row.appendChild(fechaCreacionCell)

        const clientIdCell = document.createElement('td')
        clientIdCell.textContent = client.clientId
        row.appendChild(clientIdCell)

        // Crear una celda para el botón
        const viewDetailsContractCell = document.createElement('td')

        // Crear el botón y configurar su comportamiento
        const viewDetailsButton = document.createElement('button')
        viewDetailsButton.textContent = 'Ver Detalles'

        viewDetailsButton.addEventListener('click', () => {
          window.location.href = `/services/${client.serviceId}`
        })

        viewDetailsContractCell.appendChild(viewDetailsButton)

        row.appendChild(viewDetailsContractCell)

        tbody.appendChild(row)
      })
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
