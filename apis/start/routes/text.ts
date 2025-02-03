import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const TextsController = () => import('#controllers/texts_controller')

router
  .group(() => {
    router.post('text', [TextsController, 'create'])
    router.get('allTest', [TextsController, 'index'])
    router.get('testUser', [TextsController, 'testUser'])
    router.get('test', [TextsController, 'show'])
    router.delete('test', [TextsController, 'delete'])
    router.post('fedaPayed', [TextsController, 'fedaPayed'])
    router.post('kkiaPayed', [TextsController, 'kkiaPayed'])
  })
  .use(middleware.auth())
  .prefix('api/v1/')
