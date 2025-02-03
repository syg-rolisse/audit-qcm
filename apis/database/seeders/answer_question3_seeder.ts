import Answer from '#models/answer'
import Question from '#models/question'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const questionsWording = [
      'Quel est le rôle principal du Conseil dans la gouvernance de l’audit interne ?',
      'La charte d’audit interne est :',
      'Quel principe est essentiel pour assurer l’efficacité de l’audit interne ?',
      'La norme 7.1 concerne :',
      'Le responsable de l’audit interne doit rendre compte :',
      'Quel est le rôle du Conseil en matière de ressources pour l’audit interne ?',
      'La surveillance par le Conseil est essentielle pour :',
      'Qu’est-ce qui est nécessaire pour maintenir l’indépendance de l’audit interne ?',
      'Le Conseil doit veiller à ce que le responsable de l’audit interne :',
      'Pourquoi la charte d’audit interne doit-elle être mise à jour régulièrement ?',
      'La norme 8.1 est axée sur :',
      'Quel est le rôle des évaluations externes de la qualité ?',
      'Une gouvernance efficace de l’audit interne inclut :',
      'Qui doit approuver la charte de l’audit interne ?',
      'La fonction d’audit interne doit avoir :',
      'Quel est le but des normes de gouvernance de l’audit interne ?',
      'Les évaluations de la qualité par le Conseil incluent :',
      'Un conflit d’intérêts doit être :',
      'La charte d’audit doit inclure :',
      'Pour garantir une gouvernance efficace, le Conseil doit :',
    ]

    const answersData = []

    for (const wording of questionsWording) {
      const question = await Question.findBy('wording', wording)

      if (question) {
        switch (wording) {
          case 'Quel est le rôle principal du Conseil dans la gouvernance de l’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Définir les stratégies de vente',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Approuver le mandat de l’audit interne',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Superviser le recrutement',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Gérer les relations publiques',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'La charte d’audit interne est :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Un document optionnel',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Obligatoire et définit le rôle de l’audit interne',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Un manuel de vente',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Un rapport d’audit externe',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'Quel principe est essentiel pour assurer l’efficacité de l’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'L’intégration avec les ventes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'L’indépendance',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La promotion des produits',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'L’augmentation des coûts',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'La norme 7.1 concerne :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'L’intégrité',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'L’indépendance au sein de l’organisation',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La formation continue',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La gestion des risques',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'Le responsable de l’audit interne doit rendre compte :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Aux clients externes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Directement au Conseil',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Aux employés',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Aux auditeurs externes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'Quel est le rôle du Conseil en matière de ressources pour l’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Définir les politiques de vente',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Assurer que l’audit interne dispose des ressources nécessaires',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Gérer les campagnes de publicité',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réduire le budget de l’audit',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'La surveillance par le Conseil est essentielle pour :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Maximiser les profits',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Garantir la qualité des audits internes',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réduire le nombre d’audits',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Augmenter les coûts',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'Qu’est-ce qui est nécessaire pour maintenir l’indépendance de l’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Le financement par le service de marketing',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La supervision par le Conseil',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La réduction des audits',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La promotion des services',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'Le Conseil doit veiller à ce que le responsable de l’audit interne :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Suive les instructions de la direction financière',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Dispose d’une autorité suffisante pour exercer ses fonctions',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réalise des audits de conformité uniquement',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Doive se concentrer sur les performances financières',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'Pourquoi la charte d’audit interne doit-elle être mise à jour régulièrement ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Parce que les coûts changent constamment',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Pour refléter les changements dans l’organisation et la réglementation',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Pour augmenter les frais d’audit',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Pour favoriser les ventes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'La norme 8.1 est axée sur :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les ventes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La relation avec le Conseil',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La gestion des stocks',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La publicité',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'Quel est le rôle des évaluations externes de la qualité ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réduire le nombre d’audits',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Garantir la conformité aux Normes',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
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
                wording: 'Améliorer la publicité',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'Une gouvernance efficace de l’audit interne inclut :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'L’évaluation régulière des performances',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La réduction des coûts',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La promotion des produits',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La gestion des ventes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'Qui doit approuver la charte de l’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Le directeur des ventes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Le Conseil',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les auditeurs externes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Le responsable marketing',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'La fonction d’audit interne doit avoir :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Un budget limité',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Une autorité clairement définie',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Une implication dans les ventes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Une dépendance aux équipes de marketing',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'Quel est le but des normes de gouvernance de l’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Maximiser les profits',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Assurer l’intégrité et la transparence des audits',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réduire les coûts de fonctionnement',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Promouvoir les produits financiers',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
          case 'Les évaluations de la qualité par le Conseil incluent :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'La supervision des audits',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La réduction des coûts',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La planification des ventes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'L’analyse des campagnes de marketing',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Un conflit d’intérêts doit être :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Signalé immédiatement',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Ignoré',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Géré par le service marketing',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Caché pour éviter des problèmes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'La charte d’audit doit inclure :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les responsabilités et l’autorité de l’audit interne',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les détails des ventes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Le budget publicitaire',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les stratégies de marketing',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Pour garantir une gouvernance efficace, le Conseil doit :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Surveiller les performances de l’audit interne',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Minimiser les audits',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Se concentrer sur les ventes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Gérer les relations publiques',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break
        }
      }
    }

    // Insertion des réponses dans la base de données
    await Answer.createMany(answersData)
  }
}
