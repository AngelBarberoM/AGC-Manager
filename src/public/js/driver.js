const pathParts = window.location.pathname.split('/')
const adminIndex = pathParts.indexOf('drivers')
const employeeId = adminIndex !== -1 && pathParts.length > adminIndex + 1 ? pathParts[adminIndex + 1] : null

fetch(`/drivers/details/${employeeId}`)
  .then(response => response.json())
  .then(data => {
    const driverTable = document.getElementById('driver-table')
    const tbody = driverTable.querySelector('tbody')

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
            fetch(`/drivers/${employeeId}`, {
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
            fetch(`/drivers/${employeeId}`, {
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
                  <input type="text" id="sexo" name="sexo" value="${data.sexo}" required>
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
            fetch(`/drivers/${employeeId}`, {
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
            fetch(`/drivers/${employeeId}`, {
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
            fetch(`/drivers/${employeeId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Direccion actualizada correctamente.')

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
      deleteButton.alt = 'Eliminar Conductor'
      deleteButton.className = 'chiquito'

      // Funcionalidad Botón Eliminar
      deleteButton.addEventListener('click', () => {
        const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el conductor: ${data.nombre} ${data.apellidos}?`)

        if (confirmDelete) {
          fetch(`/drivers/${data.employeeId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(deleteData => {
              if (deleteData.status === 'ok') {
                window.alert('Conductor eliminado correctamente.')

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
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })

fetch(`/drivers/details/${employeeId}`)
  .then(response => response.json())
  .then(data => {
    const driverTable = document.getElementById('driver-permissions-table')
    const tbody = driverTable.querySelector('tbody')

    if (data.status === 'Error') {
      console.error('Error:', data.message)
    } else {
      const row = document.createElement('tr')

      // PERMISO CONDUCIR
      const permisoConducirCell = document.createElement('td')
      permisoConducirCell.textContent = data.permisoConducir

      // Botón de Actualizar PermisoConducir
      const updatePermisoConducirButton = document.createElement('img')

      updatePermisoConducirButton.src = '/img/editar.png'
      updatePermisoConducirButton.alt = 'Actualizar Permiso Conducir'
      updatePermisoConducirButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar
      updatePermisoConducirButton.addEventListener('click', () => {
        const updateForm = document.createElement('form')
        const updateFormContainer = document.querySelector('.updateFormContainer')

        updateForm.innerHTML = `
            <table>
            <thead>
              <tr>
                <th><label for="permisoConducir">Nuevo Permiso Conducir</label></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select id="permisoConducir" name="permisoConducir" required>
                    <option value="B">Tipo B</option>
                    <option value="C1">Tipo C1</option>
                    <option value="C">Tipo C</option>
                    <option value="D1">Tipo D1</option>
                    <option value="D">Tipo D</option>
                    <option value="BE">Tipo BE</option>
                    <option value="C1E">Tipo C1E</option>
                    <option value="D1E">Tipo D1E</option>
                    <option value="DE">Tipo DE</option>
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
            permisoConducir: updateForm.querySelector('#permisoConducir').value
          }

          const confirmUpdate = window.confirm(`¿Estás seguro de que deseas actualizar el Permiso de Conducir: ${data.permisoConducir}?`)

          if (confirmUpdate) {
            fetch(`/drivers/${employeeId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Permiso de Conducir actualizado correctamente.')

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

      permisoConducirCell.appendChild(updatePermisoConducirButton)

      row.appendChild(permisoConducirCell)

      // TARJETA CAP

      const tarjetaCAPCell = document.createElement('td')
      tarjetaCAPCell.textContent = data.tarjetaCAP

      // Botón de Actualizar TarjetaCAP
      const updateTarjetaCAPButton = document.createElement('img')

      updateTarjetaCAPButton.src = '/img/editar.png'
      updateTarjetaCAPButton.alt = 'Actualizar Tarjeta CAP'
      updateTarjetaCAPButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar
      updateTarjetaCAPButton.addEventListener('click', () => {
        const updateForm = document.createElement('form')
        const updateFormContainer = document.querySelector('.updateFormContainer')

        updateForm.innerHTML = `
            <table>
            <thead>
              <tr>
                <th><label for="tarjetaCAP">Nuevo Tarjeta CAP</label></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select id="tarjetaCAP" name="tarjetaCAP" required>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
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
            tarjetaCAP: updateForm.querySelector('#tarjetaCAP').value
          }

          const confirmUpdate = window.confirm(`¿Estás seguro de que deseas actualizar el Tarjeta CAP: ${data.tarjetaCAP}?`)

          if (confirmUpdate) {
            fetch(`/drivers/${employeeId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Tarjeta CAP actualizado correctamente.')

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

      tarjetaCAPCell.appendChild(updateTarjetaCAPButton)
      row.appendChild(tarjetaCAPCell)

      // TARJETA TACOGRAFO

      const tarjetaTacografoCell = document.createElement('td')
      tarjetaTacografoCell.textContent = data.tarjetaTacografo

      // Botón de Actualizar TarjetaTacografo
      const updateTarjetaTacografoButton = document.createElement('img')

      updateTarjetaTacografoButton.src = '/img/editar.png'
      updateTarjetaTacografoButton.alt = 'Actualizar Tarjeta Tacógrafo'
      updateTarjetaTacografoButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar
      updateTarjetaTacografoButton.addEventListener('click', () => {
        const updateForm = document.createElement('form')
        const updateFormContainer = document.querySelector('.updateFormContainer')

        updateForm.innerHTML = `
            <table>
            <thead>
              <tr>
                <th><label for="tarjetaTacografo">Nuevo Tarjeta Tacógrafo</label></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select id="tarjetaTacografo" name="tarjetaTacografo" required>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
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
            tarjetaTacografo: updateForm.querySelector('#tarjetaTacografo').value
          }

          const confirmUpdate = window.confirm(`¿Estás seguro de que deseas actualizar el Tarjeta Tacógrafo: ${data.tarjetaTacografo}?`)

          if (confirmUpdate) {
            fetch(`/drivers/${employeeId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Tarjeta Tacógrafo actualizado correctamente.')

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

      tarjetaTacografoCell.appendChild(updateTarjetaTacografoButton)
      row.appendChild(tarjetaTacografoCell)

      const certificadoAntecedentesCell = document.createElement('td')
      certificadoAntecedentesCell.textContent = data.certificadoAntecedentes

      // Botón de Actualizar CertificadoAntecedentes
      const updateCertificadoAntecedentesButton = document.createElement('img')

      updateCertificadoAntecedentesButton.src = '/img/editar.png'
      updateCertificadoAntecedentesButton.alt = 'Actualizar Certificado Antecedentes'
      updateCertificadoAntecedentesButton.className = 'chiquito separado'

      // Funcionalidad Botón Actualizar
      updateCertificadoAntecedentesButton.addEventListener('click', () => {
        const updateForm = document.createElement('form')
        const updateFormContainer = document.querySelector('.updateFormContainer')

        updateForm.innerHTML = `
            <table>
            <thead>
              <tr>
                <th><label for="certificadoAntecedentes">Nuevo Certificado Antecedentes</label></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select id="certificadoAntecedentes" name="certificadoAntecedentes" required>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
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
            certificadoAntecedentes: updateForm.querySelector('#certificadoAntecedentes').value
          }

          const confirmUpdate = window.confirm(`¿Estás seguro de que deseas actualizar el Certificado Antecedentes: ${data.certificadoAntecedentes}?`)

          if (confirmUpdate) {
            fetch(`/drivers/${employeeId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            })
              .then(response => response.json())
              .then(patchData => {
                if (patchData.status === 'ok') {
                  window.alert('Certificado Antecedentes actualizado correctamente.')

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

      certificadoAntecedentesCell.appendChild(updateCertificadoAntecedentesButton)
      row.appendChild(certificadoAntecedentesCell)

      tbody.appendChild(row)
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
