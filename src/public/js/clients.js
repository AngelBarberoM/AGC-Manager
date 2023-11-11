fetch('/clients/allClients') // Hacer una solicitud al servidor
  .then(response => response.json()) // Convertir la respuesta a un objeto JavaScript
  .then(data => {
    const clientTable = document.getElementById('client-table') // Obtener la tabla
    const tbody = clientTable.querySelector('tbody') // Obtener el cuerpo de la tabla

    if (data.status === 'Error') {
      // Si la respuesta contiene un estado de error, mostrar un mensaje de error
      console.error('Error:', data.message)
    } else {
      // Si la respuesta es exitosa, trabajar con los datos
      data.forEach(client => {
        // Crear una fila <tr> para cada cliente
        const row = document.createElement('tr')

        // Crear celdas <td> para cada campo
        const nombreEmpresaCell = document.createElement('td')
        nombreEmpresaCell.textContent = client.nombreEmpresa
        row.appendChild(nombreEmpresaCell)

        const dniCell = document.createElement('td')
        dniCell.textContent = client.dni
        row.appendChild(dniCell)

        const nombreCell = document.createElement('td')
        nombreCell.textContent = client.nombre
        row.appendChild(nombreCell)

        const apellidosCell = document.createElement('td')
        apellidosCell.textContent = client.apellidos
        row.appendChild(apellidosCell)

        const emailCell = document.createElement('td')
        emailCell.textContent = client.email
        row.appendChild(emailCell)

        const telefonoCell = document.createElement('td')
        telefonoCell.textContent = client.telefono
        row.appendChild(telefonoCell)

        // Agregar la fila a la tabla
        tbody.appendChild(row)
      })
    }
  })
  .catch(error => {
    // Manejar errores de red u otros errores
    console.error('Error¡', error)
  })
