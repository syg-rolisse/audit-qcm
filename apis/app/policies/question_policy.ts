import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class QuestionPolicy extends BasePolicy {
  view(user: User): AuthorizerResponse {
    return user.profilId === user?.Profil?.id && user?.Profil?.Permission?.readThematique === true
  }
  create(user: User): AuthorizerResponse {
    return user.profilId === user?.Profil?.id && user?.Profil?.Permission?.createThematique === true
  }
  update(user: User): AuthorizerResponse {
    return user.profilId === user?.Profil?.id && user?.Profil?.Permission?.updateThematique === true
  }
  delete(user: User): AuthorizerResponse {
    return user.profilId === user?.Profil?.id && user?.Profil?.Permission?.deleteThematique === true
  }
}
