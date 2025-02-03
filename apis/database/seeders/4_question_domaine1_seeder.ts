import Domain from '#models/domain'
import Question from '#models/question'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Récupérer l'ID du domaine "Mission de l’audit interne"
    const missionAuditInterne = await Domain.findBy('wording', 'Mission de l’audit interne')

    if (missionAuditInterne) {
      const domainId = missionAuditInterne.id

      // Créer les 20 questions en utilisant l'ID du domaine récupéré
      await Question.createMany([
        {
          userId: 1,
          wording: 'Quel est l’objectif principal de l’audit interne ?',
          point: 2,
          status: true,
          domainId: domainId,
        },
        {
          userId: 1,
          wording: 'Quelle est l’une des missions principales de l’audit interne ?',
          point: 2,
          status: true,
          domainId: domainId,
        },
        {
          userId: 1,
          wording: 'Quel aspect est renforcé par l’audit interne ?',
          point: 2,
          status: true,
          domainId: domainId,
        },
        {
          userId: 1,
          wording: 'À qui l’audit interne doit-il rendre compte pour être efficace ?',
          point: 2,
          status: true,
          domainId: domainId,
        },
        {
          userId: 1,
          wording: 'Quel élément clé permet à l’audit interne d’être indépendant ?',
          point: 2,
          status: true,
          domainId: domainId,
        },
        {
          userId: 1,
          wording: 'L’audit interne contribue principalement à :',
          point: 2,
          status: true,
          domainId: domainId,
        },
        {
          userId: 1,
          wording: 'Que permet une bonne gouvernance de l’audit interne ?',
          point: 2,
          status: true,
          domainId: domainId,
        },
        {
          userId: 1,
          wording: 'Quel est un indicateur de l’efficacité de l’audit interne ?',
          point: 2,
          status: true,
          domainId: domainId,
        },
        {
          userId: 1,
          wording: 'L’audit interne aide principalement à :',
          point: 2,
          status: true,
          domainId: domainId,
        },
        {
          userId: 1,
          wording: 'Quel est un rôle clé de l’audit interne dans l’organisation ?',
          point: 2,
          status: true,
          domainId: domainId,
        },
        {
          userId: 1,
          wording: 'Comment l’audit interne soutient-il la direction ?',
          point: 2,
          status: true,
          domainId: domainId,
        },
        {
          userId: 1,
          wording: 'Quel est un principe fondamental de l’audit interne ?',
          point: 2,
          status: true,
          domainId: domainId,
        },
        {
          userId: 1,
          wording: 'Pourquoi l’indépendance est-elle cruciale pour l’audit interne ?',
          point: 2,
          status: true,
          domainId: domainId,
        },
        {
          userId: 1,
          wording: 'Qu’est-ce qui est essentiel pour la crédibilité de l’audit interne ?',
          point: 2,
          status: true,
          domainId: domainId,
        },
        {
          userId: 1,
          wording: 'Comment l’audit interne influence-t-il la performance globale ?',
          point: 2,
          status: true,
          domainId: domainId,
        },
        {
          userId: 1,
          wording: 'Quel est le bénéfice indirect de l’audit interne ?',
          point: 2,
          status: true,
          domainId: domainId,
        },
        {
          userId: 1,
          wording: 'Que permet une évaluation efficace de l’audit interne ?',
          point: 2,
          status: true,
          domainId: domainId,
        },
        {
          userId: 1,
          wording: 'L’audit interne aide à :',
          point: 2,
          status: true,
          domainId: domainId,
        },
        {
          userId: 1,
          wording: 'Comment l’audit interne peut-il améliorer la prise de décision ?',
          point: 2,
          status: true,
          domainId: domainId,
        },
        {
          userId: 1,
          wording: 'Quels processus sont renforcés par l’audit interne ?',
          point: 2,
          status: true,
          domainId: domainId,
        },
      ])
    } else {
      console.log('Le domaine "Mission de l’audit interne" est introuvable.')
    }
  }
}
