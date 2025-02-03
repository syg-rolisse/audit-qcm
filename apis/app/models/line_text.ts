import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Domain from './domain.js'
import Question from './question.js'
import Text from './text.js'

export default class LineText extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare domainId: number

  @column()
  declare domainWording: number

  @column()
  declare questionWording: number

  @column()
  declare pointDomain: number

  @belongsTo(() => Domain)
  declare domains: BelongsTo<typeof Domain>

  @column()
  declare questionId: number

  @belongsTo(() => Question)
  declare questions: BelongsTo<typeof Question>

  @column()
  declare textId: number

  @belongsTo(() => Text)
  declare text: BelongsTo<typeof Text>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
