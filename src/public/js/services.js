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

        // Botones de Actualizar y Eliminar
        const buttonsCell = document.createElement('td')
        const searchButton = document.createElement('img')
        const updateButton = document.createElement('img')
        const deleteButton = document.createElement('img')

        searchButton.src = '/img/lupa.png'
        searchButton.alt = 'Actualizar Usuario'
        searchButton.className = 'chiquito'
        updateButton.src = '/img/editar.png'
        updateButton.alt = 'Actualizar Usuario'
        updateButton.className = 'chiquito'
        deleteButton.src = '/img/eliminar.png'
        deleteButton.alt = 'Eliminar Usuario'
        deleteButton.className = 'chiquito'

        // Funcionalidad Botón Buscar
        searchButton.addEventListener('click', () => {
          window.location.href = `/services/${client.serviceId}`
        })

        // Funcionalidad Botón Actualizar
        updateButton.addEventListener('click', () => {
          window.location.href = `/services/update/${client.serviceId}`
        })

        // Funcionalidad Botón Eliminar
        deleteButton.addEventListener('click', () => {
          const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el servicio: ${client.tipoServicio}?`)

          if (confirmDelete) {
            fetch(`/services/${client.serviceId}`, { method: 'DELETE' })
              .then(response => response.json())
              .then(deleteData => {
                if (deleteData.status === 'ok') {
                  window.alert('Usuario eliminado exitosamente.')

                  window.location.href = '/home'
                } else {
                  console.error('Error al eliminar:', deleteData.message)
                }
              })
              .catch(error => {
                console.error('Error al eliminar:', error)
              })
          }
        })

        buttonsCell.appendChild(searchButton)
        buttonsCell.appendChild(updateButton)
        buttonsCell.appendChild(deleteButton)
        row.appendChild(buttonsCell)

        tbody.appendChild(row)
      })
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
