import Domain from '#models/domain'
import Question from '#models/question'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Récupérer l'ID du domaine "Réalisation des activités d’audit interne"
    const realisationAuditInterne = await Domain.findBy(
      'wording',
      'Réalisation des activités d’audit interne'
    )

    if (realisationAuditInterne) {
      const domainId = realisationAuditInterne.id

      // Créer les 20 questions sans les options ni réponses
      await Question.createMany([
        {
          wording: 'Quelle est la première étape de la réalisation d’une mission d’audit interne ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'La norme 13.2 concerne :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording:
            'Quelle est l’importance de la collecte d’informations lors d’une mission d’audit ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording:
            'Qu’est-ce qui doit être inclus dans le programme de travail de l’audit interne ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'La norme 14.1 est centrée sur :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Comment les auditeurs internes doivent-ils évaluer les constats d’audit ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Lorsqu’ils formulent des recommandations, les auditeurs doivent :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'La norme 15.1 porte sur :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'L’étape de suivi des recommandations de l’audit vise à :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Le rapport d’audit interne doit inclure :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Que doit faire un auditeur en cas de découverte d’une fraude potentielle ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Lors de la collecte de preuves, les auditeurs doivent s’assurer que :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'La documentation des missions d’audit interne vise à :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Quelle norme couvre la supervision des missions d’audit interne ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Les auditeurs doivent évaluer les risques identifiés :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'La documentation des constatations de l’audit doit être :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Un rapport de mission d’audit doit être :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Quel est le but des conclusions de la mission d’audit ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'En cas de non-conformité détectée, les auditeurs doivent :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Le suivi des recommandations d’audit vise à :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
      ])
    } else {
      console.log('Le domaine "Réalisation des activités d’audit interne" est introuvable.')
    }
  }
}
