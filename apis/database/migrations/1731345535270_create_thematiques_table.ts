import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'thematiques'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').references('id').inTable('users').nullable().onDelete('CASCADE')
      table.string('wording').nullable()
      table.integer('purcent').nullable()
      table.string('support_url').nullable()
      table.integer('point_total_question').nullable()
      table.integer('cumul').nullable()
      table.integer('duration').notNullable()
      table.boolean('status').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
