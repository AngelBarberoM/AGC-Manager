// Obtén el path de la URL y divídelo en partes usando '/'
const pathParts = window.location.pathname.split('/')
// Encuentra la posición del segmento 'administratives'
const adminIndex = pathParts.indexOf('services')
// Si 'administratives' está en la URL y hay un identificador después, obtén el identificador
const serviceId = adminIndex !== -1 && pathParts.length > adminIndex + 1 ? pathParts[adminIndex + 1] : null

// // Realizar el fetch con el ID específico

fetch(`/services/details/${serviceId}`)
  .then(response => response.json())
  .then(data => {
    const serviceTable = document.getElementById('service-table')
    const tbody = serviceTable.querySelector('tbody')

    if (data.status === 'Error') {
      console.error('Error:', data.message)
    } else {
      const row = document.createElement('tr')

      const tipoServicioCell = document.createElement('td')
      tipoServicioCell.textContent = data.tipoServicio
      row.appendChild(tipoServicioCell)

      const descripcionCell = document.createElement('td')
      descripcionCell.textContent = data.descripcion
      row.appendChild(descripcionCell)

      const fechaServicioCell = document.createElement('td')
      fechaServicioCell.textContent = data.fechaServicio
      row.appendChild(fechaServicioCell)

      const fechaCreacionCell = document.createElement('td')
      fechaCreacionCell.textContent = data.fechaCreacion
      row.appendChild(fechaCreacionCell)

      const clientIdCell = document.createElement('td')
      clientIdCell.textContent = data.clientId
      row.appendChild(clientIdCell)

      // Crear una celda para el botón
      const viewDetailsClientCell = document.createElement('td')

      // Crear el botón y configurar su comportamiento
      const viewDetailsButton = document.createElement('button')
      viewDetailsButton.textContent = 'Ver Cliente'

      viewDetailsButton.addEventListener('click', () => {
        window.location.href = `/clients/${data.clientId}`
      })

      viewDetailsClientCell.appendChild(viewDetailsButton)

      row.appendChild(viewDetailsClientCell)

      tbody.appendChild(row)
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
