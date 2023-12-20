const token = document.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4)

const asidePersonalizadoAdmin = document.createElement('li')
const asidePersonalizadoAdminContainer = document.querySelector('.aside-personalizado-admin')
document.addEventListener('DOMContentLoaded', () => {
  fetch('/users/typeUser/:userId', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
    // Realizar la lógica según el tipo de usuario
      if (data.tipoUsuario === 'admin') {
        asidePersonalizadoAdmin.innerHTML = `
        <a aria-current="page" href="/admin">Admin</a>
      `

        // Agrega el formulario al contenedor
        asidePersonalizadoAdminContainer.appendChild(asidePersonalizadoAdmin)
      }
    })
    .catch(error => {
      console.error('Error en la solicitud:', error)
    })
})
