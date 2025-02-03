import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import TestDomain from './test_domain.js'
import Thematique from './thematique.js'
import User from './user.js'

export default class Text extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare attestationDispo: boolean

  @column()
  declare roundId: number

  @column()
  declare amountToPay: string

  @column()
  declare transactionId: string
  @column()
  declare source: string
  @column()
  declare mode: string
  @column()
  declare country: string
  @column()
  declare phone: string

  @column()
  declare payerFullname: string

  @column()
  declare payerEmail: string

  @column()
  declare thematiqueWording: string

  @column()
  declare status: boolean

  @column()
  declare round1: boolean

  @column()
  declare purcent: number

  @column()
  declare duration: number

  @column()
  declare totalRound1: number

  @column()
  declare totalRound2: number

  @column()
  declare round2: boolean

  @column()
  declare amountDebited: string

  @column()
  declare amount: string

  @column()
  declare paymentDate: string

  @hasMany(() => TestDomain)
  declare TestDomain: HasMany<typeof TestDomain>

  @column()
  declare thematiqueId: number

  @belongsTo(() => Thematique)
  declare thematique: BelongsTo<typeof Thematique>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
