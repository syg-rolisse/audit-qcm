import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'test_answers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('test_question_id')
        .references('id')
        .inTable('test_questions')
        .nullable()
        .onDelete('CASCADE')
      table.string('wording').nullable()
      table.string('nature').nullable()
      table.boolean('chosen_round_1').defaultTo(false)
      table.boolean('chosen_round_2').defaultTo(false)

      table.integer('point').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
