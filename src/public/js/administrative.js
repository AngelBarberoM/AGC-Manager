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
            fetch(`/administratives/${employeeId}`, {
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
            fetch(`/administratives/${employeeId}`, {
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

      // SEXO

      const sexoCell = document.createElement('td')
      sexoCell.textContent = data.sexo

      // Botón de Actualizar Sexo
      const updateSexoButton = document.createElement('img')

      updateSexoButton.src = '/img/editar.png'
      updateSexoButton.alt = 'Actualizar Sexo'
      updateSexoButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar
      updateSexoButton.addEventListener('click', () => {
        const updateForm = document.createElement('form')
        const updateFormContainer = document.querySelector('.updateFormContainer')

        updateForm.innerHTML = `
            <table>
            <thead>
              <tr>
                <th><label for="sexo">Nuevo Sexo</label></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select id="sexo" name="sexo" required>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otros">Otro</option>
                  </select>
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
            sexo: updateForm.querySelector('#sexo').value
          }

          const confirmUpdate = window.confirm(`¿Estás seguro de que deseas actualizar el sexo: ${data.sexo}?`)

          if (confirmUpdate) {
            fetch(`/administratives/${employeeId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Sexo actualizado correctamente.')

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

      sexoCell.appendChild(updateSexoButton)
      row.appendChild(sexoCell)

      // FECHA NACIMIENTO

      const fechaNacimientoCell = document.createElement('td')
      fechaNacimientoCell.textContent = data.fechaNacimiento

      // Botón de Actualizar Fecha Nacimiento
      const updateFechaNacimientoButton = document.createElement('img')

      updateFechaNacimientoButton.src = '/img/editar.png'
      updateFechaNacimientoButton.alt = 'Actualizar Fecha Nacimiento'
      updateFechaNacimientoButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar
      updateFechaNacimientoButton.addEventListener('click', () => {
        const updateForm = document.createElement('form')
        const updateFormContainer = document.querySelector('.updateFormContainer')

        updateForm.innerHTML = `
            <table>
            <thead>
              <tr>
                <th><label for="fechaNacimiento">Nueva Fecha Nacimiento</label></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="date" id="fechaNacimiento" name="fechaNacimiento" value="${data.fechaNacimiento}" required>
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
            fechaNacimiento: updateForm.querySelector('#fechaNacimiento').value
          }

          const confirmUpdate = window.confirm(`¿Estás seguro de que deseas actualizar la Fecha de Nacimiento: ${data.fechaNacimiento}?`)

          if (confirmUpdate) {
            fetch(`/administratives/${employeeId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Fecha de Nacimiento actualizada correctamente.')

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

      fechaNacimientoCell.appendChild(updateFechaNacimientoButton)
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
            fetch(`/administratives/${employeeId}`, {
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

      // CONTRATO
      const viewDetailsContractCell = document.createElement('td')
      const viewDetailsButton = document.createElement('button')

      viewDetailsButton.textContent = 'Ver Contrato'

      viewDetailsButton.addEventListener('click', () => {
        if (data.contractId === null) {
          window.alert('El contrato no existe.')
        } else {
          window.location.href = `/contracts/${data.contractId}`
        }
      })

      viewDetailsContractCell.appendChild(viewDetailsButton)

      row.appendChild(viewDetailsContractCell)

      // Botón de Eliminar
      const buttonsCell = document.createElement('td')
      const deleteButton = document.createElement('img')

      deleteButton.src = '/img/eliminar.png'
      deleteButton.alt = 'Eliminar Administrativo'
      deleteButton.className = 'chiquito'

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

      buttonsCell.appendChild(deleteButton)
      row.appendChild(buttonsCell)

      tbody.appendChild(row)

      tbody.appendChild(row)
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
