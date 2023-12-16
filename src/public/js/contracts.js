fetch('/contracts/allContracts')
  .then(response => response.json())
  .then(data => {
    const contractTable = document.getElementById('contract-table')
    const tbody = contractTable.querySelector('tbody')

    if (data.status === 'Error') {
      console.error('Error:', data.message)
    } else {
      data.forEach(client => {
        const row = document.createElement('tr')

        const fechaInicioCell = document.createElement('td')
        fechaInicioCell.textContent = client.fechaInicio
        row.appendChild(fechaInicioCell)

        const fechaFinCell = document.createElement('td')
        fechaFinCell.textContent = client.fechaFin
        row.appendChild(fechaFinCell)

        const sueldoHoraCell = document.createElement('td')
        sueldoHoraCell.textContent = client.sueldoHora
        row.appendChild(sueldoHoraCell)

        const horasSemanaCell = document.createElement('td')
        horasSemanaCell.textContent = client.horasSemana
        row.appendChild(horasSemanaCell)

        tbody.appendChild(row)
      })
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })