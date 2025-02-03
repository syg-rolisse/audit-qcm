import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class DomainePolicy extends BasePolicy {
  view(user: User): AuthorizerResponse {
    return user.profilId === user?.Profil?.id && user?.Profil?.Permission?.readDomaine === true
  }
  create(user: User): AuthorizerResponse {
    return user.profilId === user?.Profil?.id && user?.Profil?.Permission?.createDomaine === true
  }
  update(user: User): AuthorizerResponse {
    return user.profilId === user?.Profil?.id && user?.Profil?.Permission?.updateDomaine === true
  }
  delete(user: User): AuthorizerResponse {
    return user.profilId === user?.Profil?.id && user?.Profil?.Permission?.deleteDomaine === true
  }
}
