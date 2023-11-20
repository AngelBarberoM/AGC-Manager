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

        const conductorIdCell = document.createElement('td')
        conductorIdCell.textContent = client.employeeId
        row.appendChild(conductorIdCell)

        tbody.appendChild(row)
      })
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
