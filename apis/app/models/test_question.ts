import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import TestAnswer from './test_answer.js'
import TestDomain from './test_domain.js'

export default class TestQuestion extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare wording: string

  @column()
  declare point: number

  @column()
  declare chosenRound1: boolean
  @column()
  declare chosenRound2: boolean

  @column()
  declare testDomainId: number

  @belongsTo(() => TestDomain)
  declare TestDomain: BelongsTo<typeof TestDomain>

  @hasMany(() => TestAnswer)
  declare TestAnswers: HasMany<typeof TestAnswer>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
