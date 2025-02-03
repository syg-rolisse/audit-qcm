import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'texts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('attestation_dispo').defaultTo(false)
      table.integer('user_id').references('id').inTable('users').nullable().onDelete('CASCADE')
      table
        .integer('thematique_id')
        .references('id')
        .inTable('thematiques')
        .nullable()
        .onDelete('CASCADE')
      table.string('thematique_wording').nullable()
      table.integer('round_id').references('id').inTable('rounds').nullable().onDelete('CASCADE')
      table.boolean('round_1').defaultTo(false)
      table.boolean('round_2').defaultTo(false)
      table.integer('duration').notNullable()
      table.integer('purcent').nullable()
      table.integer('total_round_1').defaultTo(0)
      table.integer('total_round_2').defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
