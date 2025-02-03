import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'line_texts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('domain_id').references('id').inTable('domains').nullable().onDelete('CASCADE')
      table.integer('text_id').references('id').inTable('texts').nullable().onDelete('CASCADE')
      table
        .integer('question_id')
        .references('id')
        .inTable('questions')
        .nullable()
        .onDelete('CASCADE')
      table.integer('point_domain').notNullable()
      table.integer('domain_wording').notNullable()
      table.integer('question_wording').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
