import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import TestQuestion from './test_question.js'
import Text from './text.js'

export default class TestDomain extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare wording: string

  @column()
  declare point: number

  @column()
  declare textId: number

  @belongsTo(() => Text)
  declare Text: BelongsTo<typeof Text>

  @hasMany(() => TestQuestion)
  declare TestQuestions: HasMany<typeof TestQuestion>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
