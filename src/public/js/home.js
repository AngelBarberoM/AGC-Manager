const asidePersonalizadoAdmin = document.createElement('a')
const asidePersonalizadoAdminContainer = document.querySelector('.aside-personalizado-admin')
asidePersonalizadoAdmin.ariaCurrent = 'page'
asidePersonalizadoAdmin.href = '/admin'

const asidePersonalizadoPerfil = document.createElement('a')
const asidePersonalizadoPerfilContainer = document.querySelector('.aside-personalizado-perfil')

asidePersonalizadoAdmin.ariaCurrent = 'page'

document.addEventListener('DOMContentLoaded', () => {
  fetch('/users/typeUser/:userId')
    .then(response => response.json())
    .then(data => {
      if (data.tipoUsuario === 'admin') {
        asidePersonalizadoAdmin.innerHTML = 'Administrador'
        asidePersonalizadoAdminContainer.appendChild(asidePersonalizadoAdmin)
      }

      asidePersonalizadoPerfil.href = `/users/${data.userId}`
      asidePersonalizadoPerfil.innerHTML = '<img src=\'/img/user.svg\' width="20" height="20">Perfil'
      asidePersonalizadoPerfilContainer.appendChild(asidePersonalizadoPerfil)
    })
    .catch(error => {
      console.error('Error en la solicitud:', error)
    })
})
