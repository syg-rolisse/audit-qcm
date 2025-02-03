import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'test_questions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('test_domain_id')
        .references('id')
        .inTable('test_domains')
        .nullable()
        .onDelete('CASCADE')
      table.string('wording').nullable()
      table.integer('point').nullable()
      table.boolean('chosen_round_1').defaultTo(false)
      table.boolean('chosen_round_2').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
