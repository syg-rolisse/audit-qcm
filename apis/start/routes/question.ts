import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const QuestionsController = () => import('#controllers/questions_controller')

router
  .group(() => {
    router.get('allQuestions', [QuestionsController, 'allQuestions'])
    router.get('question', [QuestionsController, 'show'])
    router.post('question', [QuestionsController, 'create'])
    router.put('question', [QuestionsController, 'update'])
    router.delete('question', [QuestionsController, 'delete'])
  })
  .use(middleware.auth())
  .prefix('api/v1/')
