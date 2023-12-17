fetch('/users/allUsers')
  .then(response => response.json())
  .then(data => {
    const userTable = document.getElementById('user-table')
    const tbody = userTable.querySelector('tbody')

    if (data.status === 'Error') {
      console.error('Error:', data.message)
    } else {
      data.forEach(client => {
        const row = document.createElement('tr')

        const usernameCell = document.createElement('td')
        usernameCell.textContent = client.username
        row.appendChild(usernameCell)

        const emailCell = document.createElement('td')
        emailCell.textContent = client.email
        row.appendChild(emailCell)

        const passwordCell = document.createElement('td')
        passwordCell.textContent = client.password
        row.appendChild(passwordCell)

        const tipoUsuarioCell = document.createElement('td')
        tipoUsuarioCell.textContent = client.tipoUsuario
        row.appendChild(tipoUsuarioCell)

        // // Crear una celda para el botón
        // const viewDetailsContractCell = document.createElement('td')

        // // Crear el botón y configurar su comportamiento
        // const viewDetailsButton = document.createElement('button')
        // viewDetailsButton.textContent = 'Ver Detalles'

        // viewDetailsButton.addEventListener('click', () => {
        //   window.location.href = `/users/${client.userId}`
        // })

        // viewDetailsContractCell.appendChild(viewDetailsButton)

        // row.appendChild(viewDetailsContractCell)

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
          window.location.href = `/users/${client.userId}`
        })

        // Funcionalidad Botón Actualizar
        updateButton.addEventListener('click', () => {
          window.location.href = `/users/update/${client.userId}`
        })

        // Funcionalidad Botón Eliminar
        deleteButton.addEventListener('click', () => {
          // Mostrar mensaje de confirmación

          const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el usuario: ${client.username}?`)

          if (confirmDelete) {
            // Realizar la solicitud de eliminación
            fetch(`/users/${client.userId}`, { method: 'DELETE' })
              .then(response => response.json())
              .then(deleteData => {
                if (deleteData.status === 'ok') {
                  window.alert('Usuario eliminado exitosamente.')
                  // Puedes redirigir a otra página o actualizar la actual según tus necesidades.
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
