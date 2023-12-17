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

        // Botones de Buscar, Actualizar y Eliminar
        const buttonsCell = document.createElement('td')
        const searchButton = document.createElement('img')
        const updateButton = document.createElement('img')
        const deleteButton = document.createElement('img')

        searchButton.src = '/img/lupa.png'
        searchButton.alt = 'Actualizar Contrato'
        searchButton.className = 'chiquito'
        updateButton.src = '/img/editar.png'
        updateButton.alt = 'Actualizar Contrato'
        updateButton.className = 'chiquito'
        deleteButton.src = '/img/eliminar.png'
        deleteButton.alt = 'Eliminar Contrato'
        deleteButton.className = 'chiquito'

        // Funcionalidad Botón Buscar
        searchButton.addEventListener('click', () => {
          window.location.href = `/contracts/${client.contractId}`
        })

        // Funcionalidad Botón Actualizar
        updateButton.addEventListener('click', () => {
          window.location.href = `/contracts/update/${client.contractId}`
        })

        // Funcionalidad Botón Eliminar
        deleteButton.addEventListener('click', () => {
          const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar el contrato?')

          if (confirmDelete) {
            fetch(`/contracts/${client.contractId}`, { method: 'DELETE' })
              .then(response => response.json())
              .then(deleteData => {
                if (deleteData.status === 'ok') {
                  window.alert('Contrato eliminado exitosamente.')

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
