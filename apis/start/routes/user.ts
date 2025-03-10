import { middleware } from '#start/kernel'
import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'
import { normalize, sep } from 'node:path'
const UserController = () => import('#controllers/users_controller')

const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/

router
  .group(() => {
    router.get('allUsers', [UserController, 'allUsers'])
    router.get('user', [UserController, 'show'])
    router.get('dashboardInfos', [UserController, 'dashboardInfos'])

    router.put('user', [UserController, 'update'])
    router.delete('user', [UserController, 'delete'])
    router.put('changeAccountStatus', [UserController, 'changeAccountStatus'])
  })
  .use(middleware.auth())
  .prefix('api/v1/')

router
  .group(() => {
    router.post('activeAccount', [UserController, 'activeAccount'])
    router.post('register', [UserController, 'register'])
  })
  .prefix('api/v1/')

// Route pour servir les fichiers statiques depuis 'uploads'
router.get('/uploads/*', async ({ request, response }) => {
  const filePath = request.param('*').join(sep)
  const normalizedPath = normalize(filePath)

  if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
    return response.badRequest('Malformed path')
  }

  const absolutePath = app.makePath('uploads', normalizedPath)
  return response.download(absolutePath)
})
