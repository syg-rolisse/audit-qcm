import Answer from '#models/answer'
import Question from '#models/question'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const questionsWording = [
      'Quelle est la première étape de la réalisation d’une mission d’audit interne ?',
      'La norme 13.2 concerne :',
      'Quelle est l’importance de la collecte d’informations lors d’une mission d’audit ?',
      'Qu’est-ce qui doit être inclus dans le programme de travail de l’audit interne ?',
      'La norme 14.1 est centrée sur :',
      'Comment les auditeurs internes doivent-ils évaluer les constats d’audit ?',
      'Lorsqu’ils formulent des recommandations, les auditeurs doivent :',
      'La norme 15.1 porte sur :',
      'L’étape de suivi des recommandations de l’audit vise à :',
      'Le rapport d’audit interne doit inclure :',
      'Que doit faire un auditeur en cas de découverte d’une fraude potentielle ?',
      'Lors de la collecte de preuves, les auditeurs doivent s’assurer que :',
      'La documentation des missions d’audit interne vise à :',
      'Quelle norme couvre la supervision des missions d’audit interne ?',
      'Les auditeurs doivent évaluer les risques identifiés :',
      'La documentation des constatations de l’audit doit être :',
      'Un rapport de mission d’audit doit être :',
      'Quel est le but des conclusions de la mission d’audit ?',
      'En cas de non-conformité détectée, les auditeurs doivent :',
      'Le suivi des recommandations d’audit vise à :',
    ]

    const answersData = []

    for (const wording of questionsWording) {
      const question = await Question.findBy('wording', wording)

      if (question) {
        switch (wording) {
          case 'Quelle est la première étape de la réalisation d’une mission d’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Collecter des informations financières',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Planifier la mission et définir ses objectifs',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Évaluer les ventes de l’entreprise',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Fixer un budget pour l’audit',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'La norme 13.2 concerne :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'L’évaluation des risques dans le cadre de la mission',
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
                wording: 'L’analyse des données marketing',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La communication avec les clients',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Quelle est l’importance de la collecte d’informations lors d’une mission d’audit ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Promouvoir les services financiers',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Obtenir des données factuelles pour une évaluation précise',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Augmenter les revenus de l’audit',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Limiter les coûts de l’audit',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Qu’est-ce qui doit être inclus dans le programme de travail de l’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les prévisions de vente',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording:
                  'Les tâches spécifiques à réaliser pour atteindre les objectifs de la mission',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les objectifs de l’année pour le marketing',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les statistiques de performance des ventes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'La norme 14.1 est centrée sur :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'La collecte d’informations pour l’analyse et l’évaluation',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La réduction des coûts de l’audit',
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
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'L’analyse des ventes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Comment les auditeurs internes doivent-ils évaluer les constats d’audit ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'En utilisant uniquement des données financières',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'En se basant sur des critères d’évaluation prédéfinis',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'En suivant les directives de la direction',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'En prenant en compte les résultats de vente',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Lorsqu’ils formulent des recommandations, les auditeurs doivent :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Ignorer les impacts financiers',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Proposer des actions concrètes et réalisables',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Se concentrer sur les stratégies de marketing',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Limiter les suggestions aux aspects opérationnels',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'La norme 15.1 porte sur :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'La communication des résultats définitifs de la mission',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'L’optimisation des ventes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La gestion des ressources humaines',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La collecte d’informations pour l’analyse',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'L’étape de suivi des recommandations de l’audit vise à :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Augmenter les profits',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Assurer que les actions correctives ont été mises en œuvre',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réduire les coûts d’audit',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Améliorer les relations publiques',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Le rapport d’audit interne doit inclure :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les prévisions de vente',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les constats, conclusions et recommandations',
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
                wording: 'Les rapports financiers annuels',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Que doit faire un auditeur en cas de découverte d’une fraude potentielle ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Ignorer l’incident',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Le signaler immédiatement au responsable de l’audit interne',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réduire l’importance de l’incident',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Déléguer la responsabilité à un autre département',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Lors de la collecte de preuves, les auditeurs doivent s’assurer que :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les preuves sont pertinentes, suffisantes et fiables',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les preuves sont uniquement basées sur des opinions',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les preuves proviennent uniquement des états financiers',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les preuves sont fournies par le département des ventes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'La documentation des missions d’audit interne vise à :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Augmenter les coûts d’audit',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Fournir des preuves de la conformité aux normes',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Améliorer les relations publiques',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réduire la charge de travail',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Quelle norme couvre la supervision des missions d’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Norme 14.6',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Norme 15.3',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Norme 13.5',
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

          case 'Les auditeurs doivent évaluer les risques identifiés :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'En début de mission',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Après la mission',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Au milieu de l’année',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Uniquement sur demande de la direction',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'La documentation des constatations de l’audit doit être :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Brièvement rédigée',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Détaillée et précise',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Basée uniquement sur des estimations',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Facultative',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Un rapport de mission d’audit doit être :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Secret et non partagé',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Communiqué aux parties prenantes concernées',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Exclusivement envoyé à la direction marketing',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Distribué publiquement',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Quel est le but des conclusions de la mission d’audit ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réduire les coûts',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Présenter un résumé des résultats et impacts',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Améliorer les relations clients',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Augmenter les profits',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'En cas de non-conformité détectée, les auditeurs doivent :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Ignorer le problème',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Proposer des actions correctives',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réduire l’importance de la constatation',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Limiter leur rapport aux aspects financiers',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Le suivi des recommandations d’audit vise à :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réduire les missions futures',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Assurer l’implémentation des améliorations proposées',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Optimiser les ventes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Minimiser les coûts d’audit',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          // Ajoutez ici les autres cas pour les autres questions

          default:
            break
        }
      }
    }

    // Insert the answers data into the Answer table
    await Answer.createMany(answersData)
  }
}
