const pathParts = window.location.pathname.split('/')
const adminIndex = pathParts.indexOf('services')
const serviceId = adminIndex !== -1 && pathParts.length > adminIndex + 1 ? pathParts[adminIndex + 1] : null

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

      // Botones de Buscar, Actualizar y Eliminar
      const buttonsCell = document.createElement('td')

      const updateButton = document.createElement('img')
      const deleteButton = document.createElement('img')

      updateButton.src = '/img/editar.png'
      updateButton.alt = 'Actualizar Servicios'
      updateButton.className = 'chiquito'
      deleteButton.src = '/img/eliminar.png'
      deleteButton.alt = 'Eliminar Servicios'
      deleteButton.className = 'chiquito'

      // Funcionalidad Botón Actualizar
      updateButton.addEventListener('click', () => {
        window.location.href = `/services/update/${data.serviceId}`
      })

      // Funcionalidad Botón Eliminar
      deleteButton.addEventListener('click', () => {
        const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el servicio: ${data.tipoServicio}?`)

        if (confirmDelete) {
          fetch(`/services/${data.serviceId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(deleteData => {
              if (deleteData.status === 'ok') {
                window.alert('Servicio eliminado correctamente.')

                window.location.href = '/services'
              } else {
                console.error('Error al eliminar:', deleteData.message)
              }
            })
            .catch(error => {
              console.error('Error al eliminar:', error)
            })
        }
      })

      buttonsCell.appendChild(updateButton)
      buttonsCell.appendChild(deleteButton)
      row.appendChild(buttonsCell)

      tbody.appendChild(row)
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
