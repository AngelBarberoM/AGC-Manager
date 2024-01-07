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

      // Botón de Actualizar Marca
      const updateMarcaButton = document.createElement('img')

      updateMarcaButton.src = '/img/editar.png'
      updateMarcaButton.alt = 'Actualizar Marca'
      updateMarcaButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar
      updateMarcaButton.addEventListener('click', () => {
        const updateForm = document.createElement('form')
        const updateFormContainer = document.querySelector('.updateFormContainer')

        updateForm.innerHTML = `
            <table>
            <thead>
              <tr>
                <th><label for="marca">Nuevo Marca</label></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text" id="marca" name="marca" value="${data.marca}" required>
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
            marca: updateForm.querySelector('#marca').value
          }

          const confirmUpdate = window.confirm(`¿Estás seguro de que deseas actualizar la marca: ${data.marca}?`)

          if (confirmUpdate) {
            fetch(`/bus/${busId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Marca actualizada correctamente.')

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

      marcaCell.appendChild(updateMarcaButton)
      row.appendChild(marcaCell)

      const modeloCell = document.createElement('td')
      modeloCell.textContent = data.modelo

      // Botón de Actualizar Modelo
      const updateModeloButton = document.createElement('img')

      updateModeloButton.src = '/img/editar.png'
      updateModeloButton.alt = 'Actualizar Modelo'
      updateModeloButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar
      updateModeloButton.addEventListener('click', () => {
        const updateForm = document.createElement('form')
        const updateFormContainer = document.querySelector('.updateFormContainer')

        updateForm.innerHTML = `
            <table>
            <thead>
              <tr>
                <th><label for="modelo">Nuevo Modelo</label></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text" id="modelo" name="modelo" value="${data.modelo}" required>
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
            modelo: updateForm.querySelector('#modelo').value
          }

          const confirmUpdate = window.confirm(`¿Estás seguro de que deseas actualizar el modelo: ${data.modelo}?`)

          if (confirmUpdate) {
            fetch(`/bus/${busId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Modelo actualizado correctamente.')

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

      modeloCell.appendChild(updateModeloButton)
      row.appendChild(modeloCell)

      const plazasCell = document.createElement('td')
      plazasCell.textContent = data.plazas

      // Botón de Actualizar Plazas
      const updatePlazasButton = document.createElement('img')

      updatePlazasButton.src = '/img/editar.png'
      updatePlazasButton.alt = 'Actualizar Plazas'
      updatePlazasButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar
      updatePlazasButton.addEventListener('click', () => {
        const updateForm = document.createElement('form')
        const updateFormContainer = document.querySelector('.updateFormContainer')

        updateForm.innerHTML = `
            <table>
            <thead>
              <tr>
                <th><label for="plazas">Nuevas Plazas</label></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="number" id="plazas" name="plazas" value="${data.plazas}" required>
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
            plazas: Number(updateForm.querySelector('#plazas').value)
          }

          const confirmUpdate = window.confirm(`¿Estás seguro de que deseas actualizar las plazas: ${data.plazas}?`)

          if (confirmUpdate) {
            fetch(`/bus/${busId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Plazas actualizadas correctamente.')

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

      plazasCell.appendChild(updatePlazasButton)
      row.appendChild(plazasCell)

      // Crear una celda para el botón
      const viewDetailsDriverCell = document.createElement('td')

      // Crear el botón y configurar su comportamiento
      const viewDetailsButton = document.createElement('button')
      viewDetailsButton.textContent = 'Ver Conductor'

      viewDetailsButton.addEventListener('click', () => {
        if (data.employeeId === null) {
          window.alert('El conductor no existe.')
        } else {
          window.location.href = `/drivers/${data.employeeId}`
        }
      })

      viewDetailsDriverCell.appendChild(viewDetailsButton)

      row.appendChild(viewDetailsDriverCell)

      // Botón Eliminar
      const buttonsCell = document.createElement('td')
      const deleteButton = document.createElement('img')

      deleteButton.src = '/img/eliminar.png'
      deleteButton.alt = 'Eliminar Autobuses'
      deleteButton.className = 'chiquito'

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

      buttonsCell.appendChild(deleteButton)
      row.appendChild(buttonsCell)

      tbody.appendChild(row)
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
