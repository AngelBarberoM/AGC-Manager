fetch('/administratives/allAdministratives')
  .then(response => response.json())
  .then(data => {
    const administrativeTable = document.getElementById('administrative-table')
    const tbody = administrativeTable.querySelector('tbody')

    if (data.status === 'Error') {
      console.error('Error:', data.message)
    } else {
      data.forEach(client => {
        const row = document.createElement('tr')

        const nombreCell = document.createElement('td')
        nombreCell.textContent = client.nombre
        row.appendChild(nombreCell)

        const apellidosCell = document.createElement('td')
        apellidosCell.textContent = client.apellidos
        row.appendChild(apellidosCell)

        const dniCell = document.createElement('td')
        dniCell.textContent = client.dni
        row.appendChild(dniCell)

        const emailCell = document.createElement('td')
        emailCell.textContent = client.email
        row.appendChild(emailCell)

        const telefonoCell = document.createElement('td')
        telefonoCell.textContent = client.telefono
        row.appendChild(telefonoCell)

        // Botones de Buscar y Eliminar
        const buttonsCell = document.createElement('td')
        const searchButton = document.createElement('img')

        const deleteButton = document.createElement('img')

        searchButton.src = '/img/lupa.png'
        searchButton.alt = 'Actualizar Administrativo'
        searchButton.className = 'chiquito'
        deleteButton.src = '/img/eliminar.png'
        deleteButton.alt = 'Eliminar Administrativo'
        deleteButton.className = 'chiquito'

        // Funcionalidad Botón Buscar
        searchButton.addEventListener('click', () => {
          window.location.href = `/administratives/${client.employeeId}`
        })

        // Funcionalidad Botón Eliminar
        deleteButton.addEventListener('click', () => {
          const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el administrativo: ${client.nombre} ${client.apellidos}?`)

          if (confirmDelete) {
            fetch(`/administratives/${client.employeeId}`, { method: 'DELETE' })
              .then(response => response.json())
              .then(deleteData => {
                if (deleteData.status === 'ok') {
                  window.alert('Administrativo eliminado correctamente.')

                  window.location.reload()
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

        buttonsCell.appendChild(deleteButton)
        row.appendChild(buttonsCell)

        tbody.appendChild(row)
      })
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })

fetch('/drivers/allDrivers')
  .then(response => response.json())
  .then(data => {
    const driverTable = document.getElementById('driver-table')
    const tbody = driverTable.querySelector('tbody')

    if (data.status === 'Error') {
      console.error('Error:', data.message)
    } else {
      data.forEach(client => {
        const row = document.createElement('tr')

        const nombreCell = document.createElement('td')
        nombreCell.textContent = client.nombre
        row.appendChild(nombreCell)

        const apellidosCell = document.createElement('td')
        apellidosCell.textContent = client.apellidos
        row.appendChild(apellidosCell)

        const dniCell = document.createElement('td')
        dniCell.textContent = client.dni
        row.appendChild(dniCell)

        const emailCell = document.createElement('td')
        emailCell.textContent = client.email
        row.appendChild(emailCell)

        const telefonoCell = document.createElement('td')
        telefonoCell.textContent = client.telefono
        row.appendChild(telefonoCell)

        // Botones de Buscar, Actualizar y Eliminar
        const buttonsCell = document.createElement('td')
        const searchButton = document.createElement('img')

        const deleteButton = document.createElement('img')

        searchButton.src = '/img/lupa.png'
        searchButton.alt = 'Actualizar Conductor'
        searchButton.className = 'chiquito'
        deleteButton.src = '/img/eliminar.png'
        deleteButton.alt = 'Eliminar Conductor'
        deleteButton.className = 'chiquito'

        // Funcionalidad Botón Buscar
        searchButton.addEventListener('click', () => {
          window.location.href = `/drivers/${client.employeeId}`
        })

        // Funcionalidad Botón Eliminar
        deleteButton.addEventListener('click', () => {
          const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el conductor: ${client.nombre} ${client.apellidos}?`)

          if (confirmDelete) {
            fetch(`/drivers/${client.employeeId}`, { method: 'DELETE' })
              .then(response => response.json())
              .then(deleteData => {
                if (deleteData.status === 'ok') {
                  window.alert('Conductor eliminado correctamente.')

                  window.location.reload()
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
        buttonsCell.appendChild(deleteButton)
        row.appendChild(buttonsCell)

        tbody.appendChild(row)
      })
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
