import Answer from '#models/answer'
import Question from '#models/question'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const questionsWording = [
      'Quel est le principe clé de l’éthique pour les auditeurs internes ?',
      'Selon la norme 1.1, les auditeurs doivent :',
      'Le principe d’objectivité impose aux auditeurs de :',
      'Quelle norme traite des attentes éthiques de l’organisation ?',
      'En cas de conflit d’intérêts, les auditeurs doivent :',
      'Quel est un exemple de comportement éthique inacceptable ?',
      'Le principe de compétence impose aux auditeurs de :',
      'Quelle est une preuve de conformité à la norme d’intégrité ?',
      'Selon la norme 2.2, que doivent éviter les auditeurs pour garantir l’objectivité ?',
      'L’éthique est une composante essentielle pour :',
      'Quel est l’impact d’une violation des normes éthiques sur l’audit interne ?',
      'Le scepticisme professionnel signifie que les auditeurs doivent :',
      'Les formations éthiques sont :',
      'La norme 3.1 traite de :',
      'Les auditeurs doivent toujours :',
      'Le responsable de l’audit interne doit :',
      'Un auditeur interne faisant preuve d’intégrité doit :',
      'En cas de doute sur une action éthique, l’auditeur doit :',
      'En cas d’incident légal découvert par l’audit interne, que doivent faire les auditeurs ?',
      'Les auditeurs internes doivent s’engager à respecter :',
    ]

    const answersData = []

    for (const wording of questionsWording) {
      const question = await Question.findBy('wording', wording)

      if (question) {
        switch (wording) {
          case 'Quel est le principe clé de l’éthique pour les auditeurs internes ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Promotion des produits financiers',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Intégrité',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Augmentation des ventes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Stratégies de marketing',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Selon la norme 1.1, les auditeurs doivent :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Accomplir leur travail avec honnêteté et courage professionnel',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Ne signaler que les anomalies majeures',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Accepter des cadeaux pour améliorer les relations',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réduire les coûts de l’audit',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Le principe d’objectivité impose aux auditeurs de :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Rendre des jugements impartiaux et non biaisés',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Accepter les directives sans questionnement',
                nature: 'mr', // mauvaise réponse
                point: 0,
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
                wording: 'Éviter les audits compliqués',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Quelle norme traite des attentes éthiques de l’organisation ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Norme 1.2',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Norme 2.1',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Norme 3.3',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Norme 4.2',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'En cas de conflit d’intérêts, les auditeurs doivent :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Le signaler immédiatement',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Ignorer le conflit pour éviter des désaccords',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Accepter le travail malgré le conflit',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Minimiser son impact',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Quel est un exemple de comportement éthique inacceptable ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Accepter des récompenses pour influencer les conclusions',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Fournir des informations vérifiées',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Suivre les normes professionnelles',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réaliser une évaluation impartiale',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Le principe de compétence impose aux auditeurs de :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Suivre une formation continue',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Ne se concentrer que sur les tâches faciles',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Refuser de se former',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Limiter leur intervention aux audits financiers',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Quelle est une preuve de conformité à la norme d’intégrité ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Participer à des formations éthiques',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
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
                wording: 'Ne réaliser que des audits de performance',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Limiter les interactions avec la direction',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Selon la norme 2.2, que doivent éviter les auditeurs pour garantir l’objectivité ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Accepter des cadeaux ou récompenses',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Collecter des informations',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Suivre les directives de la direction',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réaliser des audits sans vérification des données',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'L’éthique est une composante essentielle pour :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Assurer la confiance dans la profession', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Promouvoir les produits financiers', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Augmenter les ventes', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réduire les coûts opérationnels', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'En cas d’incident légal découvert par l’audit interne, que doivent faire les auditeurs ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'L’ignorer',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Le signaler aux autorités compétentes',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'En informer uniquement le responsable de l’audit',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Le dissimuler',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          // Question 12
          case 'Les auditeurs internes doivent s’engager à respecter :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Le code de déontologie de l’organisation',
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
                wording: 'Les directives des ventes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les promotions des produits',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          // Question 13
          case 'Quel est l’impact d’une violation des normes éthiques sur l’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Amélioration de la réputation',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Perte de confiance et de crédibilité',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Augmentation des ventes',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réduction des coûts',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          // Question 14
          case 'Le scepticisme professionnel signifie que les auditeurs doivent :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Accepter toutes les informations sans les vérifier',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Remettre en question et évaluer de manière critique',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Ne pas analyser les données',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Suivre aveuglément les instructions',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          // Question 15
          case 'Les formations éthiques sont :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Optionnelles',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Obligatoires pour améliorer les compétences',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Uniquement pour les nouveaux auditeurs',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Sans importance',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          // Question 16
          case 'La norme 3.1 traite de :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'La compétence',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'L’objectivité',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
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
                wording: 'La confidentialité',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          // Question 17
          case 'Les auditeurs doivent toujours :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'S’engager dans des activités promotionnelles',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Respecter les lois et règlements',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Minimiser les résultats des audits',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Ne pas signaler les anomalies',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          // Question 18
          case 'Le responsable de l’audit interne doit :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Déléguer la supervision des normes éthiques',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Promouvoir l’adhésion aux principes éthiques',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Ignorer les problèmes éthiques',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Minimiser les audits éthiques',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          // Question 19
          case 'Un auditeur interne faisant preuve d’intégrité doit :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Ignorer les faits contraires',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Révéler toutes les informations pertinentes',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Dissimuler les anomalies mineures',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Minimiser les impacts',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          // Question 20
          case 'En cas de doute sur une action éthique, l’auditeur doit :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Prendre sa propre décision sans consultation',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Consulter son superviseur',
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
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
                wording: 'Le dissimuler',
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          default:
            break
        }
      }
    }

    await Answer.createMany(answersData)
  }
}
