import Domain from '#models/domain'
import Question from '#models/question'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Récupérer l'ID du domaine "Gestion de la fonction d’audit interne"
    const gestionAuditInterne = await Domain.findBy(
      'wording',
      'Gestion de la fonction d’audit interne'
    )

    if (gestionAuditInterne) {
      const domainId = gestionAuditInterne.id

      // Créer les 20 questions sans les options ni réponses
      await Question.createMany([
        {
          wording: 'Quel est l’objectif principal de la gestion de la fonction d’audit interne ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'La norme 9.1 traite de :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'La planification stratégique de l’audit interne doit inclure :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Quel est le rôle du plan d’audit interne ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'La norme 10.1 est axée sur :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'La coordination avec d’autres travaux d’assurance est couverte par la norme :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording:
            'Pour gérer efficacement les ressources humaines, le responsable de l’audit doit :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Quelle norme couvre la gestion des ressources humaines ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording:
            'Les ressources technologiques utilisées par la fonction d’audit sont couvertes par :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'La formation continue des auditeurs internes vise à :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },

        // {
        //   wording: 'Le responsable de l’audit interne doit s’assurer que :',
        //   point: 1,
        //   status: true,
        //   domainId: domainId,
        // },

        // {
        //   wording: 'Le plan d’audit interne doit être :',
        //   point: 1,
        //   status: true,
        //   domainId: domainId,
        // },
        // {
        //   wording:
        //     'Quelle est l’importance de la norme 12.1 sur l’évaluation interne de la qualité ?',
        //   point: 1,
        //   status: true,
        //   domainId: domainId,
        // },
        // {
        //   wording: 'Le plan d’audit doit être fondé sur :',
        //   point: 1,
        //   status: true,
        //   domainId: domainId,
        // },
        // {
        //   wording: 'La gestion des ressources financières est essentielle pour :',
        //   point: 1,
        //   status: true,
        //   domainId: domainId,
        // },
        // {
        //   wording: 'Quel outil est souvent utilisé pour faciliter les audits internes ?',
        //   point: 1,
        //   status: true,
        //   domainId: domainId,
        // },
        // {
        //   wording: 'Le responsable de l’audit doit veiller à :',
        //   point: 1,
        //   status: true,
        //   domainId: domainId,
        // },
        // {
        //   wording:
        //     'Comment le responsable de l’audit interne doit-il gérer les écarts de compétences au sein de son équipe ?',
        //   point: 1,
        //   status: true,
        //   domainId: domainId,
        // },
        // {
        //   wording:
        //     'La norme 11.3 sur la communication des résultats implique que les résultats doivent être :',
        //   point: 1,
        //   status: true,
        //   domainId: domainId,
        // },
        // {
        //   wording:
        //     'Quel est l’objectif principal du programme d’assurance et d’amélioration de la qualité ?',
        //   point: 1,
        //   status: true,
        //   domainId: domainId,
        // },
      ])
    } else {
      console.log('Le domaine "Gestion de la fonction d’audit interne" est introuvable.')
    }
  }
}
