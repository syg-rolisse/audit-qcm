import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Domain from './domain.js'
import User from './user.js'

export default class Thematique extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare wording: string

  @column()
  declare userId: number

  @column()
  declare pointTotalQuestion: number

  @column()
  declare supportUrl: string

  @column()
  declare amountToPay: string

  @column()
  declare purcent: number

  @column()
  declare duration: number

  @column()
  declare cumul: number

  @column()
  declare status: boolean

  @hasMany(() => Domain)
  declare Domains: HasMany<typeof Domain>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
