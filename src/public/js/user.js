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

      // USERNAME

      const usernameCell = document.createElement('td')
      usernameCell.textContent = data.username

      // Botón de Actualizar Username
      const updateUsernameButton = document.createElement('img')

      updateUsernameButton.src = '/img/editar.png'
      updateUsernameButton.alt = 'Actualizar NombreUsuario'
      updateUsernameButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar
      updateUsernameButton.addEventListener('click', () => {
        const updateForm = document.createElement('form')
        const updateFormContainer = document.querySelector('.updateFormContainer')

        updateForm.innerHTML = `
            <table>
            <thead>
              <tr>
                <th><label for="username">Nuevo Nombre de Usuario</label></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text" id="username" name="username" value="${data.username}" required>
                </td>
                <td>
                  <button type="button" id="submitUpdate">Actualizar</button>
                  <button type="button" class="rojo" id="cancelarUpdate">Cancelar</button>
                </td>
              </tr>
            </tbody>
          </table>
        `

        const submitUpdateButton = updateForm.querySelector('#submitUpdate')
        const cancelarUpdateButton = updateForm.querySelector('#cancelarUpdate')

        submitUpdateButton.addEventListener('click', () => {
          const updatedData = {
            username: updateForm.querySelector('#username').value
          }

          const confirmUpdate = window.confirm(`¿Estás seguro de que deseas actualizar el nombre de usuario: ${data.username}?`)

          if (confirmUpdate) {
            fetch(`/users/${userId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Nombre de usuario actualizado correctamente.')

                  updateFormContainer.removeChild(updateForm)

                  window.location.reload()
                } else {
                  window.alert(`${patchData.message}`)

                  console.error('Error al actualizar:', patchData.message)
                }
              })
              .catch(error => {
                console.error('Error al actualizar:', error)
              })
          }
        })

        cancelarUpdateButton.addEventListener('click', () => {
          updateFormContainer.removeChild(updateForm)
        })

        updateFormContainer.innerHTML = ''
        updateFormContainer.appendChild(updateForm)
      })

      usernameCell.appendChild(updateUsernameButton)
      row.appendChild(usernameCell)

      // EMAIL

      const emailCell = document.createElement('td')
      emailCell.textContent = data.email

      // Botón de Actualizar Email
      const updateEmailButton = document.createElement('img')

      updateEmailButton.src = '/img/editar.png'
      updateEmailButton.alt = 'Actualizar Email'
      updateEmailButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar Username
      updateEmailButton.addEventListener('click', () => {
        const updateForm = document.createElement('form')
        const updateFormContainer = document.querySelector('.updateFormContainer')

        updateForm.innerHTML = `
            <table>
            <thead>
              <tr>
                <th><label for="email">Nuevo Email</label></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text" id="email" name="email" value="${data.email}" required>
                </td>
                <td>
                  <button type="button" id="submitUpdate">Actualizar</button>
                  <button type="button" class="rojo" id="cancelarUpdate">Cancelar</button>
                </td>
              </tr>
            </tbody>
          </table>
        `

        const submitUpdateButton = updateForm.querySelector('#submitUpdate')
        const cancelarUpdateButton = updateForm.querySelector('#cancelarUpdate')

        submitUpdateButton.addEventListener('click', () => {
          const updatedData = {
            email: updateForm.querySelector('#email').value
          }

          const confirmUpdate = window.confirm(`¿Estás seguro de que deseas actualizar el email: ${data.email}?`)

          if (confirmUpdate) {
            fetch(`/users/${userId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Email actualizado correctamente.')

                  updateFormContainer.removeChild(updateForm)

                  window.location.reload()
                } else {
                  window.alert(`${patchData.message}`)

                  console.error('Error al actualizar:', patchData.message)
                }
              })
              .catch(error => {
                console.error('Error al actualizar:', error)
              })
          }
        })

        cancelarUpdateButton.addEventListener('click', () => {
          updateFormContainer.removeChild(updateForm)
        })

        updateFormContainer.innerHTML = ''
        updateFormContainer.appendChild(updateForm)
      })

      emailCell.appendChild(updateEmailButton)

      row.appendChild(emailCell)

      // CONTRASEÑA

      const passwordCell = document.createElement('td')
      passwordCell.textContent = '*****************'

      const changePasswordButton = document.createElement('img')
      changePasswordButton.src = '/img/editar.png'
      changePasswordButton.alt = 'Actualizar Contraseña'
      changePasswordButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar
      changePasswordButton.addEventListener('click', () => {
        // Crear el formulario de actualización
        const updateForm = document.createElement('form')
        const updateFormContainer = document.querySelector('.updateFormContainer')

        updateForm.innerHTML = `
            <table>
            <thead>
              <tr>
                <th><label for="password">Nueva Contraseña</label></th>
                <th><label for="confirmedPassword">Repetir Contraseña:</label></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="password" id="password" name="password" value="*****************" required>
                </td>
                <td>
                  <input type="password" id="confirmedPassword" name="confirmedPassword" value="*****************" required>
                </td>
                <td>
                  <button type="button" id="submitUpdate">Actualizar</button>
                  <button type="button" class="rojo" id="cancelarUpdate">Cancelar</button>
                </td>
              </tr>
            </tbody>
          </table>
        `

        const submitUpdateButton = updateForm.querySelector('#submitUpdate')
        const cancelarUpdateButton = updateForm.querySelector('#cancelarUpdate')

        submitUpdateButton.addEventListener('click', () => {
          const updatedData = {
            password: updateForm.querySelector('#password').value,
            confirmedPassword: updateForm.querySelector('#confirmedPassword').value
          }

          const confirmUpdate = window.confirm(`¿Estás seguro de que deseas actualizar la contraseña, ${data.username}?`)

          if (confirmUpdate) {
            fetch(`/users/${userId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Contraseña actualizada correctamente.')

                  updateFormContainer.removeChild(updateForm)

                  window.location.reload()
                } else {
                  window.alert(`${patchData.message}`)

                  console.error('Error al actualizar:', patchData.message)
                }
              })
              .catch(error => {
                console.error('Error al actualizar:', error)
              })
          }
        })

        cancelarUpdateButton.addEventListener('click', () => {
          updateFormContainer.removeChild(updateForm)
        })

        updateFormContainer.innerHTML = ''
        updateFormContainer.appendChild(updateForm)
      })

      passwordCell.appendChild(changePasswordButton)
      row.appendChild(passwordCell)

      const tipoUsuarioCell = document.createElement('td')
      tipoUsuarioCell.textContent = data.tipoUsuario
      row.appendChild(tipoUsuarioCell)

      // Botón de Eliminar
      const buttonsCell = document.createElement('td')
      const deleteButton = document.createElement('img')
      deleteButton.src = '/img/eliminar.png'
      deleteButton.alt = 'Eliminar Usuario'
      deleteButton.className = 'chiquito'

      // Funcionalidad Botón Eliminar
      deleteButton.addEventListener('click', () => {
        const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el usuario: ${data.username}?`)

        if (confirmDelete) {
          fetch(`/users/${userId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(deleteData => {
              if (deleteData.status === 'ok') {
                window.alert('Usuario eliminado correctamente.')

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

      buttonsCell.appendChild(deleteButton)
      row.appendChild(buttonsCell)

      tbody.appendChild(row)
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
