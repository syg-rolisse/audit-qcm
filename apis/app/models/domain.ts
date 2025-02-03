import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Question from './question.js'
import Thematique from './thematique.js'
import User from './user.js'

export default class Domain extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare wording: string

  @column()
  declare point: number

  @column()
  declare status: boolean

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare thematiqueId: number

  @belongsTo(() => Thematique)
  declare Thematiques: BelongsTo<typeof Thematique>

  @hasMany(() => Question)
  declare Questions: HasMany<typeof Question>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
