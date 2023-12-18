const pathParts = window.location.pathname.split('/')
const adminIndex = pathParts.indexOf('administratives')
const employeeId = adminIndex !== -1 && pathParts.length > adminIndex + 1 ? pathParts[adminIndex + 1] : null

fetch(`/administratives/details/${employeeId}`)
  .then(response => response.json())
  .then(data => {
    const administrativeTable = document.getElementById('administrative-table')
    const tbody = administrativeTable.querySelector('tbody')

    if (data.status === 'Error') {
      console.error('Error:', data.message)
    } else {
      const row = document.createElement('tr')

      const dniCell = document.createElement('td')
      dniCell.textContent = data.dni
      row.appendChild(dniCell)

      const nombreCell = document.createElement('td')
      nombreCell.textContent = data.nombre
      row.appendChild(nombreCell)

      const apellidosCell = document.createElement('td')
      apellidosCell.textContent = data.apellidos
      row.appendChild(apellidosCell)

      const emailCell = document.createElement('td')
      emailCell.textContent = data.email
      row.appendChild(emailCell)

      const telefonoCell = document.createElement('td')
      telefonoCell.textContent = data.telefono
      row.appendChild(telefonoCell)

      const sexoCell = document.createElement('td')
      sexoCell.textContent = data.sexo
      row.appendChild(sexoCell)

      const fechaNacimientoCell = document.createElement('td')
      fechaNacimientoCell.textContent = data.fechaNacimiento
      row.appendChild(fechaNacimientoCell)

      const direccionCell = document.createElement('td')
      direccionCell.textContent = data.direccion
      row.appendChild(direccionCell)

      // Crear una celda para el botón
      const viewDetailsContractCell = document.createElement('td')

      // Crear el botón y configurar su comportamiento
      const viewDetailsButton = document.createElement('button')
      viewDetailsButton.textContent = 'Ver Contrato'

      viewDetailsButton.addEventListener('click', () => {
        window.location.href = `/contracts/${data.contractId}`
      })

      viewDetailsContractCell.appendChild(viewDetailsButton)

      row.appendChild(viewDetailsContractCell)

      // Botones de Buscar, Actualizar y Eliminar
      const buttonsCell = document.createElement('td')

      const updateButton = document.createElement('img')
      const deleteButton = document.createElement('img')

      updateButton.src = '/img/editar.png'
      updateButton.alt = 'Actualizar Administrativo'
      updateButton.className = 'chiquito'
      deleteButton.src = '/img/eliminar.png'
      deleteButton.alt = 'Eliminar Administrativo'
      deleteButton.className = 'chiquito'

      // Funcionalidad Botón Actualizar
      updateButton.addEventListener('click', () => {
        window.location.href = `/administratives/update/${data.employeeId}`
      })

      // Funcionalidad Botón Eliminar
      deleteButton.addEventListener('click', () => {
        const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el administrativo: ${data.nombre} ${data.apellidos}?`)

        if (confirmDelete) {
          fetch(`/administratives/${data.employeeId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(deleteData => {
              if (deleteData.status === 'ok') {
                window.alert('Administrativo eliminado correctamente.')

                window.location.href = '/employees'
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

      tbody.appendChild(row)
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
