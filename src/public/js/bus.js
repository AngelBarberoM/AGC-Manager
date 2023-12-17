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

        // Botones de Buscar, Actualizar y Eliminar
        const buttonsCell = document.createElement('td')
        const searchButton = document.createElement('img')
        const updateButton = document.createElement('img')
        const deleteButton = document.createElement('img')

        searchButton.src = '/img/lupa.png'
        searchButton.alt = 'Actualizar Autobuses'
        searchButton.className = 'chiquito'
        updateButton.src = '/img/editar.png'
        updateButton.alt = 'Actualizar Autobuses'
        updateButton.className = 'chiquito'
        deleteButton.src = '/img/eliminar.png'
        deleteButton.alt = 'Eliminar Autobuses'
        deleteButton.className = 'chiquito'

        // Funcionalidad Botón Buscar
        searchButton.addEventListener('click', () => {
          window.location.href = `/bus/${client.busId}`
        })

        // Funcionalidad Botón Actualizar
        updateButton.addEventListener('click', () => {
          window.location.href = `/bus/update/${client.busId}`
        })

        // Funcionalidad Botón Eliminar
        deleteButton.addEventListener('click', () => {
          const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el autobús: ${client.matricula}?`)

          if (confirmDelete) {
            fetch(`/bus/${client.busId}`, { method: 'DELETE' })
              .then(response => response.json())
              .then(deleteData => {
                if (deleteData.status === 'ok') {
                  window.alert('Autobús eliminado exitosamente.')

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
