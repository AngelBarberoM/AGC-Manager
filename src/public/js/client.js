const pathParts = window.location.pathname.split('/')
const adminIndex = pathParts.indexOf('clients')
const clientId = adminIndex !== -1 && pathParts.length > adminIndex + 1 ? pathParts[adminIndex + 1] : null

fetch(`/clients/details/${clientId}`)
  .then(response => response.json())
  .then(data => {
    const clientTable = document.getElementById('client-table')
    const tbody = clientTable.querySelector('tbody')

    if (data.status === 'Error') {
      console.error('Error:', data.message)
    } else {
      const row = document.createElement('tr')

      const nombreEmpresaCell = document.createElement('td')
      nombreEmpresaCell.textContent = data.nombreEmpresa
      row.appendChild(nombreEmpresaCell)

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

      // Botones de Buscar, Actualizar y Eliminar
      const buttonsCell = document.createElement('td')

      const updateButton = document.createElement('img')
      const deleteButton = document.createElement('img')

      updateButton.src = '/img/editar.png'
      updateButton.alt = 'Actualizar Clientes'
      updateButton.className = 'chiquito'
      deleteButton.src = '/img/eliminar.png'
      deleteButton.alt = 'Eliminar Clientes'
      deleteButton.className = 'chiquito'

      // Funcionalidad Botón Actualizar
      updateButton.addEventListener('click', () => {
        window.location.href = `/clients/update/${data.clientId}`
      })

      // Funcionalidad Botón Eliminar
      deleteButton.addEventListener('click', () => {
        const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el cliente: ${data.nombre} ${data.apellidos}??`)

        if (confirmDelete) {
          fetch(`/clients/${data.clientId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(deleteData => {
              if (deleteData.status === 'ok') {
                window.alert('Cliente eliminado correctamente.')

                window.location.href = '/clients'
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
