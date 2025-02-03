import Answer from '#models/answer'
import Question from '#models/question'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const questionsWording = [
      'Quel est l’objectif principal de l’audit interne ?',
      'Quelle est l’une des missions principales de l’audit interne ?',
      'Quel aspect est renforcé par l’audit interne ?',
      'À qui l’audit interne doit-il rendre compte pour être efficace ?',
      'Quel élément clé permet à l’audit interne d’être indépendant ?',
      'L’audit interne contribue principalement à :',
      'Que permet une bonne gouvernance de l’audit interne ?',
      'Quel est un indicateur de l’efficacité de l’audit interne ?',
      'L’audit interne aide principalement à :',
      'Quel est un rôle clé de l’audit interne dans l’organisation ?',
      'Comment l’audit interne soutient-il la direction ?',
      'Quel est un principe fondamental de l’audit interne ?',
      'Pourquoi l’indépendance est-elle cruciale pour l’audit interne ?',
      'Qu’est-ce qui est essentiel pour la crédibilité de l’audit interne ?',
      'Comment l’audit interne influence-t-il la performance globale ?',
      'Quel est le bénéfice indirect de l’audit interne ?',
      'Que permet une évaluation efficace de l’audit interne ?',
      'L’audit interne aide à :',
      'Comment l’audit interne peut-il améliorer la prise de décision ?',
      'Quels processus sont renforcés par l’audit interne ?',
    ]

    const answersData = []

    for (const wording of questionsWording) {
      const question = await Question.findBy('wording', wording)

      if (question) {
        switch (wording) {
          case 'Quel est l’objectif principal de l’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Fournir une assurance sur les états financiers', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Renforcer la capacité de l’organisation à créer de la valeur', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Gérer les ventes et le marketing', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Assurer la conformité légale', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Quelle est l’une des missions principales de l’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Optimiser les revenus de l’organisation', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Évaluer l’efficacité des processus de gestion des risques', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Gérer les relations clients', // mauvaise réponse
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
              }
            )
            break

          case 'Quel aspect est renforcé par l’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'La stratégie de vente', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La culture éthique', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La promotion des produits', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La gestion des stocks', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'À qui l’audit interne doit-il rendre compte pour être efficace ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'La direction financière', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Le Conseil', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les auditeurs externes', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les clients', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Quel élément clé permet à l’audit interne d’être indépendant ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Le financement par la direction', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Le soutien du Conseil', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Le recrutement externe', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La formation continue', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'L’audit interne contribue principalement à :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'La réduction des coûts', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La gestion des projets', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La stabilité organisationnelle', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'L’amélioration des relations publiques', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Que permet une bonne gouvernance de l’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réduire les coûts', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Garantir des rapports fiables et transparents', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Optimiser les ventes', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Maximiser les profits', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Quel est un indicateur de l’efficacité de l’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'L’augmentation des profits', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La conformité aux normes internationales', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La baisse des ventes', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La réduction des coûts opérationnels', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'L’audit interne aide principalement à :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Développer des produits', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Assurer la pérennité de l’organisation', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Promouvoir des services financiers', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Gérer les relations publiques', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Quel est un rôle clé de l’audit interne dans l’organisation ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Gérer les ventes', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Améliorer les processus de gouvernance', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réduire les coûts de publicité', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Accroître la visibilité sur les marchés', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Comment l’audit interne soutient-il la direction ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'En fournissant des données de vente', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'En offrant une assurance sur les processus de gestion des risques', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'En augmentant le budget de marketing', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'En améliorant les relations publiques', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Quel est un principe fondamental de l’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Objectivité', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Ventes', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Marketing', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Publicité', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Pourquoi l’indépendance est-elle cruciale pour l’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Pour réduire les coûts', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Pour fournir des évaluations impartiales', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Pour augmenter les ventes', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Pour gérer les relations clients', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Qu’est-ce qui est essentiel pour la crédibilité de l’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'L’augmentation des profits', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'L’intégrité et la transparence', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La réduction des dépenses de marketing', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Le développement de nouveaux produits', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Comment l’audit interne influence-t-il la performance globale ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'En augmentant le budget de publicité', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'En améliorant l’efficacité des processus', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'En développant des stratégies de vente', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'En réduisant les coûts d’exploitation', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Quel est le bénéfice indirect de l’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Augmentation des ventes', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Amélioration de la culture éthique', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réduction des coûts de production', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Maximisation des profits', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Que permet une évaluation efficace de l’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'La réduction des audits', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La détection des dysfonctionnements organisationnels', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'L’augmentation des coûts de gestion', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La réduction des effectifs', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'L’audit interne aide à :':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Promouvoir les produits', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Protéger les actifs de l’organisation', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Augmenter les bénéfices', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Réduire les effectifs', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Comment l’audit interne peut-il améliorer la prise de décision ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'En fournissant des rapports basés sur des opinions', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'En offrant des évaluations fondées sur des preuves', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'En augmentant les ventes de l’entreprise', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'En réduisant les coûts de gestion', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          case 'Quels processus sont renforcés par l’audit interne ?':
            answersData.push(
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les stratégies de marketing', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'Les processus de gouvernance et de gestion des risques', // bonne réponse
                nature: 'br', // bonne réponse
                point: 2,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La planification des ventes', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              },
              {
                questionId: question.id,
                userId: 1,
                wording: 'La gestion des relations publiques', // mauvaise réponse
                nature: 'mr', // mauvaise réponse
                point: 0,
                status: true,
              }
            )
            break

          // Continuez de manière similaire pour les autres questions...
        }
      }
    }
    await Answer.createMany(answersData)
  }
}
