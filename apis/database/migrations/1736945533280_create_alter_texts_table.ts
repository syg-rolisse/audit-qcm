import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'texts'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('transaction_id').nullable()
      table.string('payer_fullname').nullable()
      table.string('amount_debited').nullable()
      table.string('amount').nullable()
      table.string('payment_date').nullable()
      table.string('mode').nullable()
      table.string('payer_email').nullable()
      table.boolean('status').defaultTo(false).nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('transaction_id')
      table.dropColumn('payer_fullname')
      table.dropColumn('amount_debited')
      table.dropColumn('amount')
      table.dropColumn('payment_date')
      table.dropColumn('mode')
      table.dropColumn('payer_email')
      table.dropColumn('status')
    })
  }
}
