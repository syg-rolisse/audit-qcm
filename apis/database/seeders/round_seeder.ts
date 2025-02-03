import Round from '#models/round'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Round.createMany([
      {
        wording: 'round1',
      },
      {
        wording: 'round2',
      },
    ])
  }
}
