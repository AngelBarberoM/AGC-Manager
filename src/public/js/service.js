const pathParts = window.location.pathname.split('/')
const adminIndex = pathParts.indexOf('services')
const serviceId = adminIndex !== -1 && pathParts.length > adminIndex + 1 ? pathParts[adminIndex + 1] : null

fetch(`/services/details/${serviceId}`)
  .then(response => response.json())
  .then(data => {
    const serviceTable = document.getElementById('service-table')
    const tbody = serviceTable.querySelector('tbody')

    if (data.status === 'Error') {
      console.error('Error:', data.message)
    } else {
      const row = document.createElement('tr')

      const tipoServicioCell = document.createElement('td')
      tipoServicioCell.textContent = data.tipoServicio
      row.appendChild(tipoServicioCell)

      const descripcionCell = document.createElement('td')
      descripcionCell.textContent = data.descripcion

      // Botón de Actualizar Descripcion
      const updateDescripcionButton = document.createElement('img')

      updateDescripcionButton.src = '/img/editar.png'
      updateDescripcionButton.alt = 'Actualizar Descripcion'
      updateDescripcionButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar
      updateDescripcionButton.addEventListener('click', () => {
        const updateForm = document.createElement('form')
        const updateFormContainer = document.querySelector('.updateFormContainer')

        updateForm.innerHTML = `
            <table>
            <thead>
              <tr>
                <th><label for="descripcion">Nuevo Descripcion</label></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text" id="descripcion" name="descripcion" value="${data.descripcion}" required>
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
            descripcion: updateForm.querySelector('#descripcion').value
          }

          const confirmUpdate = window.confirm(`¿Estás seguro de que deseas actualizar el descripcion: ${data.descripcion}?`)

          if (confirmUpdate) {
            fetch(`/services/${serviceId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Descripcion actualizado correctamente.')

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

      descripcionCell.appendChild(updateDescripcionButton)
      row.appendChild(descripcionCell)

      const fechaServicioCell = document.createElement('td')
      fechaServicioCell.textContent = data.fechaServicio

      // Botón de Actualizar FechaServicio
      const updateFechaServicioButton = document.createElement('img')

      updateFechaServicioButton.src = '/img/editar.png'
      updateFechaServicioButton.alt = 'Actualizar Fecha Servicio'
      updateFechaServicioButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar
      updateFechaServicioButton.addEventListener('click', () => {
        const updateForm = document.createElement('form')
        const updateFormContainer = document.querySelector('.updateFormContainer')

        updateForm.innerHTML = `
            <table>
            <thead>
              <tr>
                <th><label for="fechaServicio">Nueva Fecha Servicio</label></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="date" id="fechaServicio" name="fechaServicio" value="${data.fechaServicio}" required>
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
            fechaServicio: updateForm.querySelector('#fechaServicio').value
          }

          const confirmUpdate = window.confirm(`¿Estás seguro de que deseas actualizar el fechaServicio: ${data.fechaServicio}?`)

          if (confirmUpdate) {
            fetch(`/services/${serviceId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Fecha Servicio actualizada correctamente.')

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

      fechaServicioCell.appendChild(updateFechaServicioButton)
      row.appendChild(fechaServicioCell)

      const fechaCreacionCell = document.createElement('td')
      fechaCreacionCell.textContent = data.fechaCreacion
      row.appendChild(fechaCreacionCell)

      // Crear una celda para el botón
      const viewDetailsClientCell = document.createElement('td')

      // Crear el botón y configurar su comportamiento
      const viewDetailsButton = document.createElement('button')
      viewDetailsButton.textContent = 'Ver Cliente'

      viewDetailsButton.addEventListener('click', () => {
        if (data.clientId === null) {
          window.alert('El conductor no existe.')
        } else {
          window.location.href = `/clients/${data.clientId}`
        }
      })

      viewDetailsClientCell.appendChild(viewDetailsButton)

      row.appendChild(viewDetailsClientCell)

      // BotónEliminar
      const buttonsCell = document.createElement('td')
      const deleteButton = document.createElement('img')

      deleteButton.src = '/img/eliminar.png'
      deleteButton.alt = 'Eliminar Servicios'
      deleteButton.className = 'chiquito'

      // Funcionalidad Botón Eliminar
      deleteButton.addEventListener('click', () => {
        const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el servicio: ${data.tipoServicio}?`)

        if (confirmDelete) {
          fetch(`/services/${data.serviceId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(deleteData => {
              if (deleteData.status === 'ok') {
                window.alert('Servicio eliminado correctamente.')

                window.location.href = '/services'
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
