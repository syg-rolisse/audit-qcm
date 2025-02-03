import Answer from '#models/answer'
import Question from '#models/question'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const questionsWording = [
      'Quel est l’objectif principal de la gestion de la fonction d’audit interne ?',
      'La norme 9.1 traite de :',
      'La planification stratégique de l’audit interne doit inclure :',
      'Quel est le rôle du plan d’audit interne ?',
      'La norme 10.1 est axée sur :',
      'La coordination avec d’autres travaux d’assurance est couverte par la norme :',
      'Pour gérer efficacement les ressources humaines, le responsable de l’audit doit :',
      'Quelle norme couvre la gestion des ressources humaines ?',
      'Les ressources technologiques utilisées par la fonction d’audit sont couvertes par :',
      'La formation continue des auditeurs internes vise à :',
    ]

    const answersData = []

    for (const wording of questionsWording) {
      const question = await Question.findBy('wording', wording)

      if (question) {
        switch (wording) {
          case 'Quel est l’objectif principal de la gestion de la fonction d’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Augmenter les ventes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Assurer une planification stratégique efficace',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Promouvoir les produits de l’organisation',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réduire les coûts de fonctionnement',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'La norme 9.1 traite de :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording:
                  'La compréhension des processus de gouvernance, de gestion des risques et de contrôle',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La gestion des ventes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'L’évaluation des performances de l’équipe',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'L’optimisation des coûts',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'La planification stratégique de l’audit interne doit inclure :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les résultats financiers annuels',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Une évaluation des risques et des priorités organisationnelles',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les stratégies de marketing',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les prévisions de vente',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'Quel est le rôle du plan d’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Définir les actions de vente pour l’année',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Identifier les missions d’audit à réaliser',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Promouvoir les services internes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réduire les dépenses marketing',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'La norme 10.1 est axée sur :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'La gestion des ressources financières',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'L’analyse des ventes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La stratégie de marketing',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La gestion des stocks',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'La coordination avec d’autres travaux d’assurance est couverte par la norme :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Norme 9.5',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Norme 10.2',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Norme 11.1',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Norme 12.3',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'Pour gérer efficacement les ressources humaines, le responsable de l’audit doit :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Se concentrer uniquement sur la réduction des coûts',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Évaluer les compétences et planifier le développement professionnel',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réduire les formations',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Externaliser toutes les missions',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'Quelle norme couvre la gestion des ressources humaines ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Norme 10.2',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Norme 9.3',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Norme 11.4',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Norme 12.1',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'Les ressources technologiques utilisées par la fonction d’audit sont couvertes par :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'La norme 10.3',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La norme 11.1',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La norme 12.5',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La norme 9.2',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'La formation continue des auditeurs internes vise à :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Développer des compétences dans les domaines autres que l’audit',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Améliorer les compétences techniques et professionnelles',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Augmenter la charge de travail',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Promouvoir des stratégies marketing',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
        }
      }
    }
    await Answer.createMany(answersData)
  }
}
