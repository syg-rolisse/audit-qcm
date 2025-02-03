import Domain from '#models/domain'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Domain.createMany([
      {
        userId: 1,
        thematiqueId: 1,
        wording: 'Mission de l’audit interne',
        status: true,
        point: 20,
      },
      {
        userId: 1,
        thematiqueId: 1,
        wording: 'Éthique et professionnalisme',
        status: true,
        point: 20,
      },
      {
        userId: 1,
        thematiqueId: 1,
        wording: 'Gouvernance de la fonction d’audit interne',
        status: true,
        point: 20,
      },
      {
        userId: 1,
        thematiqueId: 1,
        wording: 'Gestion de la fonction d’audit interne',
        status: true,
        point: 20,
      },
      {
        userId: 1,
        thematiqueId: 1,
        wording: 'Réalisation des activités d’audit interne',
        status: true,
        point: 20,
      },
    ])
  }
}
