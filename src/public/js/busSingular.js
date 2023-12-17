// Obtén el path de la URL y divídelo en partes usando '/'
const pathParts = window.location.pathname.split('/')
// Encuentra la posición del segmento 'administratives'
const adminIndex = pathParts.indexOf('bus')
// Si 'administratives' está en la URL y hay un identificador después, obtén el identificador
const busId = adminIndex !== -1 && pathParts.length > adminIndex + 1 ? pathParts[adminIndex + 1] : null

// // Realizar el fetch con el ID específico

fetch(`/bus/details/${busId}`)
  .then(response => response.json())
  .then(data => {
    const busTable = document.getElementById('bus-table')
    const tbody = busTable.querySelector('tbody')

    if (data.status === 'Error') {
      console.error('Error:', data.message)
    } else {
      const row = document.createElement('tr')

      const matriculaCell = document.createElement('td')
      matriculaCell.textContent = data.matricula
      row.appendChild(matriculaCell)

      const marcaCell = document.createElement('td')
      marcaCell.textContent = data.marca
      row.appendChild(marcaCell)

      const modeloCell = document.createElement('td')
      modeloCell.textContent = data.modelo
      row.appendChild(modeloCell)

      const plazasCell = document.createElement('td')
      plazasCell.textContent = data.plazas
      row.appendChild(plazasCell)

      // Crear una celda para el botón
      const viewDetailsDriverCell = document.createElement('td')

      // Crear el botón y configurar su comportamiento
      const viewDetailsButton = document.createElement('button')
      viewDetailsButton.textContent = 'Ver Conductor'

      viewDetailsButton.addEventListener('click', () => {
        window.location.href = `/drivers/${data.employeeId}`
      })

      viewDetailsDriverCell.appendChild(viewDetailsButton)

      row.appendChild(viewDetailsDriverCell)

      tbody.appendChild(row)
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
