import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const AnswersController = () => import('#controllers/answers_controller')

router
  .group(() => {
    router.get('answer', [AnswersController, 'show'])
    router.post('answer', [AnswersController, 'create'])
    router.put('answer', [AnswersController, 'update'])
    router.delete('answer', [AnswersController, 'delete'])
  })
  .use(middleware.auth())
  .prefix('api/v1/')
