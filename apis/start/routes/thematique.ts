import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const ThematiquesController = () => import('#controllers/thematiques_controller')

router
  .group(() => {
    router.get('allThematiqueDash', [ThematiquesController, 'allThematiqueDash'])
    router.get('allThematique', [ThematiquesController, 'allThematique'])
    router.get('lastThematique', [ThematiquesController, 'lastThematique'])
    router.post('answerChosen', [ThematiquesController, 'answerChosen'])
    router.post('closeRound', [ThematiquesController, 'closeRound'])
    router.get('thematique', [ThematiquesController, 'show'])
    router.post('thematique', [ThematiquesController, 'create'])
    router.put('thematique', [ThematiquesController, 'update'])
    router.delete('thematique', [ThematiquesController, 'delete'])
  })
  .use(middleware.auth())
  .prefix('api/v1/')
