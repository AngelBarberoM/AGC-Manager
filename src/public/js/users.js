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

        // Crear una celda para el botón
        const viewDetailsContractCell = document.createElement('td')

        // Crear el botón y configurar su comportamiento
        const viewDetailsButton = document.createElement('button')
        viewDetailsButton.textContent = 'Ver Detalles'

        viewDetailsButton.addEventListener('click', () => {
          window.location.href = `/users/${client.userId}`
        })

        viewDetailsContractCell.appendChild(viewDetailsButton)

        row.appendChild(viewDetailsContractCell)

        tbody.appendChild(row)
      })
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
