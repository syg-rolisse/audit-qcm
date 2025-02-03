import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'permissions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('profil_id').references('id').inTable('profils').nullable().onDelete('CASCADE')

      table.boolean('read_permission').defaultTo(false)
      table.boolean('update_permission').defaultTo(false)

      // Permissions pour les utilisateurs
      table.boolean('read_user').defaultTo(false)
      table.boolean('create_user').defaultTo(false)
      table.boolean('update_user').defaultTo(false)
      table.boolean('delete_user').defaultTo(false)

      // Permissions pour les domaines
      table.boolean('read_domaine').defaultTo(false)
      table.boolean('create_domaine').defaultTo(false)
      table.boolean('update_domaine').defaultTo(false)
      table.boolean('delete_domaine').defaultTo(false)

      // Permissions pour les tests
      table.boolean('read_test').defaultTo(false)
      table.boolean('create_test').defaultTo(false)
      table.boolean('update_test').defaultTo(false)
      table.boolean('delete_test').defaultTo(false)

      // Permissions pour les thématiques
      table.boolean('read_thematique').defaultTo(false)
      table.boolean('create_thematique').defaultTo(false)
      table.boolean('update_thematique').defaultTo(false)
      table.boolean('delete_thematique').defaultTo(false)

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
