import Domain from '#models/domain'
import Question from '#models/question'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Récupérer l'ID du domaine "Gouvernance de la fonction d’audit interne"
    const gouvernanceAuditInterne = await Domain.findBy(
      'wording',
      'Gouvernance de la fonction d’audit interne'
    )

    if (gouvernanceAuditInterne) {
      const domainId = gouvernanceAuditInterne.id

      // Créer les 20 questions sans les options ni réponses
      await Question.createMany([
        {
          wording: 'Quel est le rôle principal du Conseil dans la gouvernance de l’audit interne ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'La charte d’audit interne est :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Quel principe est essentiel pour assurer l’efficacité de l’audit interne ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'La norme 7.1 concerne :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Le responsable de l’audit interne doit rendre compte :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Quel est le rôle du Conseil en matière de ressources pour l’audit interne ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'La surveillance par le Conseil est essentielle pour :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording:
            'Qu’est-ce qui est nécessaire pour maintenir l’indépendance de l’audit interne ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Le Conseil doit veiller à ce que le responsable de l’audit interne :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Pourquoi la charte d’audit interne doit-elle être mise à jour régulièrement ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'La norme 8.1 est axée sur :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Quel est le rôle des évaluations externes de la qualité ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Une gouvernance efficace de l’audit interne inclut :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Qui doit approuver la charte de l’audit interne ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'La fonction d’audit interne doit avoir :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Quel est le but des normes de gouvernance de l’audit interne ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Les évaluations de la qualité par le Conseil incluent :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Un conflit d’intérêts doit être :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'La charte d’audit doit inclure :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Pour garantir une gouvernance efficace, le Conseil doit :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
      ])
    } else {
      console.log('Le domaine "Gouvernance de la fonction d’audit interne" est introuvable.')
    }
  }
}
