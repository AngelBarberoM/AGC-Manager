const pathParts = window.location.pathname.split('/')
const adminIndex = pathParts.indexOf('contracts')
const contractId = adminIndex !== -1 && pathParts.length > adminIndex + 1 ? pathParts[adminIndex + 1] : null

fetch(`/contracts/details/${contractId}`)
  .then(response => response.json())
  .then(data => {
    const contractTable = document.getElementById('contract-table')
    const tbody = contractTable.querySelector('tbody')

    if (data.status === 'Error') {
      console.error('Error:', data.message)
    } else {
      const row = document.createElement('tr')

      const fechaInicioCell = document.createElement('td')
      fechaInicioCell.textContent = data.fechaInicio
      row.appendChild(fechaInicioCell)

      const fechaFinCell = document.createElement('td')
      fechaFinCell.textContent = data.fechaFin

      // Botón de Actualizar FechaFin
      const updateFechaFinButton = document.createElement('img')

      updateFechaFinButton.src = '/img/editar.png'
      updateFechaFinButton.alt = 'Actualizar FechaFin'
      updateFechaFinButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar
      updateFechaFinButton.addEventListener('click', () => {
        const updateForm = document.createElement('form')
        const updateFormContainer = document.querySelector('.updateFormContainer')

        updateForm.innerHTML = `
            <table>
            <thead>
              <tr>
                <th><label for="fechaFin">Nuevo Fecha Fin</label></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="date" id="fechaFin" name="fechaFin" value="${data.fechaFin}" required>
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
            fechaFin: updateForm.querySelector('#fechaFin').value
          }

          const confirmUpdate = window.confirm(`¿Estás seguro de que deseas actualizar la fecha fin: ${data.fechaFin}?`)

          if (confirmUpdate) {
            fetch(`/contracts/${contractId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Fecha Fin actualizado correctamente.')

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

      fechaFinCell.appendChild(updateFechaFinButton)
      row.appendChild(fechaFinCell)

      const sueldoHoraCell = document.createElement('td')
      sueldoHoraCell.textContent = data.sueldoHora

      // Botón de Actualizar SueldoHora
      const updateSueldoHoraButton = document.createElement('img')

      updateSueldoHoraButton.src = '/img/editar.png'
      updateSueldoHoraButton.alt = 'Actualizar Sueldo Hora'
      updateSueldoHoraButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar
      updateSueldoHoraButton.addEventListener('click', () => {
        const updateForm = document.createElement('form')
        const updateFormContainer = document.querySelector('.updateFormContainer')

        updateForm.innerHTML = `
            <table>
            <thead>
              <tr>
                <th><label for="sueldoHora">Nuevo Sueldo Hora</label></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="number" id="sueldoHora" name="sueldoHora" value="${data.sueldoHora}" required>
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
            sueldoHora: Number(updateForm.querySelector('#sueldoHora').value)
          }

          const confirmUpdate = window.confirm(`¿Estás seguro de que deseas actualizar el sueldo Hora: ${data.sueldoHora}?`)

          if (confirmUpdate) {
            fetch(`/contracts/${contractId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Sueldo Hora actualizado correctamente.')

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

      sueldoHoraCell.appendChild(updateSueldoHoraButton)
      row.appendChild(sueldoHoraCell)

      const horasSemanaCell = document.createElement('td')
      horasSemanaCell.textContent = data.horasSemana

      // Botón de Actualizar HorasSemana
      const updateHorasSemanaButton = document.createElement('img')

      updateHorasSemanaButton.src = '/img/editar.png'
      updateHorasSemanaButton.alt = 'Actualizar Horas Semana'
      updateHorasSemanaButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar
      updateHorasSemanaButton.addEventListener('click', () => {
        const updateForm = document.createElement('form')
        const updateFormContainer = document.querySelector('.updateFormContainer')

        updateForm.innerHTML = `
            <table>
            <thead>
              <tr>
                <th><label for="horasSemana">Nuevas Horas Semana</label></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="number" id="horasSemana" name="horasSemana" value="${data.horasSemana}" required>
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
            horasSemana: Number(updateForm.querySelector('#horasSemana').value)
          }

          const confirmUpdate = window.confirm(`¿Estás seguro de que deseas actualizar las horas semana: ${data.horasSemana}?`)

          if (confirmUpdate) {
            fetch(`/contracts/${contractId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Horas Semana actualizado correctamente.')

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

      horasSemanaCell.appendChild(updateHorasSemanaButton)
      row.appendChild(horasSemanaCell)

      // Botón y Eliminar
      const buttonsCell = document.createElement('td')
      const deleteButton = document.createElement('img')

      deleteButton.src = '/img/eliminar.png'
      deleteButton.alt = 'Eliminar Contrato'
      deleteButton.className = 'chiquito'

      // Funcionalidad Botón Eliminar
      deleteButton.addEventListener('click', () => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar el contrato?')

        if (confirmDelete) {
          fetch(`/contracts/${data.contractId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(deleteData => {
              if (deleteData.status === 'ok') {
                window.alert('Contrato eliminado correctamente.')

                window.location.href = '/contracts'
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
