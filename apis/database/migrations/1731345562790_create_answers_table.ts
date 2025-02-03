import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'answers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('question_id')
        .references('id')
        .inTable('questions')
        .nullable()
        .onDelete('CASCADE')
      table.integer('user_id').references('id').inTable('users').notNullable().onDelete('CASCADE')
      table.string('wording').nullable()
      table.string('nature').nullable()
      table.integer('point').nullable()
      table.boolean('status').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
