const pathParts = window.location.pathname.split('/')
const adminIndex = pathParts.indexOf('bus')
const busId = adminIndex !== -1 && pathParts.length > adminIndex + 1 ? pathParts[adminIndex + 1] : null

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

      // Botones de Buscar, Actualizar y Eliminar
      const buttonsCell = document.createElement('td')

      const updateButton = document.createElement('img')
      const deleteButton = document.createElement('img')

      updateButton.src = '/img/editar.png'
      updateButton.alt = 'Actualizar Autobuses'
      updateButton.className = 'chiquito'
      deleteButton.src = '/img/eliminar.png'
      deleteButton.alt = 'Eliminar Autobuses'
      deleteButton.className = 'chiquito'

      // Funcionalidad Botón Actualizar
      updateButton.addEventListener('click', () => {
        window.location.href = `/bus/update/${data.busId}`
      })

      // Funcionalidad Botón Eliminar
      deleteButton.addEventListener('click', () => {
        const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el autobús: ${data.matricula}?`)

        if (confirmDelete) {
          fetch(`/bus/${data.busId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(deleteData => {
              if (deleteData.status === 'ok') {
                window.alert('Autobús eliminado correctamente.')

                window.location.href = '/bus'
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
