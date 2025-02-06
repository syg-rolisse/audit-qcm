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
      table.string('source').nullable()
      table.string('country').nullable()
      table.string('phone').nullable()
      table.string('amount_to_pay').nullable()
      table.string('transaction_id').nullable()
      table.string('payer_fullname').nullable()
      table.string('amount_debited').nullable()
      table.string('amount').nullable()
      table.string('payment_date').nullable()
      table.string('mode').nullable()
      table.string('payer_email').nullable()
      table.boolean('status').defaultTo(false).nullable()
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
