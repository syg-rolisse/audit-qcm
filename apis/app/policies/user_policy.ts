import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class UserPolicy extends BasePolicy {
  delete(user: User): AuthorizerResponse {
    return user.profilId === user?.Profil?.id && user?.Profil?.Permission?.deleteUser === true
  }
}
