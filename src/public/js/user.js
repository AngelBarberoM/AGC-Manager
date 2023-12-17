// Obtén el path de la URL y divídelo en partes usando '/'
const pathParts = window.location.pathname.split('/')
// Encuentra la posición del segmento 'administratives'
const adminIndex = pathParts.indexOf('users')
// Si 'administratives' está en la URL y hay un identificador después, obtén el identificador
const userId = adminIndex !== -1 && pathParts.length > adminIndex + 1 ? pathParts[adminIndex + 1] : null

// // Realizar el fetch con el ID específico

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

      tbody.appendChild(row)
    }
  })
  .catch(error => {
    console.error('Error¡', error)
  })
