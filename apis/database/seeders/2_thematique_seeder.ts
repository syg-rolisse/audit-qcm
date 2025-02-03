import Thematique from '#models/thematique'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Thematique.createMany([
      {
        wording: "Normes Internationales D'audit Interne",
        userId: 1,
        purcent: 70,
        pointTotalQuestion: 100,
        cumul: 100,
        duration: 30,
        amountToPay: '15000',
        status: true,
      },
    ])
  }
}
