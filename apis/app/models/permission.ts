import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Profil from './profil.js'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare profilId: number

  @belongsTo(() => Profil)
  declare Profil: BelongsTo<typeof Profil>

  @column()
  declare readPermission: boolean

  @column()
  declare updatePermission: boolean

  // Permissions pour les utilisateurs
  @column()
  declare readUser: boolean

  @column()
  declare createUser: boolean

  @column()
  declare updateUser: boolean

  @column()
  declare deleteUser: boolean

  // Permissions pour les domaines
  @column()
  declare readDomaine: boolean

  @column()
  declare createDomaine: boolean

  @column()
  declare updateDomaine: boolean

  @column()
  declare deleteDomaine: boolean

  // Permissions pour les tests
  @column()
  declare readTest: boolean

  @column()
  declare createTest: boolean

  @column()
  declare updateTest: boolean

  @column()
  declare deleteTest: boolean

  // Permissions pour les thématiques
  @column()
  declare readThematique: boolean

  @column()
  declare createThematique: boolean

  @column()
  declare updateThematique: boolean

  @column()
  declare deleteThematique: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
