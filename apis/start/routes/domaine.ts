import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const DomainsController = () => import('#controllers/domains_controller')

router
  .group(() => {
    router.get('testDomain', [DomainsController, 'index'])
    router.get('allDomain', [DomainsController, 'allDomain'])
    router.get('domain', [DomainsController, 'show'])
    router.post('domain', [DomainsController, 'create'])
    router.put('domain', [DomainsController, 'update'])
    router.delete('domain', [DomainsController, 'delete'])
  })
  .use(middleware.auth())
  .prefix('api/v1/')
