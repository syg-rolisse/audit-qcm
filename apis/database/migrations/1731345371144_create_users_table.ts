import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('profil_id').references('id').inTable('profils').nullable().onDelete('CASCADE')
      table.string('full_name').nullable()
      table.string('avatar_url').nullable()
      table.string('avatar').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('normalize_email', 254).notNullable().unique()
      table.string('address').notNullable()
      table.string('password').notNullable()
      table.string('phone_code').nullable()
      table.string('phone_number').notNullable()
      table.boolean('valid_email').defaultTo(false)
      table.boolean('status').defaultTo(false)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
