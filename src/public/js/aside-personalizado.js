const asidePersonalizadoAdmin = document.createElement('a')
const asidePersonalizadoAdminContainer = document.querySelector('.aside-personalizado-admin')

asidePersonalizadoAdmin.ariaCurrent = 'page'
asidePersonalizadoAdmin.href = '/admin'

const asidePersonalizadoPerfil = document.createElement('a')
const asidePersonalizadoPerfilContainer = document.querySelector('.aside-personalizado-perfil')

asidePersonalizadoPerfil.ariaCurrent = 'page'

const asidePersonalizadoUsuarios = document.createElement('a')
const asidePersonalizadoUsuariosContainer = document.querySelector('.aside-personalizado-usuarios')

asidePersonalizadoUsuarios.ariaCurrent = 'page'
asidePersonalizadoUsuarios.href = '/users'

document.addEventListener('DOMContentLoaded', () => {
  fetch('/users/typeUser/:userId')
    .then(response => response.json())
    .then(data => {
      if (data.tipoUsuario === 'admin') {
        asidePersonalizadoAdmin.innerHTML = 'Administrador'
        asidePersonalizadoAdminContainer.appendChild(asidePersonalizadoAdmin)

        asidePersonalizadoUsuarios.innerHTML = 'Usuarios'
        asidePersonalizadoUsuariosContainer.appendChild(asidePersonalizadoUsuarios)
      }

      asidePersonalizadoPerfil.href = `/users/${data.userId}`
      asidePersonalizadoPerfil.innerHTML = '<img src=\'/img/user.svg\' class="img-menu">Perfil'
      asidePersonalizadoPerfilContainer.appendChild(asidePersonalizadoPerfil)
    })
    .catch(error => {
      console.error('Error en la solicitud:', error)
    })
})
