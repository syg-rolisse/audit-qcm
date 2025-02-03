import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'thematiques'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('amount_to_pay').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('amount_to_pay')
    })
  }
}
