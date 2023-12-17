fetch('/bus/allBus')
  .then(response => response.json())
  .then(data => {
    const busTable = document.getElementById('bus-table')
    const tbody = busTable.querySelector('tbody')

    if (data.status === 'Error') {
      console.error('Error:', data.message)
    } else {
      data.forEach(client => {
        const row = document.createElement('tr')

        const matriculaCell = document.createElement('td')
        matriculaCell.textContent = client.matricula
        row.appendChild(matriculaCell)

        const marcaCell = document.createElement('td')
        marcaCell.textContent = client.marca
        row.appendChild(marcaCell)

        const modeloCell = document.createElement('td')
        modeloCell.textContent = client.modelo
        row.appendChild(modeloCell)

        const plazasCell = document.createElement('td')
        plazasCell.textContent = client.plazas
        row.appendChild(plazasCell)

        // Crear una celda para el botón
        const viewDetailsCell = document.createElement('td')

        // Crear el botón y configurar su comportamiento
        const viewDetailsButton = document.createElement('button')
        viewDetailsButton.textContent = 'Ver Detalles'

        viewDetailsButton.addEventListener('click', () => {
          window.location.href = `/bus/${client.busId}`
        })

        viewDetailsCell.appendChild(viewDetailsButton)

        row.appendChild(viewDetailsCell)

        tbody.appendChild(row)
      })
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
