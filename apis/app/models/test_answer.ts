import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import TestQuestion from './test_question.js'

export default class TestAnswer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare wording: string

  @column()
  declare nature: string

  @column()
  declare point: number

  @column()
  declare chosen: boolean
  @column()
  declare chosenRound1: boolean
  @column()
  declare chosenRound2: boolean

  @column()
  declare testQuestionId: number

  @belongsTo(() => TestQuestion)
  declare TestQuestion: BelongsTo<typeof TestQuestion>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
