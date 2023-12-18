const pathParts = window.location.pathname.split('/')
const adminIndex = pathParts.indexOf('users')
const userId = adminIndex !== -1 && pathParts.length > adminIndex + 1 ? pathParts[adminIndex + 1] : null

fetch(`/users/details/${userId}`)
  .then(response => response.json())
  .then(data => {
    const userTable = document.getElementById('user-table')
    const tbody = userTable.querySelector('tbody')

    if (data.status === 'Error') {
      console.error('Error:', data.message)
    } else {
      const row = document.createElement('tr')

      const usernameCell = document.createElement('td')
      usernameCell.textContent = data.username
      row.appendChild(usernameCell)

      const emailCell = document.createElement('td')
      emailCell.textContent = data.email
      row.appendChild(emailCell)

      const passwordCell = document.createElement('td')
      passwordCell.textContent = data.password
      row.appendChild(passwordCell)

      const tipoUsuarioCell = document.createElement('td')
      tipoUsuarioCell.textContent = data.tipoUsuario
      row.appendChild(tipoUsuarioCell)

      // Botones de Actualizar y Eliminar
      const buttonsCell = document.createElement('td')
      const updateButton = document.createElement('img')
      const deleteButton = document.createElement('img')

      updateButton.src = '/img/editar.png'
      updateButton.alt = 'Actualizar Usuario'
      updateButton.className = 'chiquito'
      deleteButton.src = '/img/eliminar.png'
      deleteButton.alt = 'Eliminar Usuario'
      deleteButton.className = 'chiquito'

      // Funcionalidad Botón Actualizar
      updateButton.addEventListener('click', () => {
        window.location.href = `/users/update/${userId}`
      })

      // Funcionalidad Botón Eliminar
      deleteButton.addEventListener('click', () => {
        const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el usuario: ${data.username}?`)

        if (confirmDelete) {
          fetch(`/users/${userId}`, { method: 'DELETE' })
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

      buttonsCell.appendChild(updateButton)
      buttonsCell.appendChild(deleteButton)
      row.appendChild(buttonsCell)

      tbody.appendChild(row)
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
