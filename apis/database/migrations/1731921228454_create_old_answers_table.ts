import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'old_answers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('line_text_id')
        .references('id')
        .inTable('line_texts')
        .nullable()
        .onDelete('CASCADE')
      table
        .integer('question_id')
        .references('id')
        .inTable('questions')
        .nullable()
        .onDelete('CASCADE')
      table.integer('answer_id').nullable()
      table.string('wording').nullable()
      table.integer('point').nullable()
      table.boolean('chosen').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
