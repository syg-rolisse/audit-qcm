import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Answer from './answer.js'
import Domain from './domain.js'
import User from './user.js'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare wording: string

  @column()
  declare point: number

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare status: boolean

  @column()
  declare domainId: number

  @belongsTo(() => Domain)
  declare domains: BelongsTo<typeof Domain>

  @hasMany(() => Answer)
  declare Answers: HasMany<typeof Answer>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
