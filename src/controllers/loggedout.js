export async function isLoggedOut (req, res) {
  res.cookie('jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;')
  res.status(200).redirect('/')
}
