// Obtén el path de la URL y divídelo en partes usando '/'
const pathParts = window.location.pathname.split('/')
// Encuentra la posición del segmento 'administratives'
const adminIndex = pathParts.indexOf('contracts')
// Si 'administratives' está en la URL y hay un identificador después, obtén el identificador
const contractId = adminIndex !== -1 && pathParts.length > adminIndex + 1 ? pathParts[adminIndex + 1] : null

// // Realizar el fetch con el ID específico

fetch(`/contracts/details/${contractId}`)
  .then(response => response.json())
  .then(data => {
    const contractTable = document.getElementById('contract-table')
    const tbody = contractTable.querySelector('tbody')

    if (data.status === 'Error') {
      console.error('Error:', data.message)
    } else {
      const row = document.createElement('tr')

      const fechaInicioCell = document.createElement('td')
      fechaInicioCell.textContent = data.fechaInicio
      row.appendChild(fechaInicioCell)

      const fechaFinCell = document.createElement('td')
      fechaFinCell.textContent = data.fechaFin
      row.appendChild(fechaFinCell)

      const sueldoHoraCell = document.createElement('td')
      sueldoHoraCell.textContent = data.sueldoHora
      row.appendChild(sueldoHoraCell)

      const horasSemanaCell = document.createElement('td')
      horasSemanaCell.textContent = data.horasSemana
      row.appendChild(horasSemanaCell)

      tbody.appendChild(row)
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
