import Profil from '#models/profil'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Profil.createMany([
      {
        wording: 'Admin',
      },
      {
        wording: 'Opérateur',
      },
      {
        wording: 'Player',
      },
    ])
  }
}
