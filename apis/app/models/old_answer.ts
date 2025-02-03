import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import LineText from './line_text.js'
import Question from './question.js'

export default class OldAnswer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare wording: string

  @column()
  declare point: number

  @column()
  declare chosen: boolean

  @column()
  declare lineTextId: number

  @belongsTo(() => LineText)
  declare LineText: BelongsTo<typeof LineText>

  @column()
  declare answerId: number

  @column()
  declare questionId: number

  @belongsTo(() => Question)
  declare question: BelongsTo<typeof Question>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
