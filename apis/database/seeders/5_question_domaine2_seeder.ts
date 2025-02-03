import Domain from '#models/domain'
import Question from '#models/question'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Récupérer l'ID du domaine "Éthique et professionnalisme"
    const etiqueProfessionnalisme = await Domain.findBy('wording', 'Éthique et professionnalisme')

    if (etiqueProfessionnalisme) {
      const domainId = etiqueProfessionnalisme.id

      // Créer les 20 questions sans les options ni réponses
      await Question.createMany([
        {
          wording: 'Quel est le principe clé de l’éthique pour les auditeurs internes ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Selon la norme 1.1, les auditeurs doivent :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Le principe d’objectivité impose aux auditeurs de :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Quelle norme traite des attentes éthiques de l’organisation ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'En cas de conflit d’intérêts, les auditeurs doivent :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Quel est un exemple de comportement éthique inacceptable ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Le principe de compétence impose aux auditeurs de :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Quelle est une preuve de conformité à la norme d’intégrité ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording:
            'Selon la norme 2.2, que doivent éviter les auditeurs pour garantir l’objectivité ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'L’éthique est une composante essentielle pour :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording:
            'En cas d’incident légal découvert par l’audit interne, que doivent faire les auditeurs ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Les auditeurs internes doivent s’engager à respecter :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Quel est l’impact d’une violation des normes éthiques sur l’audit interne ?',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Le scepticisme professionnel signifie que les auditeurs doivent :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Les formations éthiques sont :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'La norme 3.1 traite de :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Les auditeurs doivent toujours :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Le responsable de l’audit interne doit :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'Un auditeur interne faisant preuve d’intégrité doit :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
        {
          wording: 'En cas de doute sur une action éthique, l’auditeur doit :',
          point: 2,
          status: true,
          userId: 1,
          domainId: domainId,
        },
      ])
    } else {
      console.log('Le domaine "Éthique et professionnalisme" est introuvable.')
    }
  }
}
