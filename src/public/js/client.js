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
      // Botón de Actualizar NombreEmpresa
      const updateNombreEmpresaButton = document.createElement('img')

      updateNombreEmpresaButton.src = '/img/editar.png'
      updateNombreEmpresaButton.alt = 'Actualizar NombreEmpresa'
      updateNombreEmpresaButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar
      updateNombreEmpresaButton.addEventListener('click', () => {
        const updateForm = document.createElement('form')
        const updateFormContainer = document.querySelector('.updateFormContainer')

        updateForm.innerHTML = `
            <table>
            <thead>
              <tr>
                <th><label for="nombreEmpresa">Nuevo Nombre de Empresa</label></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text" id="nombreEmpresa" name="nombreEmpresa" value="${data.nombreEmpresa}" required>
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
            nombreEmpresa: updateForm.querySelector('#nombreEmpresa').value
          }

          const confirmUpdate = window.confirm(`¿Estás seguro de que deseas actualizar la nombreEmpresa: ${data.nombreEmpresa}?`)

          if (confirmUpdate) {
            fetch(`/clients/${clientId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Nombre Empresa actualizado correctamente.')

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

      nombreEmpresaCell.appendChild(updateNombreEmpresaButton)
      row.appendChild(nombreEmpresaCell)

      // DNI

      const dniCell = document.createElement('td')
      dniCell.textContent = data.dni
      row.appendChild(dniCell)

      // NOMBRE

      const nombreCell = document.createElement('td')
      nombreCell.textContent = data.nombre
      row.appendChild(nombreCell)

      // APELLIDOS

      const apellidosCell = document.createElement('td')
      apellidosCell.textContent = data.apellidos
      row.appendChild(apellidosCell)

      // EMAIL

      const emailCell = document.createElement('td')
      emailCell.textContent = data.email

      // Botón de Actualizar Email
      const updateEmailButton = document.createElement('img')

      updateEmailButton.src = '/img/editar.png'
      updateEmailButton.alt = 'Actualizar Email'
      updateEmailButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar
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
            fetch(`/clients/${clientId}`, {
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

      // TELEFONO

      const telefonoCell = document.createElement('td')
      telefonoCell.textContent = data.telefono

      // Botón de Actualizar Telefono
      const updateTelefonoButton = document.createElement('img')

      updateTelefonoButton.src = '/img/editar.png'
      updateTelefonoButton.alt = 'Actualizar Telefono'
      updateTelefonoButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar
      updateTelefonoButton.addEventListener('click', () => {
        const updateForm = document.createElement('form')
        const updateFormContainer = document.querySelector('.updateFormContainer')

        updateForm.innerHTML = `
            <table>
            <thead>
              <tr>
                <th><label for="telefono">Nuevo Telefono</label></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text" id="telefono" name="telefono" value="${data.telefono}" required>
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
            telefono: updateForm.querySelector('#telefono').value
          }

          const confirmUpdate = window.confirm(`¿Estás seguro de que deseas actualizar el telefono: ${data.telefono}?`)

          if (confirmUpdate) {
            fetch(`/clients/${clientId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Telefono actualizado correctamente.')

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

      telefonoCell.appendChild(updateTelefonoButton)
      row.appendChild(telefonoCell)

      // Fecha Nacimiento
      const fechaNacimientoCell = document.createElement('td')
      fechaNacimientoCell.textContent = data.fechaNacimiento
      row.appendChild(fechaNacimientoCell)

      // DIRECCION

      const direccionCell = document.createElement('td')
      direccionCell.textContent = data.direccion

      // Botón de Actualizar Direccion
      const updateDireccionButton = document.createElement('img')

      updateDireccionButton.src = '/img/editar.png'
      updateDireccionButton.alt = 'Actualizar Direccion'
      updateDireccionButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar
      updateDireccionButton.addEventListener('click', () => {
        const updateForm = document.createElement('form')
        const updateFormContainer = document.querySelector('.updateFormContainer')

        updateForm.innerHTML = `
            <table>
            <thead>
              <tr>
                <th><label for="direccion">Nueva Direccion</label></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text" id="direccion" name="direccion" value="${data.direccion}" required>
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
            direccion: updateForm.querySelector('#direccion').value
          }

          const confirmUpdate = window.confirm(`¿Estás seguro de que deseas actualizar la direccion: ${data.direccion}?`)

          if (confirmUpdate) {
            fetch(`/clients/${clientId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Direccion actualizado correctamente.')

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

      direccionCell.appendChild(updateDireccionButton)
      row.appendChild(direccionCell)

      // Botones de Buscar, Actualizar y Eliminar
      const buttonsCell = document.createElement('td')

      const deleteButton = document.createElement('img')

      deleteButton.src = '/img/eliminar.png'
      deleteButton.alt = 'Eliminar Clientes'
      deleteButton.className = 'chiquito'

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

      buttonsCell.appendChild(deleteButton)
      row.appendChild(buttonsCell)

      tbody.appendChild(row)
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
