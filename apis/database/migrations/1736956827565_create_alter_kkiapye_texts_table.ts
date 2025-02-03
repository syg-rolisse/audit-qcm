import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'texts'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('source').nullable()
      table.string('country').nullable()
      table.string('phone').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('source')
      table.dropColumn('country')
      table.dropColumn('phone')
    })
  }
}
